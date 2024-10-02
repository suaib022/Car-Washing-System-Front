import { useEffect, useRef, useState } from "react";
import ReviewForm from "./ReviewForm";
import Reviews from "./Reviews";
import "./Review.css";
import { motion } from "framer-motion";
const Review = () => {
  const [isVisible, setIsVisible] = useState(false);
  const reviewRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (reviewRef.current) {
      observer.observe(reviewRef.current);
    }

    return () => {
      if (reviewRef.current) {
        observer.unobserve(reviewRef.current);
      }
    };
  }, []);

  return (
    <>
      <motion.div
        ref={reviewRef}
        initial={{ opacity: 0, y: 50, scale: 0.8 }}
        animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ willChange: "opacity, transform" }}
      >
        <div className="rounded-xl w-5/6 mx-auto border mt-8">
          <ReviewForm />
        </div>
        <Reviews />
      </motion.div>
    </>
  );
};

export default Review;
