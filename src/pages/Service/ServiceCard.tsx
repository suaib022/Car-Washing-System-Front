/* eslint-disable @typescript-eslint/no-explicit-any */
import { TbCoinTakaFilled } from "react-icons/tb";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RiTimerLine } from "react-icons/ri";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";

const MAX_DESCRIPTION_LENGTH = 75;
const MAX_NAME_LENGTH = 30;

const ServiceCard = ({ service }: any) => {
  const navigate = useNavigate();

  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showFullName, setShowFullName] = useState(false);

  const { name, price, description, duration, image } = service;

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
    <Card className="rounded-2xl bg-transparent border text-white shadow-md">
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
        <div className="flex justify-between">
          <div className="text-orange-600 flex items-center justify-between font-semibold">
            <TbCoinTakaFilled className="text-xl" />
            <p className="ml-1 text-white">{price}</p>
          </div>
          <div className="text-blue-600 flex items-center justify-between font-semibold">
            <RiTimerLine className="text-xl" />
            <p className="ml-1 text-white">{duration} Min</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <img className="h-[200px] w-3/4 mx-auto" src={image} alt="" />
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
              onClick={() => navigate(`/services/${service?._id}`)}
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
