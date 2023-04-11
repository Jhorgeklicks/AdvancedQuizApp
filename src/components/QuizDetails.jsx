import React from 'react'

const QuizDetails = ({data, score,player}) => {
      const {difficulty,type,num,totalQuestions} = data;
  return (
    <>
    <div className="w-full md:w-4/12 order-1 md:order-2 lg:order-2">
              <div className="m-5 bg-prim-100 p-2 text-[14px] md:text-[17px] lg:text-[18px]  px-[15px] py-[10px] rounded">
                  <div className="font-num flex justify-center flex-col items-center">
                        <h4 className="font-sec font-normal mb-2 text-light text-center mt-5 italic">Questions Status</h4>
                        <div className=" w-[100px] h-[100px] bg-[#1a3542] relative bg-clip-content p-2 border-2 border-sec-300 border-dashed">
                            <span className='text-[20px] absolute top-[17px] left-[12px] font-style'>{num}</span> 
                            <span className='absolute -top-[10px] left-[33px] -skew-x-[11deg] text-light text-[70px]'>/</span>
                            <span className='text-sec-300 font-bold text-[22px] absolute bottom-[15px] right-[20px]'>{totalQuestions}</span>
                        </div>
                  </div>
                  <div className="mt-[30px]">
                        <h4 className="font-sec font-normal mb-2 text-center text-light italic">Details</h4> 
                        
                        <div className="mb-4 bg-[#1a3542] -skew-x-[19deg]">
                            <div className="flex items-center px-[10px] py-[8px] rounded-md skew-x-[19deg]">
                                <div className="span">Name</div>
                                <div className="span font-num text-sec-300 font-bold">&nbsp;:</div>
                                <div className="span font-style">&nbsp; {player}</div>
                            </div>
                        </div>
                        <div className="mb-4 bg-[#1a3542] -skew-x-[19deg]">
                            <div className="flex items-center px-[10px] py-[8px] rounded-md skew-x-[19deg]">
                                <div className="span">Score</div>
                                <div className="span font-num text-sec-300 font-bold">&nbsp;:</div>
                                <div className="span font-style">&nbsp; {score}</div>
                            </div>
                        </div>
                        <div className="mb-4 bg-[#1a3542] -skew-x-[19deg] shadow-md">
                            <div className="flex items-center px-[10px] py-[8px] rounded-md skew-x-[19deg]">
                                <div className="span">Type</div>
                                <div className="span font-num text-sec-300 font-bold">&nbsp;:</div>
                                <div className="span font-style">&nbsp; {type}</div>
                            </div>
                        </div>
                        <div className="mb-4 bg-[#1a3542] -skew-x-[19deg]">
                            <div className="flex items-center px-[10px] py-[8px] rounded-md skew-x-[19deg]">
                                <div className="span">Level</div>
                                <div className="span font-num text-sec-300 font-bold">&nbsp;:</div>
                                <div className="span font-style">&nbsp; {difficulty}</div>
                            </div>
                        </div>
                       
                  </div>
              </div>
           
            </div>
    </>
  )
}

export default QuizDetails