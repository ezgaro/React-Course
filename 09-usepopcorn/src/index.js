import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// import StarRating from "./StarRating";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/* <StarRating
      maxRating={5}
      messages={["Terrible", "Bad", "Okay", "Good", "Amazing "]}
      defaultRating={3}
    />
    <StarRating size={24} color="red" maxRating={10} className="test"/> */}
  </React.StrictMode>
);
