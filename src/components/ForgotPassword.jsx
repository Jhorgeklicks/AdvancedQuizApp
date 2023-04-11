import React, { useState } from 'react'
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import {toast} from 'react-toastify'
import { BarLoader } from 'react-spinners';

const ForgotPassword = ({passwordBack}) => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const onSubmitEmail = (e) => {
        e.preventDefault();
        if(email == ''){
            toast.error('Please Provide an Email Address');
        }else{
            setLoading(true)
        const auth = getAuth();

        sendPasswordResetEmail(auth, email)
        .then(() => {
            setLoading(false)
            setMessage(`A Reset Link has been sent to your mail`);
            setTimeout( () =>{
                setMessage(null)
            },[5000])
        })
        .catch((error) => {
            setLoading(false);
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
            toast.error('Unable to send a reset Link!')
        });
        }
    }

    const goBack = () => {
       return passwordBack('back');
    }

    if(loading){
        return <>
         <div className='fixed w-full h-[100vh] bg-semiHover flex flex-col justify-center items-center top-0 left-0 right-0 bottom-0 pointer-events-none z-30'>
            <div>
                <BarLoader color='#e6d435' speedMultiplier={2}/>
            </div>
            <p className="italic mt-[10px]">Sending a Password Reset Link, Please wait</p>
        </div>
        </>
    }
  return (
    <>
    <div className='w-full flex flex-col justify-center items-center px-[6px]'>
        <h3 className='capitalize font-bold text-sec-300'>Forgotten Your Password ? </h3>
        <p className="text-center">Type Your email for a password reset link</p>
        {
            message !== null && <span className='block mt-[5px] text-sec-300 font-style'>{message}</span>
        }
    </div>
    <form className='w-full flex flex-col items-center justify-center' onSubmit={onSubmitEmail}>
        <input type="email" placeholder="example@gmail.com" id='email' className="block mx-5 w-[95%] bg-semiHover font-style font-thin text-[14px] md:text-[15px] lg:text-[16px] mt-[20px] py-[15px] px-[15px] text-light focus:outline-none active:outline-none rounded-full" autoComplete='false' value={email} onChange={ (e) => setEmail(e.target.value) }/>

        <div className="mt-[20px] flex flex-col md:flex-row lg:flex-row justify-center items-center">
            <button className='bg-semiHover mr-[10px] px-[25px] py-[8px] text-[15px] md:text-[16px] border-[2px] border-transparent border-solid hover:bg-section hover:border-[2px] hover:border-sec-500 hover:border-solid hover:duration-200 hover:ease-in-out mb-[15px] md:mb-0 lg:mb-0' onClick={goBack} ><span className='text-sec-500'>&laquo;&nbsp;</span>Go Back</button>

            <button type='submit' className='btnStyle2 px-[25px] py-[8px] capitalize font-num font-bold text-[15px] md:text-[16px] lg:text-[17px] rounded-lg border-[2px] border-solid border-sec-500 hover:bg-sec-500 hover:duration-200 hover:ease-in-out hover:text-section mb-[20px]' >Reset Password</button>
        </div>

    </form>
    </>
  )
}

export default ForgotPassword