import React, { useEffect, useState } from "react";
import Table from "../components/Results";
import { collection, query, where, orderBy, limit, onSnapshot } from "firebase/firestore";
import {db} from '../firebase/firebase';
import {PuffLoader} from 'react-spinners';
import FilterBox from "../components/FilterBox";

const DisplayFilterStatus = ({all, cat, level}) => {
  return (
    <div className="w-full flex my-[10px] py-[5px] justify-center items-center text-[13px] md:text-[14px] lg:text-[15px]">
      {
        all ? (
          <h3>Displaying Results for all categories </h3>
        ) : ( 
          <h3>Results for : <span className="text-sec-300 font-bold">{`❝${cat}❞`}</span> and Status is <span className="text-sec-300 font-bold">{`❝${level}❞`}</span> </h3>
        )
      }
     
    </div>
  )
}

const ScoreBoard = () => {
const [players,setPlayers] = useState({});
const [selectedFilter,setSelectedFilter] = useState({});
const [loading,setLoading] = useState(false);

const {cat, level, all} = selectedFilter;
const displayOptions = (data) => {
  if(data){
    setSelectedFilter(data);
  }
}

useEffect( () => {
  setLoading(true)

let q = '';

  if(all){
    q = query(collection(db, "Results"),orderBy("score",'desc'),limit(20));
  }else{
    q = query(collection(db, "Results"), where('cat','==', `${cat}`), where('difficulty','==', `${level}`) ,orderBy("score",'desc'),limit(20));
  }

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const data = [];
    querySnapshot.forEach((doc) => {
        data.push({...doc.data(), id: doc.id});
    });
    setLoading(false);
    setPlayers(data);
  });

},[selectedFilter])

  return (

    <>
    <main className="min-h-[74vh] md:min-h-[73vh] lg:min-h-[73vh] mx-2 mt-[20px]">
        <div className="quizBoard w-full md:w-11/12 lg:w-11/12 p-[10px] mx-auto flex flex-col bg-section rounded-md" > 
        <FilterBox displayOptions={displayOptions}/>

        {!loading && players.length > 0 &&  <DisplayFilterStatus cat={cat} level={level} all={all}/>}

          <div className="bg-prim-100">
          {loading && <div className="min-h-[50vh] flex flex-col justify-center items-center"><PuffLoader color='#e6d435'/><p className="italic font-style mt-[10px]">Fetching Quiz Records, Please wait</p></div>}
           {!loading && players.length > 0 &&  <Table players={players}/>}
           {!loading && players.length < 1 &&  (
            <p className="p-[30px] text-center">There is no Record to display</p>
           )}
          </div>
        </div>
    </main>
    </>
  )
}

export default ScoreBoard