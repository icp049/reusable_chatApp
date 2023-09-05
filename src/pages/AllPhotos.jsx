import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Landingpagenavbar from "../navbars/Landingpagenavbar";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const AllPhotos = () => {
  const { id } = useParams();
  const [allPhotos, setAllPhotos] = useState([]);

  useEffect(() => {
    const fetchAllPhotos = async () => {
      try {
        const nestDoc = await getDoc(doc(db, "Posts", id));
        if (nestDoc.exists()) {
          const nestData = nestDoc.data();
          if (nestData.photos) {
            setAllPhotos(nestData.photos);
          }
        }
      } catch (error) {
        console.error("Error fetching all nest photos:", error);
      }
    };

    fetchAllPhotos();
  }, [id]);

  return (
    <div className="main-container">
      <Landingpagenavbar />

      <div className="photos-container">
        {allPhotos.map((photo, index) => (
          <div key={index} className="photo-item">
            <img src={photo} alt={`Nest Photo ${index}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllPhotos;
