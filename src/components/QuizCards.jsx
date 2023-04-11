import React from 'react'

const QuizCards = ({interest}) => {
  return (
    <>
          <div className="w-10/12 md:w-6/12 lg:w-3/12 ">
            <div className="box m-[10px]">
                <div className="content">
                    <h1 className="font-style">Quiz On</h1>
                    <p className="text-light">{interest}</p>
                </div>
            </div>
          </div>
    </>
  )
}

export default QuizCards