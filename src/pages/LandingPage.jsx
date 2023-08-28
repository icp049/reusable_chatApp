import React from "react";
import Landingpagenavbar from "../navbars/Landingpagenavbar";

const LandingPage = () => {
    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "center", height: "100vh" }}>
            <Landingpagenavbar/>
            <div style={{ marginTop: "60px", position: "relative" }}>
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
            <h1 style={{ marginBottom: "20px" }}>Place Nest HomePage here</h1>
        </div>
    );
};

export default LandingPage;
