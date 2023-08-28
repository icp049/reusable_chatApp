import react from "react";
import Landingpagenavbar from "../navbars/Landingpagenavbar";
const LandingPage = () => {
    return(
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <Landingpagenavbar/>
            <h1 style={{ marginBottom: "20px" }}>Place Nest HomePage here</h1>
        </div>
    );
};

export default LandingPage;