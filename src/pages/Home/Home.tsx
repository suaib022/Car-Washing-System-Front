import Banner from "../../components/Homepage/Banner/Banner";
import ScrollToTopButton from "../../components/Homepage/Button/ScrollToTopButton";
import Compare from "../../components/Homepage/Compare/Compare";
import Featured from "../../components/Homepage/Featured/Featured";
import Review from "../../components/Homepage/Review/Review";

const Home = () => {
  return (
    <div>
      <Banner />
      <Compare />
      <Featured />
      <Review />
      <ScrollToTopButton />
    </div>
  );
};

export default Home;
