import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Landingpagenavbar from "../navbars/Landingpagenavbar";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import "./ViewNest.css"

const ViewNest = () => {
    const { id } = useParams();
    const [selectedNest, setSelectedNest] = useState(null);

    useEffect(() => {
        const fetchNestDetails = async () => {
            try {
                const nestDoc = await getDoc(doc(db, "Posts", id));
                if (nestDoc.exists()) {
                    setSelectedNest({ id, ...nestDoc.data() });
                } else {
                    setSelectedNest(null);
                }
            } catch (error) {
                console.error("Error fetching nest details:", error);
            }
        };

        fetchNestDetails();
    }, [id]);

    return (
        <div>
            <Landingpagenavbar />
            {selectedNest ? (
                <div className="nest-container">
                   <div className="nest-images">
                        {/* Display nest images */}
                        {selectedNest.photos && selectedNest.photos.map((photo, index) => (
                            <img key={index} src={photo} alt={`Nest ${index}`} />
                        ))}
                    </div>
                    <div className="nest-details">
                        <h1>{selectedNest.listingName}</h1>
                        <p className="nest-price">${selectedNest.price} / Month</p>
                        <p className="nest-description">{selectedNest.description}</p>
                        <p className = "nest-poster" >{selectedNest.postedBy}</p>
                        <button>Message @{selectedNest.postedBy} </button>
                        {/* Other nest details */}
                    </div>
                </div>
            ) : (
                <div>No nest found with ID: {id}</div>
            )}
        </div>
    ); 
};

export default ViewNest;
