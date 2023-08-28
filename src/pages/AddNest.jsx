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

    const steps = ["Step 1: Information", "Step 2: Review"];

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

            <Stepper activeStep={activeStep} orientation="horizontal">
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            {activeStep === 0 && (
                <Box
                    width="400px"
                    padding="20px"
                    borderRadius="5px"
                    bgcolor="white"
                    boxShadow="0 2px 5px rgba(0, 0, 0, 0.3)"
                    boxSizing="border-box"
                >
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="input-field"
                    />

                    <label>Photos (5 to 10):</label>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => setPhotos(Array.from(e.target.files))}
                        style={{ marginTop: "5px" }}
                    />

                    <label>Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="input-field"
                    ></textarea>

                    <label>Location:</label>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="input-field"
                    />

                    <div>
                        <button
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            style={{ marginRight: "10px" }}
                        >
                            Back
                        </button>
                        <button onClick={handleNext}>Next</button>
                    </div>
                </Box>
            )}

            {activeStep === 1 && (
                <Box
                    width="400px"
                    padding="20px"
                    borderRadius="5px"
                    bgcolor="white"
                    boxShadow="0 2px 5px rgba(0, 0, 0, 0.3)"
                    boxSizing="border-box"
                >
                    <h3>Hello! You've completed Step 1.</h3>
                    <p>Now you can add more content or proceed to submit.</p>
                    <button onClick={handleNext}>Next</button>
                </Box>
            )}

            {activeStep === steps.length && (
                <Box
                    width="400px"
                    padding="20px"
                    borderRadius="5px"
                    bgcolor="white"
                    boxShadow="0 2px 5px rgba(0, 0, 0, 0.3)"
                    boxSizing="border-box"
                >
                    <h3>Submission Successful!</h3>
                    <p>Your listing has been added.</p>
                    <button onClick={onClose}>Close</button>
                </Box>
            )}
        </Box>
    );
};

export default AddNest;
