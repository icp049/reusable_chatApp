import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";

const AddNest = ({ onClose }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [title, setTitle] = useState("");
    const [photos, setPhotos] = useState([]);
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [amenities, setAmenities] = useState("");
    const [rules, setRules] = useState("");

    const steps = ["General Info", "Location", "Amenities/Rules"];

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
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
                            required
                            type="text"
                            placeholder="Listing Name"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <input
                            required
                            type="text"
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <textarea
                            required
                            placeholder="Looking for..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={(e) => setPhotos(e.target.files)}
                        />
                        <button type="submit">Next</button>
                    </form>
                )}

                {activeStep === 1 && (
                    <form onSubmit={handleNext}>
                        {/* Location inputs */}
                        <button type="submit">Next</button>
                    </form>
                )}

                {activeStep === 2 && (
                    <form onSubmit="">
                        {/* Amenities/Rules inputs */}
                        <button type="submit">Submit</button>
                    </form>
                )}
            </Box>
        </Box>
    );
};

export default AddNest;
