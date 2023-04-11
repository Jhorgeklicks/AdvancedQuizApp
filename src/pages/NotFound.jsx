import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <>
     <main className="h-[74vh] md:h-[73vh] lg:h-[73vh] px-[5px] overflow-hidden flex justify-center items-center" style={{backgroundImage : `url(/img/NotFound.png)`,backgroundRepeat : 'no-repeat', backgroundSize:'cover', backgroundPosition:'center', objectFit:'cover'}}>
       <div className="flex flex-col justify-center items-center">
          <span className='block font-black text-[130px]  md:text-[150px] lg:text-[200px] text-light' style={{letterSpacing:'4px'}}>404</span>
          <p className="font-style text-[16px]  md:text-[19px] lg:text-[25px] text-sec-300 -mt-[25px]">Page Not Found</p>
          <div className="w-full flex justify-center items-center">
            <Link to='/' className='px-[25px] py-[8px] capitalize font-num font-bold text-[17px] rounded hover:bg-semiHover text-light' >Go Home</Link>
            </div>
       </div>
    </main>
    </>
  )
}

export default NotFound