import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { auth, db, storage} from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc, collection, addDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { getAuth } from "firebase/auth";


const AddNest = ({ onClose }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [photos, setPhotos] = useState([]);

  const rentalTypes = ["Entire Home", "Private Room", "Shared Room", "Bedspace"];


   
    const [formData, setFormData] = useState({
        listingName: "",
        description: "",
        lookingFor: "",
        rentalType: "",
        occupants: "",
        streetNumber: "",
        streetName: "",
        city: "",
        state: "",
        country: "",
        zipCode: "",
    
    });

const [selectedAmenities, setSelectedAmenities] = useState({
        wifi: false,
        parking: false,
        pool: false,
        airconditioning : false,
        washer: false,
        dryer: false,
        shower: false,
        bathtub: false,
        privatebathroom: false,
        kitchen: false,
        
    });


    const [selectedRules, setSelectedRules] = useState({
        parties: false,
        visitors: false,
        npopets: false,
        noisehours: false,
        smoking: false,
        
    });

    const handleFormInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };




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



    const handleRulesChange = (event) => {
        const { name, checked } = event.target;
        setSelectedRules((prevRules) => ({
            ...prevRules,
            [name]: checked,
        }));
    };



    const handleIncludeChange = (event) => {
        const { name, checked } = event.target;
        setSelectedInclude((prevInclude) => ({
            ...prevRules,
            [name]: checked,
        }));
    };





    const handleFormSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const user = auth.currentUser;
            if (!user) {
                return;
            }

            const finalFormData = {
                ...formData,
                photos: photos,
                amenities: selectedAmenities,
                rules: selectedRules,
            };
    
            // Create a new "Posts" document in Firestore
            const newPostRef = doc(collection(db, "Posts"));
            await setDoc(newPostRef, finalFormData);

            const myPostsCollectionRef = collection(db, "users", user.uid, "myPosts");

            // Add the newly created post's ID to the "myPosts" subcollection
            await addDoc(myPostsCollectionRef, { postId: newPostRef.id });
    
            // Clear the form data after submitting
            setFormData({
                listingName: "",
                description: "",
                lookingFor: "",
                rentalType: "",
                occupants: "",
                price: "",
                streetNumber: "",
                streetName: "",
                city: "",
                state: "",
                country: "",
                zipCode: "",
            });
    
            setSelectedAmenities({
                wifi: false,
                parking: false,
                pool: false,
                airconditioning: false,
                washer: false,
                dryer: false,
                shower: false,
                bathtub: false,
                privatebathroom: false,
                kitchen: false,
            });
    
            setSelectedRules({
                parties: false,
                visitors: false,
                npopets: false,
                noisehours: false,
                smoking: false,
            });
    
            setPhotos([]);
    
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
            name="listingName"
            value={formData.listingName}
            onChange={handleFormInputChange}
        />
        <textarea
            placeholder="Description"
            name="description"
            value={formData.description}
            onChange={handleFormInputChange}
        ></textarea>
        <textarea
            placeholder="Looking for..."
            name="lookingFor"
            value={formData.lookingFor}
            onChange={handleFormInputChange}
        ></textarea>
        <select
            name="rentalType"
            value={formData.rentalType}
            onChange={handleFormInputChange}
        >
            <option value=""> Select Accomodation Type</option>
            {rentalTypes.map((type, index) => (
                <option key={index} value={type}>
                    {type}
                </option>
            ))}
        </select>
        <input
            type="text"
            placeholder="Number of Occupants"
            name="occupants"
            value={formData.occupants}
            onChange={handleFormInputChange}
        />
         <input
            type="text"
            placeholder="Price per month"
            name="price"
            value={formData.price}
            onChange={handleFormInputChange}
        />
        <input
            type="file"
            accept="image/*"
            multiple
            onChange={handlePhotoUpload}
            // Limit the number of photos to 5
            max="5"
            name="photos" 
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
            name="streetNumber"
            value={formData.streetNumber}
            onChange={handleFormInputChange}
        />
        <input
            type="text"
            placeholder="Street Name"
            name="streetName"
            value={formData.streetName}
            onChange={handleFormInputChange}
        />
        <input
            type="text"
            placeholder="City"
            name="city"
            value={formData.city}
            onChange={handleFormInputChange}
        />
        <input
            type="text"
            placeholder="State/Province"
            name="state"
            value={formData.state}
            onChange={handleFormInputChange}
        />
        <input
            type="text"
            placeholder="Country"
            name="country"
            value={formData.country}
            onChange={handleFormInputChange}
        />
        <input
            type="text"
            placeholder="Zip Code"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleFormInputChange}
        />
        <button type="submit">Next</button>
    </form>
)}


                {activeStep === 2 && (
                    
                 <form onSubmit={handleFormSubmit}>
             
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
                            checked={selectedAmenities.airconditioning}
                            onChange={handleAmenitiesChange}
                        />
                        Air Conditioning
                    </label>


                    <label>
                        <input
                            type="checkbox"
                            name="washer"
                            checked={selectedAmenities.washer}
                            onChange={handleAmenitiesChange}
                        />
                       Washer
                    </label>

                    <label>
                        <input
                            type="checkbox"
                            name="dryer"
                            checked={selectedAmenities.dryer}
                            onChange={handleAmenitiesChange}
                        />
                       Dryer
                    </label>

                    <label>
                        <input
                            type="checkbox"
                            name="hotcoldshower"
                            checked={selectedAmenities.shower}
                            onChange={handleAmenitiesChange}
                        />
                      Hot & Cold Shower
                    </label>

                    <label>
                        <input
                            type="checkbox"
                            name="bathtub"
                            checked={selectedAmenities.bathtub}
                            onChange={handleAmenitiesChange}
                        />
                       Bathtub
                    </label>


                    <label>
                        <input
                            type="checkbox"
                            name="privatebathroom"
                            checked={selectedAmenities.privatebathroom}
                            onChange={handleAmenitiesChange}
                        />
                       Private Bathroom
                    </label>


                    <label>
                        <input
                            type="checkbox"
                            name="kitchen"
                            checked={selectedAmenities.kitchen}
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
                            name="parties"
                            checked={selectedRules.parties}
                            onChange={handleRulesChange}
                           
                        />
                        No parties
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="visitors"
                            checked={selectedAmenities.visitors}
                            onChange={handleRulesChange}
                            
                        />
                        Visitors Allowed
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="nopets"
                            checked={selectedAmenities.nopets}
                            onChange={handleRulesChange}
                           
                        />
                        No Pets
                    </label>


                    <label>
                        <input
                            type="checkbox"
                            name="noisehours"
                            checked={selectedAmenities.noisehours}
                            onChange={handleRulesChange}
                           
                        />
                        Noise Hours
                    </label>


                    <label>
                        <input
                            type="checkbox"
                            name="smoking"
                            checked={selectedAmenities.smoking}
                            onChange={handleRulesChange}
                           
                        />
                        Smoking
                    </label>
                    

                    {/* Add more amenities checkboxes here */}
                </div>



                <button type="submit">Add Listing</button>
            </form>
            )}
            </Box>
        </Box>
    );
};

export default AddNest;
