import React, { useEffect, useState } from 'react'
import axios from 'axios';
import PageTitles from '../components/PageTitles'
import QuizController from '../components/Quiz';
import QuizResults from '../components/QuizResults';
import QuizForm from '../components/QuizForm';
import Spinner from '../components/Spinner'
import DisplayError from '../components/DisplayError';
import QuizAnswers from '../components/QuizAnswers';
  
  const Quiz = () => {
  //  sets title of the page
    const title = 'Start Quiz Test';
  // hooks to handle page data
    const [player, setPlayer] = useState(null);
    const [questions, setQuestions] = useState(null);
    const [loading , setLoading ] = useState(false);
    const [error , setError ] = useState(null);
    const [playing , setPlaying] = useState(false);
    const [url, setUrl] = useState(null);
    const [results, setResults] = useState(null);
    const [solution, setSolution] = useState(null);
    const [displaySolution, setDisplaySolution] = useState(false);

    
    // grabs the user quiz settings to initiate the fetch of data
    const getQuizUrl = (url) => {
      setUrl(url);
    }
   
    const getQuizPlayerName = (name) => {
      setPlayer(name);
    }
    
    const getResults = (data) => {
      setResults(data);
    }
    
    const handleSolution = (data) => {
      setSolution(data);
    }
    
    const checkSolution = (data) => {
      if(data === 'read'){
        setDisplaySolution(true);
      }
    } 

   
  //  fetch quizes
   const fetchQuestions = () => {
     
     try{
          setDisplaySolution(false)
          setLoading(true);
          axios(url).
          then((res) => {
            setLoading(false);
            const responses = res.data.results;
            if(responses.length > 0){
              let quizData = [];
               responses.forEach( (data) => {
               quizData.push(
                     {
                       qtn     : data.question,
                       options : [ 
                                 ...data.incorrect_answers, 
                                 data.correct_answer
                                 ] ,
                       difficulty : data.difficulty,
                       type : data.type,
                       cat : data.category,
                       correct : data.correct_answer
                     }
                   )
               })
  
               setLoading(false);
               setPlaying(true);
               setQuestions(quizData)
              }else{
              setLoading(false);
              setPlaying(false);
              setError('Questions Not Available, Please Try a different Search!')
            }
          })
        }catch(e){
          setLoading(false);
          setError(e.message)
        }
   }

    useEffect(()=> {
        if(url && url !== null){
            fetchQuestions();
          
        }else{
            setPlaying(false)
        }
    },[url])
    
    const replayQuiz = (data) => {
        if(data === 'replay'){
          setUrl(null);
          setQuestions(null);
          setResults(null)
          setDisplaySolution(false);
          setSolution(null)
        }
    }

    useEffect(()=> {
        setUrl('');
    },[])

  
    if(loading){
      return <Spinner/>
    }

    if(error !== null){
      setTimeout( () => {
        setError(null)
      },10000)
    }

    return (
    <>
      <PageTitles title={title}/>
       <main className="min-h-[74vh] md:min-h-[73vh] lg:min-h-[73vh] mx-2 md:mx-2 lg:mx-8 flex items-center">
        
        {/* "quizBoard w-11/12 lg:w-7/12 md:p-6 lg:p-10 mx-auto flex flex-col md:flex-row bg-section rounded-md" */}
          <div className={playing ? "quizBoard w-11/12 lg:w-9/12 md:p-6 lg:p-10 mx-auto  my-[15px] flex flex-col md:flex-row lg:flex-row bg-section rounded-md" : "quizBoard w-11/12 lg:w-9/12 md:p-6 lg:p-10 mx-auto flex flex-col bg-section rounded-md" }>
            
          {error !== null && <DisplayError error={error}/>}

          {/* Display Questions and results */}
          {displaySolution && <QuizAnswers solution={solution} replayQuiz={replayQuiz} player={player}/>}
           
           {/* Display Quiz Results */}
         {results !== null  && results && !displaySolution && <QuizResults results={results} replayQuiz={replayQuiz} checkSolution={checkSolution} player={player}/> }
          
          {/* show message to user when User is Not Playing */}
         {!playing && results === null && <QuizForm getQuizUrl={getQuizUrl} getQuizPlayerName={getQuizPlayerName}/> }
       

          {/* Display Quiz Box To User */}
            { !loading && playing && (results === null) && (questions !== null) && <QuizController questions={questions} getResults={getResults} handleSolution={handleSolution} player={player}/>  }

          </div>
       </main>
       

      </>
      )
}

export default Quiz

