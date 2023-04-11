import React, { useEffect, useState, useContext } from 'react';
import UserContext from '../context/userContext';
import { doc, setDoc,serverTimestamp} from "firebase/firestore";
import {db} from '../firebase/firebase';
import {useNavigate} from 'react-router-dom';
import ShowConfetti from './Confetti';
import Typewriter from 'typewriter-effect';

const QuizResults = ({results,replayQuiz,checkSolution,player}) => {
  const {state : {user}} = useContext(UserContext);
  const navigateTo = useNavigate();
  const {totalQuestions,difficulty,type,score} = results;
  const [congratulate, setCongratulate] = useState(false);
  const [scoreImg, setScoreImg] = useState(null);

  const congrats = () => {

      if(((score / totalQuestions) * 100) > 60){
        setCongratulate(true)
        setScoreImg('/img/winner2.png');
      }else{
        setCongratulate(false)
        setScoreImg('/img/rePlay.png');
      }
  }

  const onPlayQuizAgain = () => {
    replayQuiz('replay');
  }
  
  const onGoScoreBoard = () => {
    navigateTo('/score-board');
  }
 
  const onViewSolutions = () => {
    checkSolution('read');
  }

  // 
   // submit result Function
   const submitResultToDb = async (res) => {
    try{
    // Add a new document in Results Collection
    await setDoc(doc(db, "Results", user.id), res);
    }catch(e){
      console.log(e.message);
      }
    }
    
    // submit result if user is Logged In;
  if(results !== null && user !== null && user.id ){
    const resultsCopy = {...results, playerId : user.id, name : user.name,  createdAt : serverTimestamp()};
        submitResultToDb(resultsCopy)
  }
  // 
  useEffect( () => {
      congrats();
  },[])
  return (
    <>
    { congratulate &&  <ShowConfetti/>}
    <div className={"w-full text-[14px] md:text-[17px] lg:text-[19px]" }>
        <div className="m-5 p-4 bg-prim-100">
           <div className="glassBg w-full min-h-[300px] flex flex-col justify-center items-center">
            <div className="result w-10/12 md:w-9/12 lg:w-8/12 my-[15px] md:my-[25px] lg:my-[35px]">
            
            <div className="card w-full  bg-transparent flex justify-center items-center">
              <figure className="px-5 pt-7 flex justify-center items-center w-[150px]">
                <img src={scoreImg} alt="trophy" className="rounded-xl w-full" />
              </figure>
              <div className="card-body items-center text-center text-[15px] md:text-[16px] lg:text-[18px]">
                <h2 className={ congratulate ? "card-title text-sec-300 font-style" : "card-title text-light font-num tracking-wider text-[17px] md:text-[20px] lg:text[22px]"}>{ congratulate ? <Typewriter options={{strings: [`Congratulations!! ${player}`], autoStart: true, loop: true, }}/> : `Oppx Sorry!! ${player}`}</h2>
                <p className='font-prim'>You scored <span className='font-bold font-num text-sec-100'>{score}</span> out of <span className='font-num text-light font-normal'>{totalQuestions}</span></p>

                <div className="card-actions flex flex-col items-center md:flex-row lg:flex-row justify-center mt-[25px]">
                <button type='button'className='btnStyle2 px-[25px] py-[8px] capitalize font-num font-bold text-[17px] rounded-lg border-[2px] border-solid border-sec-500 hover:bg-sec-500 hover:duration-200 hover:ease-in-out hover:text-section' onClick={onViewSolutions}>View Solutions</button>
                <button type='button'className='btnStyle2 px-[25px] py-[8px] capitalize font-num font-bold text-[17px] rounded-lg border-[2px] border-solid border-sec-500 hover:bg-sec-500 hover:duration-200 hover:ease-in-out hover:text-section' onClick={onPlayQuizAgain}>Quiz Again</button>
                <button type='button'className='btnStyle2 px-[25px] py-[8px] capitalize font-num font-bold text-[17px] rounded-lg border-[2px] border-solid border-sec-500 hover:bg-sec-500 hover:duration-200 hover:ease-in-out hover:text-section' onClick={onGoScoreBoard}>Score Board</button>
                </div>

              </div>
            </div>

            </div>
           </div>
        </div>
    </div>
    </>
  )
}

export default QuizResults