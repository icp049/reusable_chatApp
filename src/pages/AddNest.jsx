import React from "react";

const AddNest = ({ onClose }) => {
    return (
        <div style={{ width: "400px", padding: "20px", borderRadius: "5px", backgroundColor: "orange", boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)", margin: "0 auto" }}>
            <h2>Add a New Listing</h2>
            <p>Here is the content of your AddNest modal.</p>
            <button onClick={onClose} style={{ marginTop: "20px" }}>
                Close
            </button>
        </div>
    );
};

export default AddNest;
