import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const MainCarousel = ({ photos }) => {
    const handlePrevArrowClick = (e, onClickHandler) => {
        e.preventDefault(); // Prevent default link behavior
        e.stopPropagation(); // Stop event propagation
        onClickHandler();
    };

    const handleNextArrowClick = (e, onClickHandler) => {
        e.preventDefault(); // Prevent default link behavior
        e.stopPropagation(); // Stop event propagation
        onClickHandler();
    };

    return (
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
                            width: "100%",
                            height: "300px",
                            objectFit: "cover",
                            backgroundAttachment: "fixed",
                           
                        }}
                    />
                </div>
            ))}
        </Carousel>
    );
};

export default MainCarousel;
