import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Landingpagenavbar from "../navbars/Landingpagenavbar";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import "./ViewNest.css";
import { Link } from "react-router-dom";
import Input from "../components/Input";

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
    <div className="main-container">
      <Landingpagenavbar />

      {selectedNest ? (
        <div className="left-column">
          <div className="nest-container">
            <div className="nest-images photo-collage">
              {selectedNest.photos &&
                selectedNest.photos.map((photo, index) => (
                  <div key={index} className="photo-item">
                    <img src={photo} alt={`Nest ${index}`} />
                  </div>
                ))}
              <Link to={`/allphotos/${id}`}>
                <button> Show all photos </button>
              </Link>
            </div>
            <div className="nest-details">
              <h1>{selectedNest.listingName}</h1>
              <h3>Proximity: {selectedNest.streetName} Area</h3>
              <h2>
                {selectedNest.rentalType} by {selectedNest.firstName}
              </h2>
              <div>
                <img src={selectedNest.posterImage} alt="Poster" />
              </div>
              <p className="nest-price">${selectedNest.price} / Month</p>
              <p className="nest-description">{selectedNest.description}</p>
              <h2>Amenities</h2>
              <ul>
                {Object.entries(selectedNest.amenities).map(([key, value]) =>
                  value ? <li key={key}>{key}</li> : null
                )}
              </ul>
              <h2>Rules</h2>
              <ul>
                {Object.entries(selectedNest.rules).map(([key, value]) =>
                  value ? <li key={key}>{key}</li> : null
                )}
              </ul>
              <div
                style={{
                  position: "relative",
                  width: "250px",
                  backgroundColor: "rgba(255, 159, 64, 0.7)",
                  color: "white",
                  padding: "10px 20px",
                  borderRadius: "10px",
                  border: "solid 3px black",
                  cursor: "pointer",
                  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                  zIndex: "3",
                }}
              >
                Message @{selectedNest.postedBy}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>No nest found with ID: {id}</div>
      )}

      <div className="right-column">
        <div className="right-container">Container 1</div>
        <div className="right-container">Container 2</div>
        {selectedNest && <Input receiverId={selectedNest.postedBy} />}
      </div>
    </div>
  );
};

export default ViewNest;
