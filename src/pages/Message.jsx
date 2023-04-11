import React,{useState,useContext,useEffect} from 'react'
import { collection, query,  orderBy, where, onSnapshot, doc, updateDoc } from "firebase/firestore";
import {db} from '../firebase/firebase';
import UserContext from '../context/userContext';
import PageTitles from '../components/PageTitles'
import Spinner from '../components/Spinner';
import {AiOutlineRollback} from 'react-icons/Ai';
import { generateInitials,timeAgo,truncateSentence } from '../utility/functions';

const Message = () => {
  const showLeftSide = "w-full md:w-4/12 h-[70vh] md:h-[78vh] lg:h-[78vh] h-full py-[10px] px-[10px] overflow-scroll";
  const hideLeftSide = "hidden md:block h-[70vh] md:w-4/12 md:h-[80vh] lg:min-h-[85vh] h-full py-[10px] px-[10px] overflow-scroll"
  
  const title = 'Messages | MindPulse';
  const {state} = useContext(UserContext);
  const [loading,setLoading] = useState(false);
  const [showLg, setShowLg] = useState(false)
  const [messages, setMessages] = useState([]);
  const [data, setData] = useState(null);

  const onGoBack = () => {
    setShowLg(false);
    setData(null);
  }

  const updateMessage = async (id) => {
    const updateRef = doc(db, "Message", id);
    await updateDoc(updateRef, {
      status: "read"
    });
  }

  const showMessageDetails = (e) => {
    const showCurrentChat = messages.find( msg => msg.id === e.target.id )
    if(e.target.id){
      setData({...showCurrentChat})
      setShowLg(true)
      updateMessage(e.target.id)
    }
  }

  const fetchData = () => {
    setLoading(true)
    // const q = query(collection(db, "Message"), where("status", '==', "unread") , orderBy("createdAt"));
    const q = query(collection(db, "Message"), orderBy("status", "desc"), orderBy("createdAt" , "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
          data.push({...doc.data(), id: doc.id});
      });
      setLoading(false);
      setMessages(data);
    });
  }

  useEffect( () => {
    fetchData();
  },[])

  if(loading){
    return <Spinner/>
  }

  return (
    
    <>
    <PageTitles title={title}/>
      <main className="min-h-[74vh] md:min-h-[73vh] lg:min-h-[73vh] mx-8 mt-3">
      <div className="quizBoard w-full md:w-11/12 lg:w-11/12 p-[10px] mx-auto flex flex-col bg-section rounded-md" > 
          <div className="bg-prim-100">
              <div className="w-full flex">
                {
                 messages === null || messages.length > 0 ? 
                  (
                    <>
                                    {/* left side begins here */}
                <div className={showLg ? hideLeftSide : showLeftSide}>
                  {/* Contents here */}
                  {
                    messages.map((message,index) => (
                    <div className="w-full cursor-pointer bg-semiHover mb-[20px] px-[12px] py-[7px] rounded-md flex items-center" id={message.id} onClick={showMessageDetails}  key={message.id + '' + index}>
                        <div className="imgBox mr-[10px] w-[45px] h-[45px] flex justify-center items-center rounded-[50px] bg-ter-300 hover:bg-sec-300 hover:text-light transition-all duration-100 linear" id={message.id}>
                            <span className='font-num font-bold' id={message.id}>{generateInitials(message.name)}</span>
                        </div>
                        <div className={ message.status === 'unread' ? 'text-sec-300' : 'hover:text-light'}>
                          <p className='text-[14px] md:text-[15px] lg:text-[17px]' id={message.id}>{message.name}</p>
                          <span className='text-[14px] md:text-[15px] lg:text-[17px]' id={message.id}>{truncateSentence(message.subject, 20)}</span>
                        </div>
                    </div>
                    ))
                  }

                  {/* Contents ends  here */}
                </div>
                {/* left side ends here */}
                {/* right side begins */}
                <div className={ showLg ? 'block w-full md:w-8/12 h-[70vh] md:h-[78vh] lg:h-[78vh] bg-prim-700 py-[10px] px-[10px]' : 'hidden md:block w-full md:w-8/12 md:h-[78vh] lg:h-[78vh] bg-prim-900 h-full py-[10px] px-[10px]'}>
                    {data !== null &&
                      <div>
                        
                        <button className='bg-semiHover md:hidden flex items-center mb-[20px] py-[10px] px-[15px] rounded-md border-solid border-[1px] border-transparent hover:border-[#e6d435]' onClick={onGoBack}><AiOutlineRollback  color='#e6d435' className='mr-[8px]'/>Go Back</button>
                        <h2 className='w-full p-[20px] bg-sec-300 text-prim-100 font-bold text-[14.4px] md:text-[15.4px] lg:text-[17.4px]'>{data.subject}</h2>
                        <p className="w-full my-[20px] p-[20px] bg-semiHover text-[14px] md:text-[15px] lg:text-[17px]">{data.message}</p>
                        <div className="flex justify-end items-center">
                        <span className='italic text-[13px] md:text-[14px] lg:text-[16px]'><span className='text-sec-300 font-black'>~&nbsp;</span>{data.name} &nbsp;||&nbsp; <span className='font-num not-italic text-ter-300 text-[12px]'>{timeAgo(data.createdAt)}</span></span>
                        {/* <span className=''>{data.createdAt}</span> */}
                        </div>
                      </div>
                    }
                </div>{/* right side ends here */}
                    </>
                  ) :
                  (
                    <div className='p-[30px]'>
                      <h3>You have No Message!!</h3>
                    </div>
                  )
                }

              </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default Message