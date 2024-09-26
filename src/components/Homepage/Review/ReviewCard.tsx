import { FaQuoteLeft } from "react-icons/fa";
import { Rate } from "antd";
import { useNavigate } from "react-router-dom";

const ReviewCard = ({ review }) => {
  const navigate = useNavigate();

  return (
    <div className="border my-10 rounded-2xl justify-evenly py-8 mx-auto w-full flex">
      <div className="w-1/4">
        <FaQuoteLeft className="text-white w-full mt-4" />
      </div>
      <div className="w-3/4 space-y-2 text-white">
        <img
          className=" max-w-16 rounded-full"
          src="https://i.ibb.co/yykqNz3/Stock-Cake-Modern-Treadmill-Design-1724742141.jpg"
          alt=""
        />
        <h2 className="font-bold text-rose-500">{review.customer.name}</h2>
        <Rate
          className=" text-xs rounded-md"
          disabled
          allowHalf
          defaultValue={review?.rating}
        />
        <h2 className="text-gray-400 font-semibold">
          Service Consumed :{" "}
          <span
            onClick={() => navigate(`/services/${review?.service?._id}`)}
            className="text-blue-500 hover:cursor-pointer"
          >
            {review?.service?.name}
          </span>
        </h2>
        <p className="pt-2 italic">{review?.feedback}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
