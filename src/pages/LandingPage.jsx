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
                    {filteredGridData.map((post) => (
   <Link
   key={post.id}
   to={`/viewnest/${post.id}`}
   style={{
       border: "1px solid #ccc",
       borderRadius: "5px",
       padding: "10px",
       textDecoration: "none",
       color: "black",
       display: "flex",
       flexDirection: "column",
       alignItems: "center",
   }}
>
   <h2>
       {post.rentalType} in {post.city}
   </h2>
   <h3>{post.lookingFor}</h3>
   <p>{post.price} / Month</p>
   <div style={{ width: "300px", height: "300px" }}>
       <MainCarousel photos={post.photos} />
   </div>
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
