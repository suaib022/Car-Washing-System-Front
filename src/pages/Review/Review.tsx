import { useGetAllReviewsQuery } from "../../redux/features/review/reviewApi";
import ReviewCard from "../../components/Homepage/Review/ReviewCard";
import img from "../../assets/images/Result/no-data-found.jpg";

const Review = () => {
  const { data: allReviews, isFetching } = useGetAllReviewsQuery({
    limit: 50000,
  });

  if (isFetching) {
    return (
      <span className="loading loading-dots loading-lg h-screen mx-auto flex"></span>
    );
  }

  if (allReviews?.data?.length === 0) {
    return <img src={img} />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 mx-4 lg:grid-cols-4">
      {allReviews?.data?.map((review: any) => (
        <div key={review?._id} className="">
          <ReviewCard review={review} />
        </div>
      ))}
    </div>
  );
};

export default Review;
