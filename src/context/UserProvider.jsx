import React, { useEffect, useReducer } from 'react'
import UserContext from './userContext'
import UserReducer from './UserReducer'
import { SET_USER } from './UserTypes'

const UserProvider = ({children}) => {
    const [state, dispatch] = useReducer(UserReducer,{
        user : [],
        alertUser : true
    })

const fetchUserInfo  = () => {
   const storedValue = JSON.parse(localStorage.getItem('user'));
    storedValue !== null ? storedValue : [];

       dispatch( {
       type : SET_USER,
       payload : storedValue
   })

}


  useEffect(()=>{
    fetchUserInfo();
  },[])
  return (
    <UserContext.Provider value={{state, dispatch}}>{children}</UserContext.Provider>
  )
}

export default UserProvider