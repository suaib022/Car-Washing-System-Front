/* eslint-disable react-hooks/rules-of-hooks */

import { RxCrossCircled } from "react-icons/rx";
import { FaCheckCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";
import errorImg from "../../assets/images/Result/error-404.png";
import { Flex, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useAppDispatch } from "../../redux/hooks";
import { useGetSingleServiceQuery } from "../../redux/features/service/serviceApi";
import { Button } from "../../components/ui/button";
import { useGetAllSlotsQuery } from "../../redux/features/slots/slotApi";
import BookService from "../../components/modal/user/BookService";

const ProductDetails = () => {
  const dispatch = useAppDispatch();
  const { serviceId } = useParams<{ serviceId: string }>();

  if (serviceId === undefined) {
    return <div>Error: ID is missing</div>;
  }

  const {
    data: service,
    isLoading,
    isError,
  } = useGetSingleServiceQuery(serviceId);

  const { data: availableSlots } = useGetAllSlotsQuery({
    service: serviceId,
    isBooked: "available",
  });

  console.log({ service, availableSlots });

  if (isLoading) {
    return (
      <Flex align="center" gap="middle">
        <Spin
          className="fixed inset-0 flex items-center justify-center"
          indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
        />
      </Flex>
    );
  }

  if (isError) {
    return <img className="h-[450px] mx-auto" src={errorImg} alt="" />;
  }

  const { name, price, description, duration, image } = service.data;

  return (
    <>
      <dialog id={`modal_${serviceId}`} className="modal">
        <div className="modal-box bg-teal-950">
          <BookService />
        </div>
      </dialog>
      <div className="flex bg-teal-950 text-white px-6 py-6 rounded-xl shadow-xl sm:flex-row flex-col gap-6">
        <div className="sm:w-1/2 border-red-700 my-auto">
          <img
            className="sm:h-64 sm:w-full md:h-4/5 md:m-auto lg:w-full lg:h-full"
            src={image}
            alt=""
          />
        </div>

        <div className="space-y-3 my-auto sm:w-1/2">
          <h2 className="text-2xl font-semibold text-start">{name}</h2>

          <h2 className="font-semibold text-lg text-start">
            Duration : <span className="text-blue-500">{duration} Minutes</span>
          </h2>
          <p className="text-lg font-semibold">
            Description : <span className="italic">{description}</span>
          </p>
          <Button
            onClick={() => {
              document.getElementById(`modal_${serviceId}`).showModal();
            }}
            disabled={availableSlots?.data?.length <= 0}
            className="bg-rose-600 text-white hover:text-white max-w-24 border-rose-700 hover:bg-rose-700 h-9"
          >
            Book Now
          </Button>
          <h2 className="text-orange-600 font-semibold text-lg text-start">
            $ {price}
          </h2>
          <h2 className="flex items-center gap-1 text-sm">
            {availableSlots?.data?.length > 0 ? (
              <>
                <FaCheckCircle className="text-green-500" />
                <p className="">
                  {availableSlots?.data?.length} slots available
                </p>
              </>
            ) : (
              <>
                <RxCrossCircled className="text-red-500" />
                <p className="">
                  No slot is available at this moment for this service
                </p>
              </>
            )}
          </h2>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
