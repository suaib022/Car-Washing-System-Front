import { Rate } from "antd";
import { useGetAllReviewsQuery } from "../../../redux/features/review/reviewApi";
import ReviewCard from "./ReviewCard";
import { Button } from "../../ui/button";
import { useNavigate } from "react-router-dom";

type TStatistics = {
  totalReviews: number;
  totalRatings: number;
  averageRating: number;
  fiveStars: number;
  fourStars: number;
  threeStars: number;
  twoStars: number;
  oneStar: number;
};

const Reviews = () => {
  const navigate = useNavigate();

  const { data: allReviews, isFetching } = useGetAllReviewsQuery({
    limit: 2,
    sort: "-createdAt",
  });

  const { data: allReviewsWithoutLimit, isFetching: isAllReviewsFetching } =
    useGetAllReviewsQuery({
      limit: 50000,
      sort: "-createdAt",
    });

  const statistics: TStatistics = allReviewsWithoutLimit?.data?.reduce(
    (acc: any, review: any) => {
      const rating = parseFloat(review.rating.toFixed(2));

      acc.totalReviews += 1;
      acc.totalRatings += rating;

      if (rating === 5) acc.fiveStars += 1;
      else if (rating === 4) acc.fourStars += 1;
      else if (rating === 3) acc.threeStars += 1;
      else if (rating === 2) acc.twoStars += 1;
      else if (rating === 1) acc.oneStar += 1;

      return acc;
    },
    {
      totalReviews: 0,
      totalRatings: 0,
      averageRating: 0,
      fiveStars: 0,
      fourStars: 0,
      threeStars: 0,
      twoStars: 0,
      oneStar: 0,
    }
  );

  if (statistics?.totalReviews > 0) {
    statistics.totalRatings = parseFloat(statistics.totalRatings.toFixed(2));
    statistics.averageRating = parseFloat(
      (statistics.totalRatings / statistics.totalReviews).toFixed(2)
    );
  }

  if (isFetching || isAllReviewsFetching) {
    return (
      <span className="loading loading-dots flex my-32 mx-auto loading-lg"></span>
    );
  }

  return (
    <div>
      <h2 className="text-4xl text-white text-center font-bold my-6 mx-auto flex pt-6 justify-center">
        What Our Customers Say?
      </h2>
      <div className="flex sm:flex-row justify-evenly items-center flex-col mb-12">
        <div className="text-center space-y-4">
          <h1 className="text-8xl text-white">{statistics?.averageRating}</h1>
          <Rate
            className="bg-gray-400 py-4 px-5 rounded-md"
            disabled
            allowHalf
            defaultValue={Math.floor(statistics?.averageRating) + 0.5}
          />
          <h2 className="text-white">
            {statistics?.totalReviews} reviews & {statistics?.totalRatings}{" "}
            ratings
          </h2>
        </div>
        <div className="flex  flex-col space-y-2">
          <div className="flex items-center gap-2">
            <h2 className="text-white font-semibold text-lg">5</h2>
            <progress
              className="progress progress-error w-56"
              value={(statistics?.fiveStars / statistics?.totalReviews) * 100}
              max="100"
            ></progress>
          </div>

          <div className="flex items-center gap-2">
            <h2 className="text-white font-semibold text-lg">4</h2>
            <progress
              className="progress progress-error w-56"
              value={(statistics?.fourStars / statistics?.totalReviews) * 100}
              max="100"
            ></progress>
          </div>

          <div className="flex items-center gap-2">
            <h2 className="text-white font-semibold text-lg">3</h2>
            <progress
              className="progress progress-error w-56"
              value={(statistics?.threeStars / statistics?.totalReviews) * 100}
              max="100"
            ></progress>
          </div>

          <div className="flex items-center gap-2">
            <h2 className="text-white font-semibold text-lg">2</h2>
            <progress
              className="progress progress-error w-56"
              value={(statistics?.twoStars / statistics?.totalReviews) * 100}
              max="100"
            ></progress>
          </div>

          <div className="flex items-center gap-2">
            <h2 className="text-white font-semibold text-lg mr-1">1</h2>
            <progress
              className="progress progress-error w-56"
              value={(statistics?.oneStar / statistics?.totalReviews) * 100}
              max="100"
            ></progress>
          </div>
        </div>
      </div>
      <div className=" sm:flex justify-evenly ">
        {allReviews?.data?.map((review: any) => (
          <div key={review?._id} className="sm:w-1/2 mx-0 sm:mx-4 w-full">
            <ReviewCard review={review} />
          </div>
        ))}
      </div>
      {allReviewsWithoutLimit?.data?.length > 2 && (
        <div>
          <Button
            onClick={() => navigate("/review")}
            className="flex mx-auto w-1/4 text-white hover:bg-rose-500 text-md font-semibold mb-12 bg-[#f43f5e]"
          >
            See More
          </Button>
        </div>
      )}
      <div className="mb-6"></div>
    </div>
  );
};

export default Reviews;
