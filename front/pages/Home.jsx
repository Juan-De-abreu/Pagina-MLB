import Carrusel from "./Home/Carrusel";
import Top3WarCard from "./Home/Top3WarCard";
import Top5Avg from "./Home/Top5Avg";
import Top5war from "./Home/Top5war";

const Home = () => {
  const images = [
    "/public/slide1.jpeg",
    "/public/slide2.jpg",
    "/public/slide3.webp",
    "/public/slide4.jpg",
  ];

  return (
    <div className="bg-[var(--body)] min-h-screen pb-4">
      <Carrusel images={images} />
      <Top3WarCard />
      <Top5war />
      <Top5Avg />
    </div>
  );
};

export default Home;
