/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Card } from "antd";
import "./FeaturedCard.css";
import { useNavigate } from "react-router-dom";
import { Button } from "../../ui/button";
import { TbCoinTaka, TbCoinTakaFilled } from "react-icons/tb";

const { Meta } = Card;

const FeaturedCard = ({ item }: any) => {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  // Helper function to truncate description
  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <div
      className="mx-auto card-container"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Card
        className={` ${hovered ? "hovered-card " : ""}`}
        hoverable
        style={{ width: 240, position: "relative", overflow: "hidden" }}
        cover={
          <img
            className="h-64 card-image"
            alt={item.name}
            src={
              item.image ||
              "https://i.pinimg.com/236x/14/4c/f1/144cf1a35751e54383762303b55d114c.jpg"
            }
          />
        }
      >
        <Meta
          description={
            <div className="space-y-2">
              <h2 className="text-lg text-start text-black font-semibold">
                {item.name}
              </h2>
              <div className="text-orange-600 flex items-center justify-start font-semibold">
                <TbCoinTakaFilled className="text-xl" />
                <p className="ml-1">{item.price}</p>
              </div>

              <p className="text-black text-start italic">
                {truncateText(item.description, 60)}
              </p>
            </div>
          }
        />

        <Button
          onClick={() => navigate(`/services/${item?._id}`)}
          className="hover-button w-full rounded-none bg-blue-500 text-white h-10 hover:bg-rose-500"
        >
          Details
        </Button>
      </Card>
    </div>
  );
};

export default FeaturedCard;
