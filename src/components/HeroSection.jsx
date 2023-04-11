import React,{useState, useContext} from 'react'
import {Link} from 'react-router-dom'

const HeroSection = () => {
    const [heroBg] = useState({
        img : "/img/hero1.png"
    })

  return (
    <div className="hero h-[55vh] md:h-[60vh] lg:h-[65vh] bg-dark" style={{ backgroundImage: `url(${heroBg.img})`}}>
        <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-[500px] flex flex-col items-center justify-center p-[20px]">
                    <h1 className="mb-5 text-5xl font-bold text-prim-100">Hello there!! Welcome on Board</h1>
                    <p className="mb-5 font-style">Play, Compete and Learn</p>
                    {/* <p className='font-style'>Let's play</p> */}
                <Link to='/quiz' className="btn bg-ter-200 text-light font-sec text-[18px] py-[25px] px-[22px] flex-nowrap hover:bg-ter-400 rounded outline-none border-none shadow-md" >Get Started</Link>
            </div>
        </div>
    </div>
  )
}

export default HeroSection