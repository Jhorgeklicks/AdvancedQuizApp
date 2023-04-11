import React,{ useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/userContext';
import { ALERT_USER } from '../context/UserTypes';

const AlertModal = () => {
    const navigateTo =  useNavigate();
    const [clicked, setClicked] = useState(false);

    const {dispatch} = useContext(UserContext);

    const closeClicked = () => {
        dispatch( {
            type : ALERT_USER
        })
    }

  return (
  
    <div className='fixModal'>
       <div className='w-11/12 md:w-9/12 lg:w-6/12 flex flex-col justify-center items-center py-[30px] px-[10px] bg-[#1a3542] rounded-[4px]'>
            <span className='text-center text-[14px] md:text-[15px] lg:text-[lg] '>Please Sign In to keep Your Scores Saved</span>
            <span className='text-center text-[14px] md:text-[15px] lg:text-[lg] m-[10px]'>You can play without signing up but Your Data won't be saved!</span>
            <span className='text-center text-[14px] md:text-[15px] lg:text-[lg] font-style'>Enjoy and GoodLuck</span>
            <div className="flex justify-center items-center mt-[20px]">
                <button type='button' onClick={closeClicked} className='styleBtn px-[25px] py-[8px] capitalize font-num font-bold text-[17px] rounded mr-[10px]'>close</button>
                <button type='button'  onClick={ () => navigateTo('/login')} className='styleBtn px-[25px] py-[8px] capitalize font-num font-bold text-[17px] rounded'>Login</button>
            </div>
        </div>
    </div>
  )
}

export default AlertModal