import React, { useState,useEffect } from 'react'
import {MdCached} from 'react-icons/md'

const FilterBox = ({displayOptions}) => {
    const allFalse = "w-full md:w-5/12 lg:w-5/12 mb-[10px] md:mb-[6px] lg:mb-0";
    const allTrue = "w-full md:w-6/12 lg:w-6/12 mb-[10px] md:mb-[6px] lg:mb-0";

    const options = [
        'General Knowledge','Entertainment: Books','Entertainment: Film','Entertainment: Music','Entertainment: Musicals &amp; Theatres','Entertainment: Television','Entertainment: Video Games','Entertainment: Board Games','Science &amp; Nature','Science: Computers','Science: Mathematics','Mythology','Sports','Geography','History','Politics','Art','Celebrities','Animals','Vehicles','Entertainment: Comics','Science: Gadgets','Entertainment: Japanese Anime &amp; Manga','Entertainment: Cartoon &amp; Animations'
    ]
    const [filter, setFilter] = useState({
        cat : 'General Knowledge',
        level : 'easy',
        all : true
    })

    const [refresh, setRefresh] = useState(false);
    
    const onChangeFilter = (e) =>{
        setFilter( (prevState) => ({
            ...prevState,
            [e.target.id] : e.target.value,
            all : false
        }))
    }

    const {cat, level, all} = filter;
    

    const refreshFilters = () => {
        setFilter({
            cat : 'General Knowledge',
            level : 'easy',
            all : true
        })
    }

    useEffect( () => {
        displayOptions(filter);
    },[filter])
  return (

   <>
    <div className={"w-full text-[14px] md:text-[17px] lg:text-[19px] mb-[1px]" }>
    <div className="w-full flex mb-0 justify-center items-center text-[13px] md:text-[14px] lg:text-[15px] text-sec-300">
              <h3>Filter Score Results</h3>
            </div>
        <div className="m-2 p-4 bg-prim-100 flex flex-col md:flex-row lg:flex-row justify-center items-center">
            <div className={all ? allTrue : allFalse}>
            <select className="select mx-2 w-[95%] bg-semiHover font-style font-thin text-[14px] md:text-[15px] lg:text-[17px]" id='cat' value={cat} onChange={onChangeFilter}>
               {
                options.map( opt => (<option key={opt}>{opt}</option>) )
               }
            </select>
            </div>

            <div className={all ? allTrue : allFalse}>
            <select className="select mx-2 w-[95%] bg-semiHover font-style font-thin text-[14px] md:text-[15px] lg:text-[17px]" id='level' value={level} onChange={onChangeFilter}>
                <option disabled>Pick Level</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select>
            </div>
            
            {
                !all && (
                    <div className="w-full md:w-2/12 lg:w-2/12 mb-[10px] md:mb-[6px] lg:mb-0 flex items-center justify-center">
                    <button type='button' className='' onClick={refreshFilters}><MdCached title="reload" color='#e6d435' size={30}/></button>
                    </div>
                )
            }

        </div>
    </div>
   </>
  )
}

export default FilterBox
