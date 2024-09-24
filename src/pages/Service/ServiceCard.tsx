/* eslint-disable @typescript-eslint/no-explicit-any */
import { LoadingOutlined } from "@ant-design/icons";
import { Flex, Spin } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import errorImg from "../../assets/images/Result/error-404.png";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { useGetAllServicesQuery } from "../../redux/features/service/serviceApi";

const MAX_DESCRIPTION_LENGTH = 75;
const MAX_NAME_LENGTH = 30;

const ServiceCard = ({ product }: any) => {
  const navigate = useNavigate();
  //   const dispatch = useAppDispatch();

  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showFullName, setShowFullName] = useState(false);
  //   const { disabledCartButtons, setDisabledCartButtons } =
  //     useOutletContext<any>();

  const {
    data: allProducts,
    isLoading: isAllProductsLoading,
    isError: isAllProductsError,
  } = useGetAllServicesQuery({ limit: 5000 });

  const { _id, name, price, description } = product;

  // handle addToCart button status for each product from DB
  //   useEffect(() => {
  //     if (
  //       !isAllProductsLoading &&
  //       !isAllProductsError &&
  //       allProducts
  //     ) {
  //       let disabledButtons = [];

  //       for (let i = 0; i < allProducts.data?.length; i++) {
  //         const product = allProducts.data[i];
  //         const existingCartItem = allCartItems.find(
  //           (item) => item._id === product?._id
  //         );

  //         if (existingCartItem) {
  //           if (
  //             (existingCartItem!.quantity as number) >=
  //             (existingCartItem!.quantityInStock as number)
  //           ) {
  //             disabledButtons.push({ [product._id]: true });
  //           } else {
  //             disabledButtons.push({ [product._id]: false });
  //           }
  //         } else if (product?.quantity === 0) {
  //           disabledButtons.push({ [product._id]: true });
  //         } else {
  //           disabledButtons.push({ [product._id]: false });
  //         }
  //       }

  //       setDisabledCartButtons(disabledButtons);
  //     }
  //   }, [
  //     allCartItems,
  //     allProducts,
  //     isAllProductsLoading,
  //     isAllProductsError,
  //     setDisabledCartButtons,
  //   ]);

  // handle truncate name and description
  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const toggleName = () => {
    setShowFullName(!showFullName);
  };

  const truncateDescription =
    description.length > MAX_DESCRIPTION_LENGTH && !showFullDescription
      ? `${description.substring(0, MAX_DESCRIPTION_LENGTH)}...`
      : description;

  const truncateName =
    name.length > MAX_NAME_LENGTH && !showFullName
      ? `${name.substring(0, MAX_NAME_LENGTH)}...`
      : name;

  //   const isDisabled = disabledCartButtons.find(
  //     (button: any) => button[_id] === true
  //   );

  if (isAllProductsLoading) {
    return (
      <Flex align="center" gap="middle">
        <Spin
          className="fixed inset-0 flex items-center justify-center"
          indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
        />
      </Flex>
    );
  }

  if (isAllProductsError) {
    return <img className="h-[450px] mx-auto" src={errorImg} alt="" />;
  }

  return (
    <Card className="rounded-2xl bg-teal-950 text-white border-0 shadow-md">
      <CardHeader className="gap-2">
        <CardTitle>
          {truncateName}
          {name.length > MAX_NAME_LENGTH && (
            <span
              onClick={toggleName}
              className="text-blue-500 cursor-pointer hover:underline text-lg"
            >
              {showFullName ? " See less" : " See more"}
            </span>
          )}
        </CardTitle>
        <h3 className="text-orange-600 font-semibold">${price}</h3>
      </CardHeader>
      <CardContent>
        <img
          className="h-[200px] mx-auto"
          src="https://i.ibb.co/yykqNz3/Stock-Cake-Modern-Treadmill-Design-1724742141.jpg"
          alt=""
        />
      </CardContent>
      <CardFooter className="  ">
        <div className="space-y-4  flex flex-col mx-auto gap-4">
          <div className="">
            <CardDescription className=" italic text-white">
              {truncateDescription}
              {description.length > MAX_DESCRIPTION_LENGTH && (
                <span
                  onClick={toggleDescription}
                  className="text-blue-500 cursor-pointer hover:underline"
                >
                  {showFullDescription ? " See less" : " See more"}
                </span>
              )}
            </CardDescription>
          </div>
          <div className=" flex justify-between w-full gap-4 ">
            <Button
              onClick={() => navigate(`/services/${product?._id}`)}
              className="bg-blue-500 hover:bg-blue-600 h-9 w-2/5"
            >
              Details
            </Button>
            <Button
              //   disabled={!!isDisabled}
              className="text-white hover:bg-rose-600 bg-rose-500 border-0 max-w-24 hover:text-white h-9 w-3/5"
              variant="outline"
            >
              Book Now
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
