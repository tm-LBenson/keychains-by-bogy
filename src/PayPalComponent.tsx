import React, { useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";
import LoadingBackend from "./LoadingBackend";

interface MessageProps {
  content: string;
}

const Message: React.FC<MessageProps> = ({ content }) => {
  return <p>{content}</p>;
};

const PayPalComponent: React.FC<{ shippingInfo }> = ({ shippingInfo }) => {
  const { items, setItems, isServerAwake, wakeUpBackend } = useCart();
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Setup PayPal client-id and environment
  const clientID = import.meta.env.VITE_APP_PAYPAL_CLIENT_ID;
  const apiBaseUrl = import.meta.env.VITE_APP_API_BASE_URL;

  const initialOptions = {
    clientId: clientID,
    "client-id": clientID,
    currency: "USD",
    "enable-funding": "venmo",
    "buyer-country": "US",
    components: "buttons",
  };
  useEffect(() => {
    wakeUpBackend();
  }, [isServerAwake, wakeUpBackend]);
  if (!isServerAwake) {
    return <LoadingBackend />;
  }
  return (
    <div className="paypal-button-container">
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          style={{
            shape: "rect",
            layout: "vertical",
            color: "gold",
            label: "paypal",
          }}
          createOrder={async () => {
            try {
              // Ensure the `id` field is included in the cart items
              const cartItems = items.map(
                ({
                  id,
                  name,
                  unitAmount,
                  quantity,
                  selectedOptions,
                  ...rest
                }) => ({
                  id,
                  name,
                  unitAmount,
                  quantity,
                  selectedOptions,
                  ...rest,
                }),
              );

              const response = await fetch(`${apiBaseUrl}/api/orders`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  cart: cartItems,
                }),
              });
              console.log(cartItems); // Verify cart items structure

              const data = await response.json();
              if (data.error) {
                throw new Error(data.error);
              }
              const orderData = JSON.parse(data);
              if (orderData.id) {
                return orderData.id;
              } else {
                const errorDetail = orderData?.details?.[0];
                const errorMessage = errorDetail
                  ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                  : "Unexpected error occurred";
                throw new Error(errorMessage);
              }
            } catch (error) {
              console.error("PayPal Order Error:", error);
              setMessage(`Could not initiate PayPal Checkout: ${error}`);
            }
          }}
          onApprove={async (data, actions) => {
            try {
              const response = await fetch(
                `${apiBaseUrl}/api/orders/${data.orderID}/capture`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                },
              );

              const orderData = await response.json();
              if (orderData.status !== "COMPLETED") {
                const errorDetail = orderData?.details?.[0];
                if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
                  return actions.restart();
                } else if (errorDetail) {
                  throw new Error(
                    `${errorDetail.description} (${orderData.debug_id})`,
                  );
                }
              }
              const transaction =
                orderData.purchaseUnits[0].payments.captures[0];

              // Prepare order summary data
              const orderId = transaction.id;
              const totalAmount = items.reduce(
                (total, item) => total + +item.unitAmount.value * item.quantity,
                0,
              );

              setItems([]);

              navigate("/order-complete", {
                state: {
                  items,
                  orderId,
                  totalAmount,
                  shippingInfo,
                },
              });
            } catch (error) {
              console.error("PayPal Capture Error:", error);
              setMessage(
                `Sorry, your transaction could not be processed: ${error}`,
              );
            }
          }}
        />
      </PayPalScriptProvider>
      <Message content={message} />
    </div>
  );
};

export default PayPalComponent;
