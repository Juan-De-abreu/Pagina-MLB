import Carrusel from "./Home/Carrusel";
import Top5war from "./Home/Top5war";

const Home = () => {
const images = [
    "/public/slide1.jpeg",
    "/public/slide2.jpg",
    "/public/slide3.webp",
    "/public/slide4.jpg",
];

return (
    <div>
        <Carrusel images={images}  />
        <Top5war/>
    </div>
)
}

export default Home