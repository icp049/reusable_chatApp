import React, { useState, useEffect } from "react";
import Landingpagenavbar from "../navbars/Landingpagenavbar";
import AddNest from "./AddNest";

import { Link } from "react-router-dom";

import { doc, getDocs, collection } from "firebase/firestore";
import { db, auth } from "../firebase";
import MainCarousel from "./MainCarousel";
const LandingPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [gridData, setGridData] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); // New state for search term


    const [selectedRentalType, setSelectedRentalType] = useState("all");





    useEffect(() => {
        // Fetch data from Firestore when component mounts
        const fetchData = async () => {
            try {
                const postsCollection = collection(db, "Posts");
                const snapshot = await getDocs(postsCollection);
                const data = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
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
    }


    const rentalTypes = ["all", "Private Room", "Shared Room", "BedSpace" ];

    const filteredGridData = gridData.filter((post) => {
        const cityLowerCase = post.city.toLowerCase();
        const searchTermLowerCase = searchTerm.toLowerCase();
        return cityLowerCase.includes(searchTermLowerCase);
    });


    return (
        <div style={{ position: "relative", minHeight: "100vh" }}>
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
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px" }}>
                {rentalTypes.map((rentalType) => (
                    <div
                        key={rentalType}
                        style={{
                            cursor: "pointer",
                            margin: "0 10px",
                            textDecoration: selectedRentalType === rentalType ? "underline" : "none",
                            fontWeight: selectedRentalType === rentalType ? "bold" : "normal",
                        }}
                        onClick={() => handleTabChange(rentalType)}
                    >
                        {rentalType.toUpperCase()}
                    </div>
                ))}
            </div>
            <div></div>
            <div>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                        gap: "20px",
                        padding: "40px 20px", // Adjust padding
                        justifyContent: "center", // Center the items
                    }}
                   
                >
                    {filteredGridData
                    .filter((post) => selectedRentalType === "all" || post.rentalType === selectedRentalType)
                    .map((post) => (
                    
   <Link
   key={post.id}
   to={`/viewnest/${post.id}`}
   style={{
       border: "2px solid grey",
          
       textDecoration: "none",
       color: "black",
       display: "flex",
       flexDirection: "column",
       alignItems: "center",
       transition: "background-color 0.3s ease", // Add transition for smooth effect
        backgroundColor: "white", 
   }}onMouseEnter={(e) => {
    e.currentTarget.style.backgroundColor = "rgba(0, 0, 255, 0.2)"; // Change to orange on hover
}}
onMouseLeave={(e) => {
    e.currentTarget.style.backgroundColor = "white"; // Back to white after hover out
        }}
>
<div style={{ width: "400px", height: "300px", maxWidth: "100%", maxHeight: "100%", borderRadius: "20px" }}>
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
                    backgroundColor: "blue",
                    color: "white",
                    padding: "10px 20px",
                    borderRadius: "5px",
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
