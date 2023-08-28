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

            {activeStep === 0 && (
                <Box
                    width="400px"
                    padding="20px"
                    borderRadius="5px"
                    bgcolor="white"
                    boxShadow="0 2px 5px rgba(0, 0, 0, 0.3)"
                    boxSizing="border-box"
                >
                    {/* ... (step 0 content) */}
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
                    {/* ... (step 1 content) */}
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
                    {/* ... (submission successful content) */}
                </Box>
            )}
        </Box>
    );
};


export default AddNest;
