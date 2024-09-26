import { useEffect, useState } from "react";
import banner from "../../../assets/images/banner/banner.jpg";
import "./Banner.css";

const Banner = () => {
  const [showText, setShowText] = useState(false);
  const [showText2, setShowText2] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText2(true);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="banner-container relative">
      <img className="w-full  object-cover" src={banner} alt="EcoWash Banner" />

      <div className="banner-content absolute top-0 left-0 w-full h-full flex md:flex-col justify-evenly items-start text-center text-white flex-row">
        <div className=" w-1/2">
          <h1
            className={`text-4xl text-start font-bold uppercase tracking-widest mb-4  duration-700 ease-out ${
              showText
                ? "opacity-100 -translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            Where Your Car Gets the{" "}
            <span className="bg-gradient-to-r from-red-500 to-red-800 bg-clip-text text-transparent brightness-200">
              VIP
            </span>{" "}
            Treatment
          </h1>
          <p
            className={`text-xl text-start hidden sm:block tracking-wide    duration-700 ease-out ${
              showText2
                ? "opacity-100 -translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            Experience premium, eco-friendly car care at EcoWash. From hand
            washes to detailing, we give every car the VIP treatment for a
            showroom shine while protecting the environment.
          </p>
        </div>
        <div className="  flex flex-col justify-evenly">
          <button
            className={`btn mt-12 btn-outline hover:text-white hover:bg-gradient-to-r from-purple-600 to-purple-900 hover:border-0 ... bg-clip-border w-full border-white  text-white ${
              showButton
                ? "opacity-100 -translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <span className="font-medium text-xl ">Book A Service</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
