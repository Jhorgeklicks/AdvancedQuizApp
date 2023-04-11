import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom';
import {FaChevronDown,FaChevronRight,FaCheck,FaTimes} from "react-icons/fa";

const QuizAnswers = ({solution,replayQuiz}) => {
  const numbering = ['A','B','C','D'];
  const navigateTo = useNavigate();
      const showDetails = 'w-full block border border-solid border-semiHover m-0 transition ease-in-out delay-150 px-[20px] py-[10px] bg-prim-100';
      const hideDetails = 'hidden transition ease-in-out delay-150';
    const [selected, setSelected] = useState(0);
    // const [solutionArranged] = useState(solution);

    const onClickCollapsible = (e) => {
      if(e.target.parentElement.nextSibling.id){
          setSelected(e.target.parentElement.nextSibling.id)
        }
      }

      const onPlayQuizAgain = () => {
        replayQuiz('replay');
      }
      
      const onGoScoreBoard = () => {
        navigateTo('/score-board');
      }

  return (
    <>
     <div className={"w-full text-[14px] md:text-[17px] lg:text-[19px]" }>
        <div className="m-2 p-4 bg-prim-100">
    <div className="content w-full">
        <dl className="accordion bg-section border border-solid border-semiHover border-t-transparent mx-5">
          {
            solution.map( (qtn,index) => (
              <>
              <span key={qtn}>
              <dt className='bg-sec-300 p-[10px] text-dark border border-solid border-semiHover select-none cursor-pointer hover:bg-sec-400 transition duration-100 relative z-50' onClick={onClickCollapsible} key={qtn.id}> 

              <div className='w-full flex justify-between font-style'>
                {/*  */}
                  Q{index + 1}&nbsp;{qtn.qtn}
                  {selected == qtn.id ? <FaChevronDown color='' className='fill-prim-100' size={14}/> : <FaChevronRight color='' className='fill-semiHover' size={14}/> }
                {/*  */}
              </div>
              
              </dt>
              
              <dd id={qtn.id} className= {selected == qtn.id ? showDetails : hideDetails } >
                <div className="mb-[10px] flex items-center text-[13px] md:text-[14px] lg:text-[16px]">
                  <span className='text-light'>You Selected</span> <kbd className="kbd kbd-sm mx-[7px] p-[5px] bg-semiHover text-[15px] text-light">{qtn.selected}</kbd>
                  {qtn.correct == qtn.selected ? <FaCheck className='fill-sec-300 ml-[10px]' size={14}/> : <FaTimes color='red' className='ml-[10px]' size={14}/>}

                </div>
                {
                  qtn.type === 'multiple'
                  ? (
                    <div className='flex flex-col mb-2 text-light' >
                        {
                           qtn.options.map( (opt,index) => (
                          <div key={opt} className={qtn.correct === opt ? 'flex items-center py-[7px] px-[5px]  bg-semiHover rounded-md text-light -skew-x-[10deg]' : 'flex items-center py-[7px] px-[5px] '}>
                          <span className={qtn.correct === opt ? ' w-[25px] h-[25px] flex justify-center items-center rounded-[100%] text-[15px] bg-ter-200 text-center font-num text-light mr-2 shadow-lg skew-x-[10deg]' : 'w-[25px] h-[25px] flex justify-center items-center rounded-[100%] text-[15px] bg-ter-200 text-center font-num mr-2 shadow-lg'}>{numbering[index]}</span>
                          <span className={qtn.correct === opt ? 'font-sec text-[16px] skew-x-[10deg]' : 'font-sec text-[16px]'} >{opt}</span>
                        </div>
                           ) )
                        }
                    </div>
                  ) 
                  : (
                    <>
                    <div className='flex flex-col mb-2 text-light' >
                        
                         
                        {/*  */}
                        <div className={qtn.correct === 'True' ? 'flex items-center py-[7px] px-[5px]  bg-semiHover rounded-md text-light -skew-x-[10deg]' : 'flex items-center py-[7px] px-[5px] '}>
                          <span className={qtn.correct === 'True' ? 'inline-block w-[20px] h-[20px] rounded-full bg-ter-200 text-center font-num text-light mr-2 shadow-lg skew-x-[10deg]' : 'inline-block w-[20px] h-[20px] rounded-full bg-ter-200 text-center font-num mr-2 shadow-lg'}>A</span>
                          <span className={qtn.correct === 'True' ? 'font-sec text-[16px] skew-x-[10deg]' : 'font-sec text-[16px]'}>True</span>
                        </div>

                         <div className={qtn.correct === 'False' ? 'flex items-center py-[7px] px-[5px]  bg-semiHover rounded-md text-light -skew-x-[10deg]' : 'flex items-center py-[7px] px-[5px] '}>
                          <span className={qtn.correct === 'False' ? 'inline-block w-[20px] h-[20px] rounded-full bg-ter-200 text-center font-num text-light mr-2 shadow-lg skew-x-[10deg]' : 'inline-block w-[20px] h-[20px] rounded-full bg-ter-200 text-center font-num mr-2 shadow-lg'}>B</span>
                          <span className={qtn.correct === 'False' ? 'font-sec text-[16px] skew-x-[10deg]' : 'font-sec text-[16px]'}>False</span>
                        </div>
                        {/*  */}
                        </div>
                        
                    </>
                  ) 
                }
              </dd>
              </span>
              </>
            ) ) 
          }
        </dl>
        <div className="flex flex-col md:flex-row lg:flex-row justify-center items-center m-[25px]">
                <button type='button'className='btnStyle2 px-[25px] py-[8px] capitalize font-num font-bold text-[17px] rounded-lg border-[2px] border-solid border-sec-500 hover:bg-sec-500 hover:duration-200 hover:ease-in-out hover:text-section mr-[10px] mb-[10px] md:mb-0 lg:mb-0' onClick={onPlayQuizAgain}>Quiz Again</button>
                <button type='button'className='btnStyle2 px-[25px] py-[8px] capitalize font-num font-bold text-[17px] rounded-lg border-[2px] border-solid border-sec-500 hover:bg-sec-500 hover:duration-200 hover:ease-in-out hover:text-section' onClick={onGoScoreBoard}>Visit Score Board</button>
        </div>
    </div>	
    </div>	
    </div>	

    </>
  )
}


export default QuizAnswers
