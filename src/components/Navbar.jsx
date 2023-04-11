import React,{ useContext, useState, useEffect } from 'react'
import {Link,useNavigate, useLocation} from 'react-router-dom';
import UserContext from '../context/userContext';
import { getAuth, signOut } from "firebase/auth";
import { CLEAR_USER } from '../context/UserTypes';
import {FaBars, FaRegTimesCircle,FaPowerOff} from 'react-icons/fa'

const Navbar = () => {
  const page = 'text-[14px] py-[10px] px-[10px] text-light w-full flex justify-center hover:bg-[#ffffff33] shadow-md';
  const pageActive = 'text-[14px] py-[10px] px-[10px] text-light w-full flex justify-center hover:bg-[#ffffff33] bg-[#529fca26] shadow-md';

  const {state : {user}, dispatch } = useContext(UserContext);
  const currentPage = useLocation();
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [caretOpen, setCaretOpen] = useState(false);
  const [curPage, setCurPage] = useState('/');

  const navigateTo = useNavigate();

  const signUserOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
        dispatch({
          type : CLEAR_USER
        })
        localStorage.removeItem('user');
        navigateTo('/');
    }).catch((error) => {
      console.log(error.message);
    });
  } 

  const onClickCaret = (e) => {
    setCaretOpen( prevState => !prevState);
  }
 
  const onCloseCaret = (e) => {
    setCaretOpen( prevState => !prevState);
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

      setCurPage(currentPage.pathname);
  },[user, currentPage])
  return (
   <>
   <div className="min-h-[11vh] navbar bg-section text-prim-900 font-prim px-[10px] md:px-[13px] lg:px-[20px] flex">
      <div className="navbar-start">
      <Link to='/' className="font-style text-[20px] md:text-[24px]  lg:text-[27px] text-sec-300">Mind<span className="font-sec uppercase font-bold text-light">Pulse</span></Link>
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
          <label className="w-[50px] h-[50px] btn btn-ghost btn-circle absolute -top-[30px] right-0" onClick={onClickCaret}>
            { !caretOpen ? <FaBars size={25} color='#e6d435'/> : <FaRegTimesCircle size={35} color='#e6d435'/>}
          </label>
          <ul className={caretOpen ? "mt-3 shadow bg-ter-500 rounded w-[210px] absolute top-[26px] right-0 z-[150]" : 'hidden'} onClick={onCloseCaret}>
            
            {/*  */}
          <li className='mb-[10px]'>
            <Link className={curPage === '/' ? pageActive : page } to='/'>Home</Link>
          </li>

          <li className='mb-[10px]'>
            <Link className={curPage === '/quiz' ? pageActive : page } to='/quiz'>Quiz</Link>
          </li>
          <li className='mb-[10px]'>
            <Link className={curPage === '/score-board' ? pageActive : page } to='/score-board'>ScoreBoard</Link>
          </li>

          {
            isAdmin && (
              <li className='mb-[10px]'>
                 <Link className={curPage === '/feedbacks' ? pageActive : page } to='/feedbacks'>Feedbacks</Link>
              </li>
            ) 
          }
          
          {
            !loggedIn ? (
              <li className='px-[10px] mb-[10px] w-full'>

                <button type='button' className='w-full px-[20px] py-[10px] capitalize font-num font-bold text-[15px] rounded-lg border-[2px] border-solid border-sec-500 hover:bg-sec-500 hover:duration-200 hover:ease-in-out flex items-center text-light justify-center hover:text-section'  onClick={() => navigateTo('/login')}>Sign In</button>
              </li>
            )  : 
            (
              <button type='button' className='w-[95%] px-[20px] py-[10px] capitalize font-num font-bold text-[15px] rounded-lg border-[2px] border-solid border-sec-500 hover:bg-sec-500 hover:duration-200 hover:ease-in-out flex items-center text-light justify-center hover:text-section mb-[9px] mx-auto' onClick={signUserOut}> <FaPowerOff className='mr-[7px] mr-[7px] hover:stroke-[#ffffff]' size={20} color='#ffffff' />Sign Out</button>
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


