import React, { useState,useEffect,useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {BarLoader} from 'react-spinners'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc} from 'firebase/firestore';
import { db } from '../firebase/firebase';
import {toast} from 'react-toastify'
import UserContext from '../context/userContext';
import PageTitles from '../components/PageTitles';
import ForgotPassword from '../components/ForgotPassword';
import {SET_USER} from '../context/UserTypes';



const Login = () => {
    const navigateTo = useNavigate();
    const {dispatch} = useContext(UserContext);

    const [title] = useState('Register Account')
    const [btnState, setBtnState]=useState(null);
    const [forgotPwd, setForgotPwd] = useState(false);
    const [loading, setLoading] = useState(false);
    
    // email
    const [email, setEmail] = useState(null);
    const [emailError, setEmailError] = useState(null);

    // password
    const [password , setPassword] = useState(null);
    const [passwordError , setPasswordError] = useState(null);
 
  
    const resetPassword = () => {
        setForgotPwd(true);
    }
    
    const passwordBack = (data) => {
        if(data ==='back'){
            setForgotPwd(false);
        }
    }
    
    const onSubmitUserDetails = async (e) => {
        e.preventDefault();

        try{
            setLoading(true);
            const auth = getAuth();
            const user = await signInWithEmailAndPassword(
                auth, email, password
            )

            if(user){
                const docRef = doc(db, "Users", user.user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                const userData = {...docSnap.data(), id: docSnap.id}
               if(userData){
                        dispatch( {
                        type : SET_USER,
                        payload : userData
                    })
                    localStorage.setItem('user', JSON.stringify(userData));
                    navigateTo('/quiz');
               }
                } else {
                console.log("No such document!");
                }
            }

            setLoading(false);

        }catch(e){
            setLoading(false);
            setEmail(null);
            setPassword(null);
            toast.error('Invalid Username or Password');
        }

    }

    useEffect( () => {
        
       if(email !== null){
            if(email === ''){
                setEmailError('Please provide a valid Email');
                setBtnState(null)
            }else{
                setEmailError(null);
                setBtnState('good')
           }
       }
        
      if(password !== null){
        if(password === ''){
            setBtnState(null);
            setPasswordError('Password is Required');
        }else{
           setPasswordError(null);
            setBtnState('good')
       }
      }

    },[password,email])

    if(loading){
        return <>
         <div className='fixed w-full h-[100vh] bg-semiHover flex flex-col justify-center items-center top-0 left-0 right-0 bottom-0 pointer-events-none z-30'>
            <div>
                <BarLoader color='#e6d435' speedMultiplier={2}/>
            </div>
            <p className="italic mt-[10px]">Please wait ...</p>
        </div>
        </>
    }

  return (
    <>
    <PageTitles title={title}/>
    <main className="min-h-[74vh] md:min-h-[73vh] lg:min-h-[73vh] mx-8 flex flex-col justify-center items-center">
        <div className="quizBoard w-11/12 md:w-9/12 lg:w-6/12 md:p-6 lg:p-10 mx-auto mt-[40px] flex flex-col md:flex-row lg:flex-row bg-section rounded-md">
            <div className={"w-full text-[14px] md:text-[17px] lg:text-[19px]" }>
                <div className="m-2 p-4 bg-prim-100">
                {forgotPwd && <ForgotPassword passwordBack={passwordBack}/>}

                {!forgotPwd && (
                    <>
                    <form className='w-full flex flex-col my-[30px] items-center' onSubmit={onSubmitUserDetails}>
                       
                        <div className="w-full  mb-[20px] relative">
                            <input type="email" placeholder="example@gmail.com" id='email' className="input mx-5 w-[95%] bg-semiHover font-style font-thin text-[14px] md:text-[15px] lg:text-[16px] py-[20px] text-light" autoComplete='off' autoCapitalize='true' value={email == null ? '' : email} onChange={ (e) => setEmail(e.target.value)}/>
                            <span className='absolute text-[11px] -bottom-[19px] left-[14px] text-sec-100'>{emailError === null ? '' : emailError}</span>
                        </div>
                        <div className="w-full  mb-[20px] relative">
                            <input type="password" placeholder="Enter password" id='password' className="input mx-5 w-[95%] bg-semiHover font-style font-thin text-[14px] md:text-[15px] lg:text-[16px] py-[20px] text-light" autoComplete='off' autoCapitalize='true' value={password == null ? '' : password} onChange={ (e) => setPassword(e.target.value)}/>
                            <span className='absolute text-[11px] -bottom-[19px] left-[14px] text-sec-100'>{passwordError === null ? '' : passwordError}</span>
                        </div>
                       
                        <div className=" mt-[20px]">
                           
                        <button type='submit' disabled={btnState == null ? true : false }  className={ btnState == null ? 'btnStyle2 bg-semiHover px-[25px] py-[8px] capitalize font-num font-bold text-[17px] rounded border-[2px] border-transparent border-sec-500 disabled' : 'btnStyle2 px-[25px] py-[8px] capitalize font-num font-bold text-[17px] rounded-lg border-[2px] border-solid border-sec-500 hover:bg-sec-500 hover:duration-200 hover:ease-in-out hover:text-section' } >Sign In</button>
                        </div>
                    </form>

                    <div className="options mb-[10px] flex flex-col md-flex-row lg:flex-row justify-between items-center mx-[10px]">
                        <p className='text-[12px] md:text-[13px] lg:text-[14px] italic mb-[20px] md:mb-[10px] lg:mb-0 flex items-center'><span className='hidden md:block lg:block text-sec-300'>Don't have an account?</span><Link to='/create-account' className='bg-semiHover px-[5px] py-[4px] rounded-lg ml-[7px] normal-case not-italic hover:text-light  hover:bg-ter-600'>Create Account</Link></p>
                       <button className="text-[12px] md:text-[13px] lg:text-[14px] bg-semiHover px-[5px] py-[4px] rounded-lg ml-[7px] normal-case not-italic hover:text-light hover:bg-sec-600" onClick={resetPassword}>Forgot Password ?</button>
                    </div>
                    </>
                )}
                </div>
            </div>
        </div>
    </main>
    </>
  )
}

export default Login