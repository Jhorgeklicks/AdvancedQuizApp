import React from 'react'

const QuizQuestionDisplayBox = ({qtn,num}) => {
  return (
    <>
        <div className="qtnBox bg-[#1a3542] flex justify-center items-start py-4 shadow-xl min-h-[180px] md:clip-path-mypolygon lg:clip-path-mypolygon">
            <div className="quizElements w-11/12 md:w-10/12 lg:w-9/12 mx-auto md:flex md:items-center lg:flex py-[20px] m-auto">

                <div className="w-1/12 h-[40px] text-center mx-auto md:ml-0 lg:ml-0 md:mr-[10px] lg:mr-[15px] mb-[10px] md:mb-0 lg:mb-0 font-num font-bold bg-sec-400 text-prim-400 text-[25px] rounded-md ">{num}</div>

                <div className="qtnText font-style font-normal text-light w-full md:w-11/12 lg:w-11/12 text-center md:text-left lg:text-left">{qtn}</div>

            </div>
        </div>
    </>
  )
}

export default QuizQuestionDisplayBox