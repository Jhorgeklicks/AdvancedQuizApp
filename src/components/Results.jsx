import React from 'react';
import { checkAndAward } from '../utility/functions';
import { FaStar } from 'react-icons/fa';

// import DataTable from 'react-data-table-component';
const StarLoop =({num}) => {
    const stars = [];
    let st = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#f00" class="bi bi-star" viewBox="0 0 16 16"> <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/> </svg>`;
    for (let i = 0; i < num; i++) {
      stars.push({st});
    }
  
    return <span className='flex justify-center items-center'>{stars.map( (star, index) => <FaStar key={index} className='mx-[1px] fill-[#ffeb3b]'/> )}</span>;
  }

const Table = ({players}) => {

  
  return (
    <>
    <div className="overflow-x-auto py-4 px-2">
        <table className="table w-full table-zebra text-[15px]">
            <thead className='my-[5px]'>
                <tr className='bg-sec-600'>
                    <th className='bg-sec-800 text-center font-sec text-[14px] md:text-[15px] lg:text-[17px] capitalize text-light'>Ranking</th> 
                    <th className='bg-sec-800 text-center font-sec text-[14px] md:text-[15px] lg:text-[17px] capitalize text-light'>Name</th> 
                    <th className='bg-sec-800 text-center font-sec text-[14px] md:text-[15px] lg:text-[17px] capitalize text-light'>Category</th> 
                    <th className='bg-sec-800 text-center font-sec text-[14px] md:text-[15px] lg:text-[17px] capitalize text-light'>Level</th> 
                    <th className='bg-sec-800 text-center font-sec text-[14px] md:text-[15px] lg:text-[17px] capitalize text-light'>Total Qtns</th> 
                    <th className='bg-sec-800 text-center font-sec text-[14px] md:text-[15px] lg:text-[17px] capitalize text-light'>Score</th> 
                    <th className='bg-sec-800 text-center font-sec text-[14px] md:text-[15px] lg:text-[17px] capitalize text-light'>Remark</th>
                </tr>
            </thead> 
            <tbody>
                {
                    players.map((player,index) => (
                        <tr className="hover" key={player.id}>
                            <th className='bg-section text-center font-sec text-[13px] md:text-[14px] lg:text-[16px] capitalize'>{`N⁰ ${index + 1}`}</th> 
                            <td className='bg-section text-center font-sec text-[13px] md:text-[14px] lg:text-[16px] capitalize'>{player.name}</td>
                            <td className='bg-section text-center font-sec text-[13px] md:text-[14px] lg:text-[16px] capitalize'>{player.cat}</td> 
                            <td className='bg-section text-center font-sec text-[13px] md:text-[14px] lg:text-[16px] capitalize'>{player.difficulty}</td> 
                            <td className='bg-section text-center font-sec text-[13px] md:text-[14px] lg:text-[16px] capitalize'>{player.totalQuestions}</td> 
                            <td className='bg-section text-center font-sec text-[13px] md:text-[14px] lg:text-[16px] capitalize'>{player.score}</td> 
                            <td className='bg-section text-center font-sec text-[13px] md:text-[14px] lg:text-[16px] capitalize flex justify-center py-[15px]'><StarLoop num={checkAndAward(player.score,player.totalQuestions)}/></td> 
                        </tr>
                    ))
                }
            </tbody> 
        </table>
    </div>
    </>
  );
}


export default Table;