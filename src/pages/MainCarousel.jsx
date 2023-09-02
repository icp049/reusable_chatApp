import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const MainCarousel = ({ photos }) => {
    const [isCarouselHovered, setIsCarouselHovered] = useState(false);

    const handlePrevArrowClick = (e, onClickHandler) => {
        e.preventDefault();
        e.stopPropagation();
        onClickHandler();
    };

    const handleNextArrowClick = (e, onClickHandler) => {
        e.preventDefault();
        e.stopPropagation();
        onClickHandler();
    };

    return (
        <div
            onMouseEnter={() => setIsCarouselHovered(true)}
            onMouseLeave={() => setIsCarouselHovered(false)}
            style={{ position: "relative" }}
        >
            <Carousel
                infiniteLoop={true}
                showThumbs={false}
                showIndicators={false}
                showStatus={false}
                renderArrowPrev={(onClickHandler) => (
                    <div
                        onClick={(e) => handlePrevArrowClick(e, onClickHandler)}
                        style={{
                            position: "absolute",
                            top: "50%",
                            left: "0",
                            color: "white",
                            padding: "5px",
                            zIndex: "2",
                            opacity: isCarouselHovered ? 1 : 0,
                            transition: "opacity 0.3s ease-in-out",
                        }}
                    >
                        <NavigateBeforeIcon sx={{ fontSize: 20 }} />
                    </div>
                )}
                renderArrowNext={(onClickHandler) => (
                    <div
                        onClick={(e) => handleNextArrowClick(e, onClickHandler)}
                        style={{
                            position: "absolute",
                            top: "50%",
                            right: "0",
                            color: "white",
                            padding: "5px",
                            zIndex: "2",
                            opacity: isCarouselHovered ? 1 : 0,
                            transition: "opacity 0.3s ease-in-out",
                        }}
                    >
                        <NavigateNextIcon sx={{ fontSize: 20 }} />
                    </div>
                )}
            >
                {photos.map((photo, index) => (
                    <div key={`carousel-image-${index}`}>
                        <img
                            src={photo}
                            alt={`carousel-${index}`}
                            style={{
                                borderRadius:"20px",
                                width: "400px",
                                height: "300px",
                                objectFit: "cover",
                                backgroundAttachment: "fixed",
                            }}
                        />
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default MainCarousel;
