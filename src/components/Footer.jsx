import React from 'react'
import {Link} from 'react-router-dom';
import { FaTwitter,FaWhatsapp,FaTelegram,FaLinkedinIn,FaInstagram,FaHandPointDown } from "react-icons/fa";

const Footer = () => {
  return (
    <>
        <footer className="footer py-7 bg-section min-h-[15vh] md:min-h-[16vh] lg:min-h-[16vh] flex justify-center items-center">
          <div className='flex flex-col justify-center items-center w-full'>
            <p className="text-light text-xl">KlicksTech Corps &copy;&nbsp;{new Date().getFullYear()} </p>
            <span className="text-xl font-style my-2 underline-offset-2 capitalize text-sec-300 flex items-center"> <FaHandPointDown size={18} color='#e6d435' className='mr-[7px]'/>Connect with Me <FaHandPointDown size={18} color='#e6d435' className='ml-[7px]'/></span> 
            <div className="grid grid-flow-col gap-4 mb-4">
                <a href='https://www.linkedin.com/in/george-acquaye-804774185/' target='_blank' className='mx-1'>
                    <div className="tooltip tooltip-bottom bg-transparent outline-prim-800 font-style" data-tip="Visit LinkedIn">
                      <FaLinkedinIn size={22} color='#FFFFFF' className="hover:scale-150 hover:fill-sec-300 transition-all duration-500 ease-in-out "/>
                    </div>
                </a>
                <a href='https://wa.link/8odywx' target='_blank' className='mx-1'>
                    <FaWhatsapp size={22} color='#FFFFFF' className="hover:scale-150 hover:fill-sec-300 transition-all duration-500 ease-in-out "/>
                </a>
                <a href='https://twitter.com/KlicksmaN' target='_blank' className='mx-1'>
                    <FaTwitter size={22} color='#FFFFFF' className="hover:scale-150 hover:fill-sec-300 transition-all duration-500 ease-in-out "/>
                </a>
                <a href='https://t.me/KlicksTech' target='_blank' className='mx-1'>
                    <FaTelegram size={22} color='#FFFFFF' className="hover:scale-150 hover:fill-sec-300 transition-all duration-500 ease-in-out "/>
                </a>
                <a href='https://www.instagram.com/jhorge_klicks/' target='_blank' className='mx-1'>
                    <FaInstagram size={22} color='#FFFFFF' className="hover:scale-150 hover:fill-sec-300 transition-all duration-500 ease-in-out" title/>
                </a>
            </div>
          </div>
      </footer>
    </>
  )
}

export default Footer