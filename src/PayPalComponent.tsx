import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useCart } from "./CartContext"; // Assuming you have a cart context

interface MessageProps {
  content: string;
}

const Message: React.FC<MessageProps> = ({ content }) => {
  return <p>{content}</p>;
};

const PayPalComponent: React.FC = () => {
  const { items } = useCart();
  const [message, setMessage] = useState("");

  // Setup PayPal client-id and environment
  const clientID =
    import.meta.env.VITE_APP_PAYPAL_CLIENT_ID ||
    "AeSe7UpLjIDeb7fZ6I9nOn2snsQYn1EaSrFpLLU5Uu4v3zTNDuET0x6y-gx0GWZaCIqS0Eq5F7Afrd-V";
  const apiBaseUrl =
    import.meta.env.VITE_APP_API_BASE_URL || "http://localhost:3000";

  const initialOptions = {
    clientId: clientID,
    "client-id": clientID,
    currency: "USD",
    "enable-funding": "venmo",
    "buyer-country": "US",
    components: "buttons",
  };

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
              const response = await fetch(`${apiBaseUrl}/api/orders`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  cart: items,
                }),
              });

              const orderData = await response.json();
              if (orderData.id) {
                return orderData.id;
              } else {
                const errorDetail = orderData?.details?.[0];
                const errorMessage = errorDetail
                  ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                  : "Unexpected error occurred";
                throw new Error(errorMessage);
              }
            } catch (error: any) {
              console.error("PayPal Order Error:", error);
              setMessage(
                `Could not initiate PayPal Checkout: ${error.message}`,
              );
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
              const errorDetail = orderData?.details?.[0];

              if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
                return actions.restart();
              } else if (errorDetail) {
                throw new Error(
                  `${errorDetail.description} (${orderData.debug_id})`,
                );
              } else {
                const transaction =
                  orderData.purchase_units[0].payments.captures[0];
                setMessage(
                  `Transaction ${transaction.status}: ${transaction.id}. See console for all available details`,
                );
                console.log(
                  "Capture result",
                  orderData,
                  JSON.stringify(orderData, null, 2),
                );
              }
            } catch (error: any) {
              console.error("PayPal Capture Error:", error);
              setMessage(
                `Sorry, your transaction could not be processed: ${error.message}`,
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
