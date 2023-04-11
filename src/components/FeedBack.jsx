import React, {useState, useContext, useEffect} from 'react'
import UserContext from '../context/userContext';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import {FaCheck} from 'react-icons/fa'
import {toast} from 'react-toastify';
import { db } from '../firebase/firebase';
import { validateUserName ,capitalize } from '../utility/functions';

const FeedBack = () => {
  const {state :{user}} = useContext(UserContext);

  const [btnState, setBtnState]=useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sentMessage, setSentMessage] = useState(false);
  
  // user
  const [name , setName] = useState(null);
  const [nameError , setNameError] = useState(null);

  // subject
  const [subject, setSubject] = useState(null);
  const [subjectError, setSubjectError] = useState(null);

  // message
  const [message, setMessage] = useState(null);
  const [messageError, setMessageError] = useState(null);

   // reset input fields
   const resetStates = () => {
      console.log('tolled')
      setSubject(null);
      setMessage(null);
      setBtnState(null)
      setSentMessage(false)
  }


  const onSubmitFeedback = async (e) => {
      e.preventDefault();
      try{
        setLoading(true);
        const feedbackData = {name,subject,message ,status : 'unread',createdAt : serverTimestamp()}
        const docRef = await addDoc(collection(db, "Message"), feedbackData);
        if(docRef){
          setSentMessage(true)
        }
        setLoading(false);

        setTimeout( () => {
          resetStates()
        },3000)

    }catch(e){
      setLoading(false);
      setSentMessage(false)
      console.log(e.message);
      toast.error('Registration Failed, Try Again');
    }
  
  }

const checkStates = () => {
  if(name == null || name == '' || subject== null || subject == ''|| message== null || message == ''){
    setBtnState(null);
  }
}


  useEffect( () => {
      
      if(name !== null){
          const {status : nameStatus, details : nameDetails} = validateUserName(name);
          if(nameStatus == 'failed'){
              setNameError(nameDetails);
              setBtnState(null)
          }else{
              setNameError(null);
              setBtnState('good')
          }
      }
   
      if(subject !== null){
          if(subject === ''){
              setSubjectError('Subject is required');
              setBtnState(null)
          }else if(subject.length < 15){
            setSubjectError('Subject is is too short');
            setBtnState(null)
          }
          else{
              setSubjectError(null);
              setBtnState('good')
          }
      }
     
      if(message !== null){
          if(message === ''){
              setMessageError('Message is required');
              setBtnState(null)
          }else if(message.length < 25){
            setMessageError('Message is is too short');
            setBtnState(null)
          }
          else{
              setMessageError(null);
              setBtnState('good')
          }
      }
      

      if(user !== null && user.id){
        setLoggedIn(true);
        setName(user.name)
      }else{
        setLoggedIn(false);
      }
     
      checkStates();

  },[user, name,subject,message])
  return (
    <>
     <div className="md:mx-[15px] lg:mx-[10px] bg-ter-900 mt-4 md:mt-0 lg:mt-0 p-[20px] rounded-lg">
                  <p className='text-ter-500 font-style text-center'>Need my service Or have any Suggestion ?</p>
                  <form className="my-5 px-0 md:px-[15px] lg:px-[20px] relative" onSubmit={onSubmitFeedback}>
                     {/* <FancyMsgSent content={'message sent'}/> */}

                      <div className="w-full  mb-[25px] relative">
                            <input type="text" disabled={(loggedIn !== null && loggedIn) || loading ? 'disabled' : ''}  placeholder="Enter Your Name" id='name' className="input mx-5 w-[95%] bg-semiHover font-style font-thin text-[14px] md:text-[15px] lg:text-[16px] py-[20px] text-light" autoComplete='off' autoCapitalize='true' value={user !== null && user.name ? user.name : name == null ? '' : name } onChange={(e) => setName(capitalize(e.target.value))} />
                            <span className='absolute text-[11px] -bottom-[19px] left-[14px] text-sec-100'>{nameError === null ? '' : nameError}</span>
                        </div>

                      
                      <div className="w-full  mb-[25px] relative">
                            <input type="text" disabled={loading ? 'disabled' : ''} placeholder="Enter Message Subject" id='name' className="input mx-5 w-[95%] bg-semiHover font-style font-thin text-[14px] md:text-[15px] lg:text-[16px] py-[20px] text-light" autoComplete='off' autoCapitalize='true' value={subject === null ? '' : subject} onChange={(e) => setSubject(capitalize(e.target.value))}/>
                            <span className='absolute text-[11px] -bottom-[19px] left-[14px] text-sec-100'>{subjectError === null ? '' : subjectError}</span>
                        </div>

                      <div className="w-full  mb-[25px] relative">
                            <textarea disabled={loading ? 'disabled' : ''}  className='h-[120px] md:h-[82px] lg:h-[82px] textarea leading-tight textarea-bordered textarea-lg mx-5 w-[95%] bg-semiHover font-style font-thin text-[14px] md:text-[15px] lg:text-[16px] py-[7px] text-light resize-none' placeholder='Enter Your Suggestion / Message' value={message === null ? '' : message} onChange={(e) => setMessage(e.target.value)}></textarea>
                            <span className='absolute text-[11px] -bottom-[19px] left-[14px] text-sec-100'>{messageError === null ? '' : messageError}</span>
                        </div>
                      <div className=" mt-[20px] flex justify-center items-center">
                          
                           <button type='submit' disabled={btnState === null ? 'disabled' : '' }  className={ nameError === null && subjectError === null && messageError === null && btnState !== null ? 'btnStyle2 px-[25px] py-[8px] capitalize font-num font-bold text-[17px] rounded-lg border-[2px] border-solid border-sec-500 hover:bg-sec-500 hover:duration-200 hover:ease-in-out hover:text-section text-light flex items-center' : 'btnStyle2 bg-semiHover px-[25px] py-[8px] capitalize font-num font-bold text-[17px] rounded border-[2px] border-transparent border-sec-500 disabled'} >{ loading ? 'Sending Feedback ... ' : sentMessage ? 'Message sent' : 'Send FeedBack'} { sentMessage ?  <FaCheck className='fill-sec-300 ml-[10px]' size={14}/> : ''} </button>
                      </div>
                      {/*  */}
                  </form>
              </div>
    </>
  )
}

export default FeedBack