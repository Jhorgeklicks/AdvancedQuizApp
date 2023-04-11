import React, { useContext,useState, useEffect } from 'react'
import UserContext from '../context/userContext'
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
    const navigateTo = useNavigate();
    const {state : {user}} = useContext(UserContext);
    const [kick, setKick] = useState(false);

    
    useEffect( ()=>{
        if(user.role){
            user.role === "admin" ? setKick(false) : setKick(true)
        }else{
            setKick(true);
        }
        
        if(user === null || user.length < 1){
        setKick(true)
    }
     
     if(user.length > 0 && user.role !== "admin"){
         setKick(true)
        }

    },[user])
    
   
        
    if(kick){
        return navigateTo('/quiz');
    }

  return children
}

export default ProtectedRoute