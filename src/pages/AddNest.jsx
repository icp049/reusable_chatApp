import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { getAuth, doc, setDoc } from "firebase/auth";
import { db } from "./firebaseConfig"; // Import your Firebase Firestore instance here

const AddNest = ({ onClose }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [photos, setPhotos] = useState([]);

const [selectedAmenities, setSelectedAmenities] = useState({
        wifi: false,
        parking: false,
        pool: false,
        
    });



    const auth = getAuth();

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


    


    const handleAmenitiesChange = (event) => {
        const { name, checked } = event.target;
        setSelectedAmenities((prevAmenities) => ({
            ...prevAmenities,
            [name]: checked,
        }));
    };





    const handleFormSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const user = auth.currentUser; // Get the currently logged-in user
          if (!user) {
            // Handle case where user is not logged in
            return;
          }
    
          const formData = {
            listingName: e.target.elements.listingName.value,
        description: e.target.elements.description.value,
        lookingFor: e.target.elements.lookingFor.value,
        rentalType: e.target.elements.rentalType.value,
        occupants: e.target.elements.occupants.value,
        photos: photos,
        streetNumber: e.target.elements.streetNumber.value,
        streetName: e.target.elements.streetName.value,
        city: e.target.elements.city.value,
        state: e.target.elements.state.value,
        country: e.target.elements.country.value,
        zipCode: e.target.elements.zipCode.value,
        amenities: selectedAmenities,
        rules: selectedRules,
          };
    
          // Create a new "Posts" document in Firestore
          await setDoc(doc(db, "Posts", user.uid), {
            ...formData,
            amenities: selectedAmenities,
            // Add more fields as needed
          });
    
          onClose(); // Close the form after successfully creating the post
        } catch (err) {
          console.error(err);
          // Handle error if needed
        }
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
                            name="furnished"
                            checked={selectedAmenities.parking}
                            onChange={handleAmenitiesChange}
                        />
                        Furnished
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


                    <label>
                        <input
                            type="checkbox"
                            name="airconditioning"
                            checked={selectedAmenities.pool}
                            onChange={handleAmenitiesChange}
                        />
                        Air Conditioning
                    </label>


                    <label>
                        <input
                            type="checkbox"
                            name="washer"
                            checked={selectedAmenities.pool}
                            onChange={handleAmenitiesChange}
                        />
                       Washer
                    </label>

                    <label>
                        <input
                            type="checkbox"
                            name="dryer"
                            checked={selectedAmenities.pool}
                            onChange={handleAmenitiesChange}
                        />
                       Dryer
                    </label>

                    <label>
                        <input
                            type="checkbox"
                            name="hotcoldshower"
                            checked={selectedAmenities.pool}
                            onChange={handleAmenitiesChange}
                        />
                      Hot & Cold Shower
                    </label>

                    <label>
                        <input
                            type="checkbox"
                            name="bathtub"
                            checked={selectedAmenities.pool}
                            onChange={handleAmenitiesChange}
                        />
                       Bathtub
                    </label>


                    <label>
                        <input
                            type="checkbox"
                            name="privatebathroom"
                            checked={selectedAmenities.pool}
                            onChange={handleAmenitiesChange}
                        />
                       Private Bathroom
                    </label>


                    <label>
                        <input
                            type="checkbox"
                            name="kitchen"
                            checked={selectedAmenities.pool}
                            onChange={handleAmenitiesChange}
                        />
                       Kitchen
                    </label>
                    {/* Add more amenities checkboxes here */}
                </div>

                <div>
                    <h2>Rules</h2>
                    <label>
                        <input
                            type="checkbox"
                          
                           
                        />
                        No parties
                    </label>
                    <label>
                        <input
                            type="checkbox"
                           
                            
                        />
                        Visitors Allowed
                    </label>
                    <label>
                        <input
                            type="checkbox"
                          
                           
                        />
                        No Pets
                    </label>


                    <label>
                        <input
                            type="checkbox"
                          
                           
                        />
                        Noise Hours
                    </label>


                    <label>
                        <input
                            type="checkbox"
                          
                           
                        />
                        Smoking
                    </label>
                    

                    {/* Add more amenities checkboxes here */}
                </div>



                <button type="submit" onClick={handleFormSubmit}>Next</button>
            </form>
            )}
            </Box>
        </Box>
    );
};

export default AddNest;
