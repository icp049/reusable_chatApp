import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Landingpagenavbar from "../navbars/Landingpagenavbar";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

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
            {/* Display queried content */}
            {selectedNest ? (
                <div>
                    <h2>{selectedNest.rentalType} in {selectedNest.city}</h2>
                    <h3>{selectedNest.lookingFor}</h3>
                    <p>{selectedNest.price} / Month</p>
                    {/* ... Other post details ... */}
                </div>
            ) : (
                <div>No nest found with ID: {id}</div>
            )}
        </div>
    );
};

export default ViewNest;
