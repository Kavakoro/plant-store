import React from "react";
import "../../public/ReturnPolicy.css";

const ReturnPolicy = () => {
  return (
    <div className="return">
      <h1>Return Policy</h1>
      <br />
      <div>
        <h2>Can you return plants? No.</h2>
        <p>
          At this time, Bloomscape does not accept returns on plants, but we do
          guarantee every plant will arrive in great condition, and all plants
          are guaranteed for <b>1 day after arrival</b>. (Please note: Repotting
          your plant into a new container within the first 30 days will void the
          guarantee.) If your plant or pot arrived damaged, and your purchase
          was made less than 30 days ago, please have your order number and
          photo of your damaged plant ready. Then, let us know via the form
          below so we can ship a replacement for you as soon as possible.
        </p>
      </div>
    </div>
  );
};

export default ReturnPolicy;
