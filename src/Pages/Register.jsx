import React from "react";

const Register = () => {
    return (

        <div className = "form-container"> 
        <div className = "form-wrapper"> 

        <span className="title" > Register</span>
        <form>
            <input type = "text" placeholder = "username" />
            <input type = "text" placeholder = "email"/>
            <input type = "text" placeholder = "password" />
            <input type = "file" />
            <button> Sign Up</button>
        </form>
        
        
        
        </div>
        </div>

    )
}

export default Register;