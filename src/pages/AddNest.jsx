import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

const AddNest = ({ onClose }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [photos, setPhotos] = useState([]);

    const steps = ["General Info", "Location", "Amenities/Rules"];

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handlePhotoUpload = (event) => {
        const newPhotos = [...photos];
        const files = event.target.files;

        for (let i = 0; i < files.length && i < 5; i++) {
            newPhotos.push(URL.createObjectURL(files[i]));
        }

        setPhotos(newPhotos);
    };


    const [selectedAmenities, setSelectedAmenities] = useState({
        wifi: false,
        parking: false,
        pool: false,
        // Add more amenities here
    });



    const handleAmenitiesChange = (event) => {
        const { name, checked } = event.target;
        setSelectedAmenities((prevAmenities) => ({
            ...prevAmenities,
            [name]: checked,
        }));
    };












    

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            minHeight="100vh"
            bgcolor="orange"
        >
            <h2>Add a New Listing</h2>

            {/* Close Button */}
            <button
                onClick={onClose}
                style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    backgroundColor: "white",
                    border: "none",
                    cursor: "pointer",
                }}
            >
                Close
            </button>

            <Stepper activeStep={activeStep} orientation="horizontal">
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            <Box
                width="400px"
                padding="20px"
                borderRadius="5px"
                bgcolor="white"
                boxShadow="0 2px 5px rgba(0, 0, 0, 0.3)"
                boxSizing="border-box"
            >
                {activeStep === 0 && (
                    <form onSubmit={handleNext}>
                        <input
                            type="text"
                            placeholder="Listing Name"
                        />
                        <textarea
                            placeholder="Description"
                        ></textarea>
                        <textarea
                            placeholder="Looking for..."
                        ></textarea>
                        <input
                            type="text"
                            placeholder="Rental Type"
                        />
                        <input
                            type="text"
                            placeholder="Number of Occupants"
                        />
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handlePhotoUpload}
                            // Limit the number of photos to 5
                            max="5"
                        />
                        <div className="photo-grid">
                            {photos.map((photo, index) => (
                                <img key={index} src={photo} alt={`Uploaded ${index}`} />
                            ))}
                        </div>
                        <button type="submit">Next</button>
                    </form>
                )}

                {activeStep === 1 && (
                    <form onSubmit={handleNext}>
                        {/* Location inputs */}

                        <input
                            type="text"
                            placeholder="Street Number"
                        />
                        <input
                            type="text"
                            placeholder="Street Name"
                        />
                        <input
                            type="text"
                            placeholder="City"
                        />
                        <input
                            type="text"
                            placeholder="State/Province"
                        />

<input
                            type="text"
                            placeholder="Country"
                        />

<input
                            type="text"
                            placeholder="Zip Code"
                        />
                        <button type="submit">Next</button>
                    </form>
                )}

                {activeStep === 2 && (
                    
                 <form onSubmit={handleNext}>
             
                <div>
                    <h2>Amenities</h2>
                    <label>
                        <input
                            type="checkbox"
                            name="wifi"
                            checked={selectedAmenities.wifi}
                            onChange={handleAmenitiesChange}
                        />
                        WiFi
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="parking"
                            checked={selectedAmenities.parking}
                            onChange={handleAmenitiesChange}
                        />
                        Parking
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="pool"
                            checked={selectedAmenities.pool}
                            onChange={handleAmenitiesChange}
                        />
                        Pool
                    </label>
                    {/* Add more amenities checkboxes here */}
                </div>

                <div>
                    <h2>Rules</h2>
                    <label>
                        <input
                            type="checkbox"
                            name="wifi"
                            checked={selectedAmenities.wifi}
                            onChange={handleAmenitiesChange}
                        />
                        WiFi
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="parking"
                            checked={selectedAmenities.parking}
                            onChange={handleAmenitiesChange}
                        />
                        Parking
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="pool"
                            checked={selectedAmenities.pool}
                            onChange={handleAmenitiesChange}
                        />
                        Pool
                    </label>
                    {/* Add more amenities checkboxes here */}
                </div>



                <button type="submit">Next</button>
            </form>
            )}
            </Box>
        </Box>
    );
};

export default AddNest;
