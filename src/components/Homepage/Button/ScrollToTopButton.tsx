import { useState, useEffect } from "react";
import { MdVerticalAlignTop } from "react-icons/md";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <button
      onClick={scrollToTop}
      style={{
        display: isVisible ? "block" : "none",
        position: "fixed",
        bottom: "30px",
        right: "30px",
        padding: "10px",
        backgroundColor: "#007BFF",
        color: "#fff",
        border: "none",
        borderRadius: "50%",
        cursor: "pointer",
        width: "50px",
        height: "50px",
        textAlign: "center",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      }}
    >
      <MdVerticalAlignTop className="mx-auto text-3xl" />
    </button>
  );
};

export default ScrollToTopButton;
