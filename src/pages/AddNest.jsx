import React from "react";

const AddNest = ({ onClose }) => {
    return (
        <div style={{ padding: "20px" }}>
            <h2>Add a New Listing</h2>
            <p>Here is the content of your AddNest modal.</p>
            <button onClick={onClose} style={{ marginTop: "20px" }}>
                Close
            </button>
        </div>
    );
};

export default AddNest;
