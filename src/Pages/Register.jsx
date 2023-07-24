import React from "react";


const Register = () => {
    return (

        <div className = "formContainer"> 
        <div className = "formWrapper"> 

        <span className="title" > Register</span>
        <form>
            <input type = "text" placeholder = "username" />
            <input type = "text" placeholder = "email"/>
            <input type = "text" placeholder = "password" />
            <input style = {{display: "none"}} type = "file" id = "file"/>
            <label htmlFor = "file">
                <img src = "" alt = "" />
                <span> Add a display photo</span>
            </label>
            <button> Sign Up</button>
        </form>

        <p>If you have an account, Login</p>
        
        
        
        </div>
        </div>

    )
}

export default Register;