import Banner from "../../components/Homepage/Banner/Banner";
import ScrollToTopButton from "../../components/Homepage/Button/ScrollToTopButton";
import Featured from "../../components/Homepage/Featured/Featured";
import Review from "../../components/Homepage/Review/Review";

const Home = () => {
  return (
    <div>
      <Banner />
      <Featured />
      <Review />
      <ScrollToTopButton />
    </div>
  );
};

export default Home;
