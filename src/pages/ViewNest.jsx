import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Landingpagenavbar from "../navbars/Landingpagenavbar";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import "./ViewNest.css";

const ViewNest = () => {
    const { id } = useParams();
    const [selectedNest, setSelectedNest] = useState(null); // Initialize to null

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
                    <div className="nest-images photo-collage">
                        {selectedNest.photos && selectedNest.photos.map((photo, index) => (
                            <div key={index} className="photo-item">
                                <img src={photo} alt={`Nest ${index}`} />
                            </div>
                        ))}
                    </div>
                    <div className="nest-details">
                        <h1>{selectedNest.listingName}</h1>
                        <h3>Proximity: {selectedNest.streetName} Area</h3>
                        <h2>{selectedNest.rentalType} by {selectedNest.firstName}</h2>
                        <p className="nest-price">${selectedNest.price} / Month</p>
                        <p className="nest-description">{selectedNest.description}</p>

                        <h2>Amenities</h2>
                        <ul>
                            {Object.entries(selectedNest.amenities).map(([key, value]) => (
                                value && <li key={key}>{key}</li>
                            ))}
                        </ul>

                        <h2>Rules</h2>
                        <ul>
                            {Object.entries(selectedNest.rules).map(([key, value]) => (
                                value && <li key={key}>{key}</li>
                            ))}
                        </ul>

                        <button>Message @{selectedNest.postedBy}</button>
                    </div>
                </div>
            ) : (
                <div>No nest found with ID: {id}</div>
            )}
        </div>
    );
};

export default ViewNest;
