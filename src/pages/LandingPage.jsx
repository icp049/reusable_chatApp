import React, { useState, useEffect } from "react";
import Landingpagenavbar from "../navbars/Landingpagenavbar";
import AddNest from "./AddNest";



import { doc, getDocs, collection } from "firebase/firestore";
import { db, auth } from "../firebase";

const LandingPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [gridData, setGridData] = useState([]);

    useEffect(() => {
        // Fetch data from Firestore when component mounts
        const fetchData = async () => {
            try {
                const postsCollection = collection(db, "Posts"); // Replace "Posts" with your collection name
                const snapshot = await getDocs(postsCollection);
                const data = snapshot.docs.map(doc => ({
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
           

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
                {gridData.map((post) => (
                    <div key={post.id} style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px" }}>
                        {/* Display post content */}
                        <h2>{post.rentalType} in {post.city} </h2>
                        <h3>{post.lookingFor}</h3>
                        <p>{post.price} / Month</p>

                        
                        {/* ... Other post details ... */}



                        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                {post.photos && post.photos.map((photo, index) => (
                    <img key={index} src={photo} alt={`Posted ${index}`} style={{ maxWidth: "100px" }} />
                ))}
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
