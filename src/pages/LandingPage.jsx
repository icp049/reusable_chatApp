import React, { useState, useEffect } from "react";
import Landingpagenavbar from "../navbars/Landingpagenavbar";
import AddNest from "./AddNest";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import MainCarousel from "./MainCarousel";


import entireHomeIcon from "../icons/entirehome.png";
import privateRoomIcon from "../icons/privateroom.png";
import sharedRoomIcon from "../icons/sharedroom.png";
import bedSpaceIcon from "../icons/bedspace.png";
import allIcon from "../icons/all.png";

const rentalTypes = ["all", "Entire Home", "Private Room", "Shared Room", "BedSpace"];

const blurBackgroundStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the background color and opacity
    backdropFilter: "blur(5px)", // Adjust the blur amount
    zIndex: 999, // Ensure it appears above other elements
  };
  

const rentalTypeIcons = {
    "all": allIcon , // You can set a default icon or leave it as null
    "Entire Home": entireHomeIcon,
    "Private Room": privateRoomIcon,
    "Shared Room": sharedRoomIcon,
    "BedSpace": bedSpaceIcon,
  };
  



const LandingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gridData, setGridData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRentalType, setSelectedRentalType] = useState("all");

  // Load data from local storage when the component mounts
  useEffect(() => {
    const cachedData = localStorage.getItem("gridData");
    if (cachedData) {
      setGridData(JSON.parse(cachedData));
    }
  }, []);

  // Fetch data from Firestore and cache it
  useEffect(() => {
    const fetchData = async () => {
      try {
        const postsCollection = collection(db, "Posts");
        const snapshot = await getDocs(postsCollection);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Cache the data in local storage
        localStorage.setItem("gridData", JSON.stringify(data));

        setGridData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleTabChange = (rentalType) => {
    setSelectedRentalType(rentalType);
  };

  const filteredGridData = gridData.filter((post) => {
    const cityLowerCase = post.city.toLowerCase();
    const searchTermLowerCase = searchTerm.toLowerCase();
    return cityLowerCase.includes(searchTermLowerCase);
  });
  



 return (
        <div style={{ position: "relative", minHeight: "100vh" }}>
            {isModalOpen && (
        <div style={blurBackgroundStyle}></div>
      )}
            <Landingpagenavbar />
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "100px",
                    
                }}
            >
                <input
                    type="text"
                    placeholder="Where do you want to go?"
                    style={{
                        padding: "10px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                        width: "300px",
                    }}
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "35px" }}>
            {rentalTypes.map((rentalType) => (
  <div
    key={rentalType}
    style={{
      cursor: "pointer",
      margin: "0 20px",
      fontWeight: selectedRentalType === rentalType ? "bold" : "normal",
      color: selectedRentalType === rentalType ? "skyblue" : "black",
    }}
    onClick={() => handleTabChange(rentalType)}
  >
    {rentalTypeIcons[rentalType] && (
      <img
        src={rentalTypeIcons[rentalType]}
        alt={`${rentalType} Icon`}
        style={{ width: "20px", height: "20px", marginRight: "5px" }}
      />
    )}
    {rentalType.toUpperCase()}
  </div>
))}

            </div>
            <div></div>
            <div>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                        gap: "20px",
                        padding: "40px 20px", // Adjust padding
                        justifyContent: "center", // Center the items
                        alignItems: "center"
                    }}
                   
                >
                    {filteredGridData
                    .filter((post) => selectedRentalType === "all" || post.rentalType === selectedRentalType)
                    .map((post) => (
                    
   <Link
   key={post.id}
   to={`/viewnest/${post.id}`}
   style={{
       
          
       textDecoration: "none",
       color: "black",
       display: "flex",
       flexDirection: "column",
       alignItems: "center",
       transition: "background-color 0.3s ease", // Add transition for smooth effect
        backgroundColor: "white", 
        width: "300px", // Add a fixed width to prevent resizing
   
        
   }}
>
<div style={{ width: "400px", height: "300px", maxWidth: "100%", maxHeight: "100%" }}>
       <MainCarousel photos={post.photos} />
   </div>
<h2 style={{ margin: "0", padding: "10px 0" }}>
        {post.rentalType} in {post.city}
    </h2>
    <h3 style={{ margin: "0", padding: "5px 0" }}>{post.lookingFor}</h3>
    <p style={{ margin: "0", padding: "5px 0" }}>{post.price} / Month</p>
    
</Link>

))}
                </div>
            </div>
            <div
                style={{
                    position: "fixed",
                    bottom: "20px",
                    right: "20px",
                    backgroundColor: "rgba(255, 159, 64, 0.7)",
                    color: "white",
                    padding: "10px 20px",
                    borderRadius: "10px",
                    border: "solid 3px black",
                    cursor: "pointer",
                    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                    zIndex: "3", 
                }}
                onClick={openModal}
            >
                Add Listing
            </div>
            {isModalOpen && (
                <div
                    style={{
                        position: "fixed",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        zIndex: "1000",
                    }}
                >
                    <AddNest onClose={closeModal} />
                </div>
            )}
        </div>
    );
}; 

export default LandingPage;
