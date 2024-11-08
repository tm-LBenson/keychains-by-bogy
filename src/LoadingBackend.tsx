import React from "react";

const LoadingBackend: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={48}
          height={48}
          viewBox="0 0 24 24"
        >
          <circle
            cx={12}
            cy={2}
            r={0}
            fill="#d501a7"
          >
            <animate
              attributeName="r"
              begin={0}
              calcMode="spline"
              dur="1s"
              keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
              repeatCount="indefinite"
              values="0;2;0;0"
            ></animate>
          </circle>
          <circle
            cx={12}
            cy={2}
            r={0}
            fill="#d501a7"
            transform="rotate(45 12 12)"
          >
            <animate
              attributeName="r"
              begin="0.125s"
              calcMode="spline"
              dur="1s"
              keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
              repeatCount="indefinite"
              values="0;2;0;0"
            ></animate>
          </circle>
          <circle
            cx={12}
            cy={2}
            r={0}
            fill="#d501a7"
            transform="rotate(90 12 12)"
          >
            <animate
              attributeName="r"
              begin="0.25s"
              calcMode="spline"
              dur="1s"
              keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
              repeatCount="indefinite"
              values="0;2;0;0"
            ></animate>
          </circle>
          <circle
            cx={12}
            cy={2}
            r={0}
            fill="#d501a7"
            transform="rotate(135 12 12)"
          >
            <animate
              attributeName="r"
              begin="0.375s"
              calcMode="spline"
              dur="1s"
              keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
              repeatCount="indefinite"
              values="0;2;0;0"
            ></animate>
          </circle>
          <circle
            cx={12}
            cy={2}
            r={0}
            fill="#d501a7"
            transform="rotate(180 12 12)"
          >
            <animate
              attributeName="r"
              begin="0.5s"
              calcMode="spline"
              dur="1s"
              keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
              repeatCount="indefinite"
              values="0;2;0;0"
            ></animate>
          </circle>
          <circle
            cx={12}
            cy={2}
            r={0}
            fill="#d501a7"
            transform="rotate(225 12 12)"
          >
            <animate
              attributeName="r"
              begin="0.625s"
              calcMode="spline"
              dur="1s"
              keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
              repeatCount="indefinite"
              values="0;2;0;0"
            ></animate>
          </circle>
          <circle
            cx={12}
            cy={2}
            r={0}
            fill="#d501a7"
            transform="rotate(270 12 12)"
          >
            <animate
              attributeName="r"
              begin="0.75s"
              calcMode="spline"
              dur="1s"
              keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
              repeatCount="indefinite"
              values="0;2;0;0"
            ></animate>
          </circle>
          <circle
            cx={12}
            cy={2}
            r={0}
            fill="#d501a7"
            transform="rotate(315 12 12)"
          >
            <animate
              attributeName="r"
              begin="0.875s"
              calcMode="spline"
              dur="1s"
              keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
              repeatCount="indefinite"
              values="0;2;0;0"
            ></animate>
          </circle>
        </svg>
      </div>
      <p className="text-lg text-gray-600">
        Connecting to a secure server for checkout. Please hold tight, this
        won't take long!
      </p>
    </div>
  );
};

export default LoadingBackend;
