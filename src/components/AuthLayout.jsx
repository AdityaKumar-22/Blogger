import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Protected({children,authentication=true}){
    const navigate=useNavigate();
    const authStatus=useSelector((state)=>state.auth.status);
    const [loader, setLoader] = useState(true);
    
    useEffect(() => {
        //TODO: make it more easy to understand

        // if (authStatus ===true){
        //     navigate("/")
        // } else if (authStatus === false) {
        //     navigate("/login")
        // }
        
        //let authValue = authStatus === true ? true : false

            // if (authentication && !authStatus) {
            //     navigate("/login");
            // } else if (!authentication && authStatus) {
            //     navigate("/");
            // }

        if(authentication && authStatus !== authentication){
            navigate("/login") // needs to be logged in, but isn't
        } else if(!authentication && authStatus !== authentication){
            navigate("/") // already logged in, should not see login/signup
        }
        //If a condition matches and navigate() is called, AuthLayout redirects before rendering its children. So the children never appear in the DOM.
        setLoader(false)
    }, [authStatus, navigate, authentication])

  return loader ? <h1>Loading...</h1> : <>{children}</>

}