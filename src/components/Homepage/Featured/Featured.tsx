/* eslint-disable @typescript-eslint/no-explicit-any */
import FeaturedCard from "./Card";
import { Button } from "../../ui/button";
import { useNavigate } from "react-router-dom";
import errorImg from "../../../assets/images/Result/error-404.png";
import { useGetAllServicesQuery } from "../../../redux/features/service/serviceApi";

const Featured = () => {
  const {
    data: products,
    isError,
    isFetching,
  } = useGetAllServicesQuery({ limit: 6 });

  const navigate = useNavigate();

  if (isError) {
    <img className="h-[450px] mx-auto" src={errorImg} alt="" />;
  }

  return (
    <div className="rounded-md">
      <h2 className="text-4xl text-white text-center font-bold my-12 mx-auto flex pt-6 justify-center">
        Featured Services
      </h2>
      {isFetching ? (
        <span className="loading loading-dots flex my-32 mx-auto loading-lg"></span>
      ) : (
        <>
          <div className="grid text-center gap-y-6 sm:grid-cols-2 md:grid-cols-3 mx-8 lg:grid-cols-4">
            {products?.data.map((item: any) => (
              <FeaturedCard key={item?._id} item={item} />
            ))}
          </div>
          <div className="pb-6">
            <Button
              onClick={() => navigate("/services")}
              className="mt-8 bg-rose-500 w-40 hover:bg-rose-600 mx-auto flex"
            >
              Explore More
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
