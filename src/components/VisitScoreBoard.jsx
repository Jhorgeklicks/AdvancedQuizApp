import React from 'react'
import { Link } from 'react-router-dom'
import {TbClick} from 'react-icons/tb';
// import {FaHandPointDown,FaGraduationCap} from 'react-icons/fa';


const VisitScoreBoard = () => {
  return (
    <>
    <div className="max-h-[60vh] md:mx-[15px] lg:mx-[10px] bg-ter-900 mt-4 md:mt-0 lg:mt-0 rounded-lg">
        <div className="card w-full bg-prim-100 shadow-xl image-full px-0 min-h-[58vh]">
            <figure>
                {/* style={{ backgroundImage: `url("/img/testBg.png")` }} */}
                <img src='/img/testBg.png' alt="Score Board Image" />
            </figure>
            <div className="card-body flex items-center w-3/4 h-4/5 m-auto">
                <h2 className="card-title text-[22px] mt-[20px]">Visit Score Board</h2>
                <Link to='/score-board'><div className="icon"><TbClick size={40} color='#FFFFFF'/></div></Link>
                    <p className = "text-center text-light font-style font-thin italic">Click to visit the Score Board.</p>
            </div>
        </div>
    </div>
    </>
  )
}

export default VisitScoreBoard