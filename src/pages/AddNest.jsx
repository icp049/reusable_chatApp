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
import { v4 as uuidv4 } from 'uuid';

import styles from "../styles/Addnest.module.css";

import Compressor from 'compressorjs';


import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



import {
    
    getStorage,
    ref as storageRef,
    uploadBytes,
 
} from "firebase/storage";








const AddNest = ({ onClose }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [photos, setPhotos] = useState([]);
    const [uploadedPhotoURLs, setUploadedPhotoURLs] = useState([]);
    

  const rentalTypes = ["Entire Home", "Private Room", "Shared Room", "Bedspace"];
  const lookingFor = ["Tenant", "Roomie", "Housemate"];


   
    const [formData, setFormData] = useState({
        listingName: "",
        description: "",
        lookingFor: "",
        preference: "",
        rentalType: "",
        occupants: "",
        price: "",
        deposit: "",
        streetNumber: "",
        streetName: "",
        city: "",
        state: "",
        country: "",
        zipCode: "",
        availableOn: "",
        isAvailable: true,
    
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



    const [selectedInclude, setSelectedInclude] = useState({
        includeutilities: false,
        noutilities: false,
        
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

    const handlePhotoUpload = async (event) => {
        const newPhotos = [...photos];
        const files = event.target.files;
      
        for (let i = 0; i < files.length && i < 5; i++) {
          const uniqueId = uuidv4(); // Generate a unique identifier for the photo
          const photoObject = {
            id: uniqueId,
            file: files[i],
            url: URL.createObjectURL(files[i]),
          };
      
          // Use Compressor to compress the image before adding it to the newPhotos array
          const compressedFile = await new Promise((resolve) => {
            new Compressor(photoObject.file, {
              quality: 0.005,
              success: (result) => {
                resolve(result);
              },
            });
          });
      
          photoObject.file = compressedFile;
          newPhotos.push(photoObject);
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
            ...prevInclude,
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
            const displayName = user.displayName;
            const posterPhoto = user.photoURL;
            

         
           


            const storage = getStorage();
  
            // Upload photos and get their download URLs
            const uploadedPhotoURLs = await Promise.all(
                photos.map(async (photoObject, index) => {
                  const { id, file } = photoObject;
                  const photoRef = storageRef(
                    storage,
                    `listingPhotos/${user.uid}/${id}`
                  );
        
                  const photoBlob = await fetch(photoObject.url).then((res) =>
                    res.blob()
                  );
                  await uploadBytes(photoRef, photoBlob);
                  return getDownloadURL(photoRef);
                })
              );
          

            const finalFormData = {
                ...formData,
                photos: photos,
                amenities: selectedAmenities,
                rules: selectedRules,
                postedBy: displayName,
                posterImage: posterPhoto,
                photos: uploadedPhotoURLs,
                // Save the photo URLs in the document
            };


            
    
            // Create a new "Posts" document in Firestore
            const newPostRef = doc(collection(db, "Posts"));
            await setDoc(newPostRef, finalFormData) // Save the photo URLs in the document);

            const myPostsCollectionRef = collection(db, "users", user.uid, "myPosts");

            // Add the newly created post's ID to the "myPosts" subcollection
            await addDoc(myPostsCollectionRef, { postId: newPostRef.id });
    
            // Clear the form data after submitting
            setFormData({
                listingName: "",
                description: "",
                lookingFor: "",
                preference: "",
                rentalType: "",
                occupants: "",
                price: "",
                deposit: "",
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


            setSelectedInclude({
                includeutilities: false,
                noutilities: false,
            })
    
            setPhotos([]);
    
            onClose(); // Close the form after successfully creating the post
        } catch (err) {
            console.error(err);
            // Handle error if needed
        }
    };
    












    

    return (
        <form onSubmit={handleFormSubmit}>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                height="600px"
                width = "500px"
                bgcolor="rgba(255, 159, 64, 1)"
                borderRadius= "15px"
                border = "solid 3px black"
            >
                <h1>Add a New Listing</h1>
    
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
                    marginTop="20px"
                    width="450px"
                    height= "430px"
                    padding="20px"
                    borderRadius="15px"
                    bgcolor="white"
                    boxShadow="0 2px 5px rgba(0, 0, 0, 0.3)"
                    boxSizing="border-box"
                >
                    {/* Content of your first step */}
                    {activeStep === 0 && (
                        <div className = {styles.step1container} style={{ height: '400px', overflow: 'auto' }}>
                        <input
            type="text"
            placeholder="Listing Name"
            name="listingName"
            value={formData.listingName}
            onChange={handleFormInputChange}
        />
        <textarea 
        className = {styles.textarea1}
            placeholder="Description"
            name="description"
            value={formData.description}
            onChange={handleFormInputChange}
        ></textarea>
          <select
            name="lookingFor"
            value={formData.lookingFor}
            onChange={handleFormInputChange}
        >
            <option value=""> Looking for..</option>
            {lookingFor.map((type, index) => (
                <option key={index} value={type}>
                    {type}
                </option>
            ))}
        </select>
        <input
            type="text"
            placeholder="Preferences"
            name="preference"
            value={formData.preference}
            onChange={handleFormInputChange}
        />

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
        <div>
            Available On:
            <DatePicker
                selected={formData.availableOn}
                onChange={(date) =>
                    setFormData({
                        ...formData,
                        availableOn: date,
                    })
                }
                dateFormat="MM/dd/yyyy" // You can customize the date format
                placeholderText="Select a date"
            />
        </div>
         <input
            type="text"
            placeholder="Price per month"
            name="price"
            value={formData.price}
            onChange={handleFormInputChange}
        />
        <input
            type="text"
            placeholder="Deposit"
            name="deposit"
            value={formData.deposit}
            onChange={handleFormInputChange}
        />

<label>
                        <input
                            type="checkbox"
                            name="includeutilities"
                            checked={selectedInclude.includeutilities}
                            onChange={handleIncludeChange}
                        />
                        Utilities included
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="noutilities"
                            checked={selectedInclude.noutilities}
                            onChange={handleIncludeChange}
                        />
                        Utilities NOT included
                    </label>
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
       {photos.map((photoData, index) => (
    <img
        key={index}
        src={photoData.url}
        alt={`Uploaded ${index}`}
        style={{ width: '100px', height: 'auto', marginRight: '10px' }}
    />
))}
         </div>
                        </div>






                    )}
    
                    {/* Content of your second step */}
                   
                    {activeStep === 1 && (
                        <div className = {styles.step2container}>
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
                        </div>

                    )}
    
                    {/* Content of your third step */}
                    {activeStep === 2 && (
                        <div>
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
                        </div>
                    )}
    
                    {/* Buttons for navigating between steps */}
                    {activeStep < 2 && (
                        <button type="button"
                        style = {{  
                            position: "relative",
                            marginTop: "10px",
                        left: "340px",
                        backgroundColor: "rgba(255, 100, 100, 0.7)",
                        color: "white",
                        padding: "10px 20px",
                        borderRadius: "10px",
                        border: "solid 3px black",
                        cursor: "pointer",
                        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                         }}
                        onClick={handleNext}>Next</button>
                    )}
    
                    {activeStep === 2 && (
                        <button type="submit">Add Listing</button>
                    )}
                </Box>
            </Box>
        </form>
    );
};
                    
export default AddNest;