import React,{useState,useEffect} from 'react';
import { replaceCharacters, shuffleArray , generateUniqueId} from '../utility/functions';
import QuizDetails from './QuizDetails';
// import QuizOutcome from './QuizOutcome';
import QuizQuestionDisplayBox from './QuizQuestionDisplayBox';


const QuizController = ({questions,getResults,handleSolution,player}) => {
    const numbering = ['A','B','C','D'];
    const onSelectAlph = 'inline-block w-[25px] h-[25px] leading-[25px]  rounded-full bg-section text-light font-bold font-num text-[15px]m-[10px] text-center absolute top-[7px] left-[6px]'
    const onAlph = 'inline-block w-[25px] h-[25px] leading-[25px]  rounded-full bg-sec-300 text-dark font-bold font-num text-[15px]m-[10px] text-center absolute top-[7px] left-[6px]'

    const onSelectLabel = 'absolute top-0 left-0 z-20 w-full h-full rounded-full bg-sec-600 '
    const onLabel = 'absolute top-0 left-0 z-20 w-full h-full rounded-full bg-ter-700'

    const onSelectAlphMulti = 'bg-section inline-block w-[25px] h-[25px] leading-[25px]  rounded-full bg-sec-300 text-dark font-bold font-num text-[14px] mr-[10px] text-center text-light relative z-10'
    const onAlphMulti = 'inline-block w-[25px] h-[25px] leading-[25px]  rounded-[50%] bg-sec-300 text-dark font-bold font-num text-[14px] mr-[10px] text-center relative z-10'

    const onLabelMulti = 'block w-full bg-ter-400 px-[20] py-[5px] rounded-full relative mb-[9px] hover:bg-ter-500';
    const onSelectLabelMulti = 'block w-full bg-sec-600 px-[20] py-[5px] rounded-full relative mb-[9px] hover:bg-sec-700 text-light';
    
    const [quiz] = useState(questions);
    const [endsAt] = useState(questions.length);
    const [nextQtn, setNextQtn] = useState(0);
    const [selected, setSelected] = useState(null);
    const [results, setResults] = useState({
        totalQuestions : '',
        difficulty : '',
        type : '',
        cat : '',
        score : 0
    });
    const [quizStatus,setQuizStatus] =  useState('playing');
    const [currentQtn, setCurrentQtn] = useState({
        cat : '',
        correct : '',
        difficulty : '',
        qtn : '',
        type : '',
        options : '',
        optionTotal : 0,
        num : 0,
        totalQuestions : quiz.length
    });
    const [solutions, setSolutions] = useState(null);

    const {cat,correct,difficulty,qtn,type,options,optionTotal,num,totalQuestions} = currentQtn;
    const {score} = results;

    const handleQuizPlay = () => {

        if(quizStatus === 'playing'){
            const shuffleOptions = shuffleArray(quiz[nextQtn].options);
            setCurrentQtn( (prevState) => ({
                ...prevState,
                ...quiz[nextQtn],
                qtn : replaceCharacters(quiz[nextQtn].qtn),
                options: shuffleOptions.map( opt => replaceCharacters(opt) ),
                num : nextQtn + 1,
                optionTotal : quiz[nextQtn].options.length
            }))
            
            // increment for next question
            setNextQtn( nextQtn + 1 );
            setSelected(null);
        }
        
    }
    
    const onSelectAnswer = (e) => {
        setSelected(e.target.value);
    }
    

    const updateSolutions = (value) => {
        
        let arr = [];
        
        if(solutions === null){
            let data = [{...currentQtn, selected : value, id : generateUniqueId()}]
            setSolutions(data);
        }else{
            let data = {...currentQtn, selected : value, id : generateUniqueId()}
            arr.unshift(data);
            arr.unshift(...solutions);
            setSolutions(arr);

        }
    }
    
    const handleNextQuestion = () => {
        if((endsAt) === nextQtn) {
            updateSolutions(selected);
            setQuizStatus('finished')
        }else{
            updateSolutions(selected);
            handleQuizPlay();
            setQuizStatus('playing')
        } 

        if(selected === correct){
            setResults( (prevState) => ({
                ...prevState,
                totalQuestions : totalQuestions,
                difficulty : difficulty,
                type : type,
                score : score + 1,
                cat : currentQtn.cat
            }));
        }else{
            setResults( (prevState) => ({
                ...prevState,
                totalQuestions : totalQuestions,
                difficulty : difficulty,
                type : type,
                cat : currentQtn.cat
            }));
        }
            
    }

    if(quizStatus === 'finished'){
        getResults(results);
        handleSolution(solutions);
    }

   useEffect( () => {
        handleQuizPlay();
   },[])

//    console.log('--------------');
//    console.log(data);
  return (
    <>
    
    <div className={"w-full md:w-8/12 order-2 md:order-1 lg:order-1  text-[14px] md:text-[17px] lg:text-[19px]" }>
              <div className="m-5 p-4 bg-prim-100">
                { quizStatus == 'playing' && <QuizQuestionDisplayBox qtn={qtn} num={num}/>}
                

                { quizStatus == 'playing' && <h4 className="my-[5px] text-center italic underline">Select Your Answer</h4>}
                  { quizStatus == 'playing' &&
                  (<div className="answersBox w-full flex flex-wrap">
                     

                     {type == 'multiple' && 
                     ( <>
                     { 
                        options.map( (option, index) => (

                        <div className={selected === option ? onSelectLabelMulti : onLabelMulti } key={option + '' + index}>
                            <input type="radio" value={option} className="inline-block w-full h-full absolute top-0 left-0 bottom-0 right-0 p-[6px] opacity-0 cursor-pointer" onClick={onSelectAnswer} name='radio' id='rad'/>
                            <span className="flex items-center py-[3px] px-[10px]">
                                <span className={selected === option ? onSelectAlphMulti : onAlphMulti}>{numbering[index]}</span>
                                <span className={selected === option ? 'text-[14px] font-style text-light' : 'text-[14px] font-style text-light'}>{option}</span>
                            </span>
                        </div>
                     ) )
                     }          
                    </> )}
                     
                     {type == 'boolean' && 
                     (<>
                     <div className="w-2/4">
                        <span className='inline-block relative z-10 h-[40px] m-[4px] w-11/12'>
                            <input type='radio' className='w-full absolute top-0 left-0 text-[20px] opacity-0 h-full cursor-pointer z-30' name='radio' id='rad' value={options[0]} onClick={onSelectAnswer}/>

                            <label htmlFor="rad" className={selected === options[0]  ? onSelectLabel : onLabel }>  

                            <span className={selected === options[0]  ? onSelectAlph : onAlph }>A</span> 

                                <span className='absolute top-[10px] left-[39px] text-light font-style font-normal text-[16px]'>{options[0]}</span>

                            </label>
                        </span>
                     </div>
                     
                     <div className="w-2/4">
                        <span className='inline-block relative z-10 h-[40px] m-[4px] w-11/12'>
                            <input type='radio' className='w-full absolute top-0 left-0 text-[20px] opacity-0 h-full cursor-pointer z-30' name='radio' id='rad' value={options[1]} onClick={onSelectAnswer}/>

                            <label htmlFor="rad" className={selected === options[1]  ? onSelectLabel : onLabel }>  

                            <span className={selected === options[1]  ? onSelectAlph : onAlph }>B</span>  

                                <span className='absolute top-[10px] left-[39px] text-light font-style font-normal text-[16px]'>{options[1]}</span>

                            </label>
                        </span>
                     </div>
                     
                     </>)}

                    
                 </div> 
                 )}


                 {/* submit */}
                 <div className="w-full flex justify-center items-center my-3">
                      { quizStatus == 'playing' &&
                        (
                            <button type='button' disabled={selected == null ? true : false } className={ selected == null ? 'btnStyle2 bg-semiHover px-[25px] py-[8px] capitalize font-num font-bold text-[17px] rounded disabled' : 'btnStyle2 px-[25px] py-[8px] capitalize font-num font-bold text-[17px] rounded-lg border-[2px] border-solid border-sec-500 hover:bg-sec-500 hover:duration-200 hover:ease-in-out hover:text-section'} onClick={handleNextQuestion}>{(endsAt === nextQtn) ? 'Finish' : 'Next'}</button>
                        )
                      }
                     
                      {/* { quizStatus == 'finished' &&
                        (
                            <button type='button' className='styleBtn px-[25px] py-[8px] capitalize font-num font-bold text-[17px] rounded' onClick={handleScore}>Score Details</button>
                        )
                      } */}
                 </div>
              </div>
            </div>
           <QuizDetails data={currentQtn} score={score} player={player}/>

    </>
  )
}

export default QuizController