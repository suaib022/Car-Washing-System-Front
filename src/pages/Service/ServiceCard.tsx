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

  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showFullName, setShowFullName] = useState(false);

  const { name, price, description } = product;

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
        <div className="space-y-4  w-full text-center flex flex-col mx-auto gap-4">
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
          <div className=" flex justify-center">
            <Button
              onClick={() => navigate(`/services/${product?._id}`)}
              className="bg-blue-500 w-3/4 hover:bg-blue-600 h-9"
            >
              Details
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
