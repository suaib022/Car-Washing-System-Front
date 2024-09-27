import ReviewForm from "./ReviewForm";
import Reviews from "./Reviews";

const Review = () => {
  return (
    <>
      <div className="rounded-xl w-5/6 mx-auto border mt-8">
        <ReviewForm />
      </div>
      <Reviews />
    </>
  );
};

export default Review;
