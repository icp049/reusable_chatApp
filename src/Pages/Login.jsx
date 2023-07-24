import React from "react";


const Login = () => {
    return (

        <div className = "formContainer"> 
        <div className = "formWrapper"> 

        <span className="title" > Login</span>
        <form>
            <input type = "text" placeholder = "email" />
            <input type = "text" placeholder = "password" />
            
            <button> Login</button>
        </form>

        <p>Don't have an account? Register</p>
        
        
        
        </div>
        </div>

    )
}

export default Login;