import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const MainCarousel = ({ photos }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

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
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ position: "relative" }}
        >
            {isHovered && (
                <div
                    onClick={(e) => handlePrevArrowClick(e, () => {})}
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
            {isHovered && (
                <div
                    onClick={(e) => handleNextArrowClick(e, () => {})}
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
            <Carousel
                infiniteLoop={true}
                showThumbs={false}
                showIndicators={false}
                showStatus={false}
                renderArrowPrev={() => null} // Disable default arrow
                renderArrowNext={() => null} // Disable default arrow
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
        </div>
    );
};

export default MainCarousel;
