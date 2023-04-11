import React,{ useContext, useState, useEffect } from 'react'
import {Link,useNavigate} from 'react-router-dom';
import UserContext from '../context/userContext';
import { getAuth, signOut } from "firebase/auth";
import { CLEAR_USER } from '../context/UserTypes';
import {FaBars, FaRegTimesCircle,FaRegMinusSquare} from 'react-icons/fa'

const Navbar = () => {
  const {state : {user}, dispatch } = useContext(UserContext);
  // console.log(user)
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [caretOpen, setCaretOpen] = useState(false);

  const navigateTo = useNavigate();

  const signUserOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
        localStorage.removeItem("user");
        dispatch({
          type : CLEAR_USER
        })
        navigateTo('/');
    }).catch((error) => {
      console.log(error.message);
    });
  } 

  useEffect( () => {
      if(user !== null && user.id){
        setLoggedIn(true);
        if(user.role === "admin"){
          setIsAdmin(true)
        }else{
          setIsAdmin(false);
        }
      }else{
        setLoggedIn(false);
        setIsAdmin(false);
      }

  },[user])
  return (
   <>
   <div className="min-h-[10vh] navbar bg-section text-prim-900 font-prim px-[10px] md:px-[13px] lg:px-[20px] flex">
      <div className="navbar-start">
      <Link to='/' className="font-style text-[20px] text-sec-300">Mind<span className="font-sec uppercase font-bold text-light">Pulse</span></Link>
      </div>

      <div className="navbar-end">
        {/* start */}
        <span className='hidden md:block lg:block'>
        <ul className="menu menu-horizontal px-1 text-light">
          <li>
            <Link to='/quiz'>Quiz</Link>
          </li>
          <li>
            <Link to='/score-board'>ScoreBoard</Link>
          </li>

          {
            isAdmin && (
              <li>
                 <Link to='/feedbacks'>Feedbacks</Link>
              </li>
            ) 
          }
          
          {
            !loggedIn ? (
              <li>
                <button type='button' className='btnStyle2 px-[20px] py-[3px] capitalize font-num font-bold text-[17px] rounded-lg border-[2px] border-solid border-sec-500 hover:bg-sec-500 hover:duration-200 hover:ease-in-out hover:text-section'  onClick={() => navigateTo('/login')}>Sign In</button>
              </li>
            )  : 
            (
              <button type='button' className='btnStyle2 px-[20px] py-[3px] capitalize font-num font-bold text-[17px] rounded-lg border-[2px] border-solid border-sec-500 hover:bg-sec-500 hover:duration-200 hover:ease-in-out hover:text-section' onClick={signUserOut}>Sign Out</button>
            )
          }
        </ul>
        </span>
        {/* end here */}
        <span className='block md:hidden lg:hidden'>
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <FaBars size={20} color='#e6d435'/>
          </label>
          <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 py-[14px] px-[7px] shadow bg-ter-500 rounded w-[210px] right-[5px]">
            
            {/*  */}
          <li className='mb-[10px]'>
            <Link className='text-[14px] py-[10px] text-light' to='/quiz'>Quiz</Link>
          </li>
          <li className='mb-[10px]'>
            <Link className='text-[14px] py-[10px] text-light' to='/score-board'>ScoreBoard</Link>
          </li>

          {
            isAdmin && (
              <li className='mb-[10px]'>
                 <Link className='text-[14px] py-[10px] text-light' to='/feedbacks'>Feedbacks</Link>
              </li>
            ) 
          }
          
          {
            !loggedIn ? (
              <li>
                <button type='button' className='btnStyle2 px-[20px] py-[10px] capitalize font-num font-bold text-[15px] rounded-lg border-[2px] border-solid border-sec-500 hover:bg-sec-500 hover:duration-200 hover:ease-in-out flex items-center text-light justify-center hover:text-section'  onClick={() => navigateTo('/login')}>Sign In</button>
              </li>
            )  : 
            (
              <button type='button' className='btnStyle2 px-[20px] py-[10px] capitalize font-num font-bold text-[17px] rounded-lg border-[2px] border-solid border-sec-500 hover:bg-sec-500 hover:duration-200 hover:ease-in-out flex items-center text-light justify-center hover:text-section' onClick={signUserOut}>Sign Out</button>
            )
          }
            {/*  */}
          </ul>
        </div>
        </span>

      </div>

    </div>
   </>
  )
}

export default Navbar