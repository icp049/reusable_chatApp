import React from "react";
import Landingpagenavbar from "../navbars/Landingpagenavbar";

const LandingPage = () => {
    return (
        <div style={{ position: "relative", minHeight: "100vh" }}>
            <Landingpagenavbar/>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "80px" }}>
                <input
                    type="text"
                    placeholder="Search..."
                    style={{
                        padding: "10px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                        width: "300px",
                    }}
                />
            </div>
            <h1 style={{ marginBottom: "20px", textAlign: "center" }}>Place Nest HomePage here</h1>
            
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
            >
                Add Listing
            </div>
        </div>
    );
};

export default LandingPage;
