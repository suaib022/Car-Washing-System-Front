import React from "react";
import ReviewForm from "./ReviewForm";
import Reviews from "./Reviews";

const Review = () => {
  return (
    <>
      <div className="rounded-xl w-5/6 mx-auto border ">
        <h2 className="text-4xl text-white text-center font-bold my-6 mx-auto flex pt-6 justify-center">
          Share Your Experience With Us
        </h2>
        <ReviewForm />
      </div>
      <Reviews />
    </>
  );
};

export default Review;
