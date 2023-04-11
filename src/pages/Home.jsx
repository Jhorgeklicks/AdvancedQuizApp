import React,{useState} from 'react'
import { useContext } from 'react';
import UserContext from '../context/userContext';
import PageTitles from '../components/PageTitles'
import HeroSection from '../components/HeroSection';
import QuizCards from '../components/QuizCards';
import FeedBack from '../components/FeedBack';
import VisitScoreBoard from '../components/VisitScoreBoard';

const Home = () => {
  const title = 'Welcome | MindPulse';
  const {state} = useContext(UserContext);

  const [interests, setInterests] = useState([
     'Entertainment', 'Science', 'Mathematics', 'Computing','History','Politics','Vehicle',
    'Mythology','Animals', 'Arts','Sports','Geography'
  ])

  return (
    <>
    <PageTitles title={title}/>

      <HeroSection/>
      <main className="min-h-[74vh] md:min-h-[73vh] lg:min-h-[73vh]  mx-8">
      <section className='container my-[50px] mx-auto lg:px-[35px] bg-section py-[15px] rounded-lg'>
        <div className='flex justify-center items-center flex-col mb-[15px]'>
          <h3 className='font-prim font-bold text-center capitalize text-[14px] md:text-[20px] lg:text-[30px] text-sec-500 mb-1'>Test Your <span className='font-style'>Knowledge</span> On Any of These Subjects</h3>
          <p className='text-light font-style text-[12px] md:text-[14px] lg:text-[18px] mt-[4px]'>Become Our Score Board Leader</p>
         
        </div>
        <div className="flex flex-wrap justify-center md:justify-start">
          {
            interests.length > 0 && (
              interests.map( (interest, index) => (<QuizCards interest={interest} key={index}/>) ) 
            )
          }
        </div>
      </section>

      <section className='container my-[50px] mx-auto lg:px-[35px] bg-section py-[15px] rounded-lg'>
        <div className='flex justify-center items-center flex-col mb-[15px]'>
          <h3 className='font-prim font-bold text-center capitalize text-[18px] md:text-[22px] lg:text-[30px] text-sec-500'>Have Your Way</h3>
        </div>
        <div className="flex flex-wrap justify-center md:justify-start">

            <div className="md:mt-0 w-11/12 md:w-6/12 lg:w-6/12">
              {/* visit the score board component */}
              <VisitScoreBoard/>
            </div>

            <div className="mt-[20px] md:mt-0 w-11/12 md:w-6/12 lg:w-6/12">
             {/* suggestion component */}
             <FeedBack/>
            </div>

        </div>
      </section>
      </main>
    </>
  )
}

export default Home