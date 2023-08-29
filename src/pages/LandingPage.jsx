import React, { useState } from "react";
import Landingpagenavbar from "../navbars/Landingpagenavbar";
import AddNest from "./AddNest"; // Adjust the path accordingly

const LandingPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    // Sample data for grid boxes
    const gridData = [
        {
            id: 1,
            imageUrl: "url_to_image_1.jpg",
            posterDetails: "Details about poster 1",
        },
        {
            id: 2,
            imageUrl: "url_to_image_2.jpg",
            posterDetails: "Details about poster 2",
        },
        // ... Add more items
    ];

    return (
        <div style={{ position: "relative", minHeight: "100vh" }}>
            <Landingpagenavbar/>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "100px" }}>
                <input
                    type="text"
                    placeholder="Where do you want to go?"
                    style={{
                        padding: "10px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                        width: "300px",
                    }}
                />
            </div>
            <h1 style={{ marginBottom: "20px", textAlign: "center" }}>Place Nest HomePage here</h1>
            
   

<div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
    {gridData.map(item => (
        <div key={item.id} style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px", position: "relative" }}>
            <div style={{ height: "50px", backgroundColor: "green", width: "100%", position: "absolute", top: "0", left: "0" }}>
                {/* Details about the poster */}
                <p style={{ color: "white", textAlign: "center", margin: "0", padding: "5px" }}>{item.posterDetails}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                <div style={{ flex: "1", marginBottom: "10px" }}>
                    {/* Section for title and only photos */}
                    <h3 style={{ margin: "0", textAlign: "center" }}>Title Here</h3>
                    <img src={item.imageUrl} alt={`Poster ${item.id}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ backgroundColor: "blue",  color: "white", textAlign: "center" }}>
                <h3 style={{ margin: "0", textAlign: "center" }}>Title Here</h3>
                </div>
            </div>
        </div>
    ))}
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
