import React, { useState } from 'react'

const Carrusel = (images) => {
    const [current, setCurrent] = useState(0);

    const { images: imagesArray } = images;

    const prevSlide = () => {
        setCurrent((prev) => (prev === 0 ? imagesArray.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setCurrent((prev) => (prev === imagesArray.length - 1 ? 0 : prev + 1));
    };
    const nextSlideAuto = () => {
        setCurrent((prev) => (prev === imagesArray.length - 1 ? 0 : prev + 1));
    };

    React.useEffect(() => {
        const interval = setInterval(() => {
            nextSlideAuto();
        }, 4000);
        return () => clearInterval(interval);
    }, [imagesArray.length,nextSlide,prevSlide]);

    return (
        <div>
            <div className="w-full flex justify-center">
                <div className="w-18/18">
                    <div className="relative">
                        <div className="overflow-hidden rounded-lg shadow-lg shadow-[#180407]">
                            <img
                                src={imagesArray[current]}
                                alt={`Slide ${current + 1}`}
                                className="w-full h-110 sm:h-160 lg:h-175 mask-contain"
                            />

                            <div className="absolute inset-0 bg-[#00000080] bg-opacity-100 pointer-events-none rounded-lg"></div>
                        </div>
                        <button
                            className="absolute bg-[#0000003f] top-1/2 left-0 transform -translate-y-1/2 h-full hover:bg-[#29090d54] py-10 px-7 shadow-md text-[#6b1607] hover:text-[#fafafa86] text-5xl"
                            onClick={prevSlide}
                        >
                            &#8592;
                        </button>
                        <button
                            className="absolute bg-[#0000003f] top-1/2 right-0 transform -translate-y-1/2 h-full hover:bg-[#29090d54] py-10 px-7 shadow-md text-[#6b1607] hover:text-[#fafafa86] text-5xl text"
                            onClick={nextSlide}
                        >
                            &#8594;
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Carrusel