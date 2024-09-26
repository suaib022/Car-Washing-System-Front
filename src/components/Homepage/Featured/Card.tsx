/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Card } from "antd";
import "./FeaturedCard.css";
import { useNavigate } from "react-router-dom";
import { Button } from "../../ui/button";

const { Meta } = Card;

const FeaturedCard = ({ item }: any) => {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

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
            alt=""
            src="https://i.pinimg.com/236x/14/4c/f1/144cf1a35751e54383762303b55d114c.jpg"
          />
        }
      >
        <Meta title={item.name} description="" />
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
