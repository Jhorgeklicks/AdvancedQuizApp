import React from 'react'
import {FadeLoader} from 'react-spinners';

const Spinner = () => {
  return (
    <div className='fixed w-full h-[100vh] bg-semiHover flex flex-col justify-center items-center top-0 left-0 right-0 bottom-0 pointer-events-none z-30'>
       <div>
        <FadeLoader color='#e6d435' speedMultiplier={2}/>
        </div>
        <p className="italic mt-[10px]">Fetching Data, Please wait...</p>
    </div>
  )
}


export default Spinner;