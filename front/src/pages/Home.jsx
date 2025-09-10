import Carrusel from "../components/Carrusel";

const Home = () => {
const images = [
    "/public/slide1.jpeg",
    "/public/slide2.jpg",
    "/public/slide3.webp",
    "/public/slide4.jpg",
];

return (
    <div>
        <Carrusel images={images} />
    </div>
)
}

export default Home