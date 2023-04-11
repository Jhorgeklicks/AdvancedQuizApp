import React, {useState, useContext, useEffect} from 'react'
import UserContext from '../context/userContext';
import { capitalize } from '../utility/functions';
import { toast } from 'react-toastify';
import AlertModal from './AlertModal';


const QuizForm = ({getQuizUrl,getQuizPlayerName}) => {
    const {state} = useContext(UserContext);
    const {user:loginUser , alertUser} = state;

    const [data, setData] = useState({
        amount : 5,
        category : 9,
        level : 'easy',
        type : 'multiple',
        user : ''
    });

    const {amount,category,level,type,user} = data;
    const [loggedIn, setLoggedIn] = useState(false);
    const [showAlert,setShowAlert] = useState(true);
    
    const [trigger, setTrigger] = useState(false);

    const onChangeData = (e) => {
        setData( (prevState => ({
            ...prevState,
            [e.target.id] : e.target.value
        })))
    }
   
    const onSubmitQuizForm= (e, url) => {
        e.preventDefault();
        if(user === ''){
            toast.error('Please Enter Your Username', {
                position: "top-right",
                theme: "colored",
                });
        }else{
            url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${level}&type=${type}`;
            getQuizUrl(url);
            getQuizPlayerName(capitalize(user));
        }
    }
    
 
    const checkClicked = () => {
        setTrigger(true);
    }

    useEffect( () => {
        if(loginUser !== null && loginUser.id){
            setLoggedIn(true);
            setData( (prevState) => ({
                ...prevState,
                user : loginUser.name
            }) )
          }else{
            setLoggedIn(false);
          }

        setShowAlert(alertUser);

    },[alertUser, loginUser])

  return (
    <>
    {
        trigger && !loggedIn && showAlert && (
           <AlertModal/>
        )
    }

    <div className={"w-full text-[14px] md:text-[17px] lg:text-[19px]" }>
        <div className="m-2 p-4 bg-prim-100">
            <h1 className="my-[15px] text-center text-light capitalize ">Select your quiz</h1>
            <form action="" className='w-full flex flex-col mb-[20px] items-center' onSubmit={onSubmitQuizForm}>
                {/* amt=5,cat=2,level='easy',type='multiple' */}
                    <div className="w-full  mb-[10px] md:mb-[10px] py-[7px]">
                        <input type="text" disabled={loggedIn ? 'disabled' : ''} placeholder="Enter Your Name" id='user' className="input mx-2 w-[98%] bg-semiHover font-style font-thin text-[14px] md:text-[15px] lg:text-[17px]" autoComplete='false' autoCapitalize='true' value={user} onChange={onChangeData} onClick={checkClicked}/>
                    </div>
                <div className='w-full flex flex-col md:flex-row lg:flex-row mb-[10px] items-center'>

                

                    <div className="w-full md:w-2/4 lg:w-1/4 mb-[10px] md:mb-[6px] lg:mb-0">
                        <input type="number" placeholder="num of Questions" id='amount' className="input mx-2 w-[95%] bg-semiHover font-style font-thin text-[14px] md:text-[15px] lg:text-[17px]"  min="1" max="10" autoComplete="off" value={amount} onChange={onChangeData}/>
                    </div>

                    <div className="w-full md:w-2/4 lg:w-1/4 mb-[10px] md:mb-[6px] lg:mb-0">
                        <select className="select mx-2 w-[95%] bg-semiHover font-style font-thin text-[14px] md:text-[15px] lg:text-[17px]" id='category' value={category} onChange={onChangeData}>
                            <option disabled>Choose Category</option>
                            <option value="9">General Knowledge</option>
                            <option value="10">Entertainment: Books</option>
                            <option value="11">Entertainment: Film</option>
                            <option value="12">Entertainment: Music</option>
                            <option value="13">Entertainment: Musicals &amp; Theatres</option>
                            <option value="14">Entertainment: Television</option>
                            <option value="15">Entertainment: Video Games</option>
                            <option value="16">Entertainment: Board Games</option>
                            <option value="17">Science &amp; Nature</option>
                            <option value="18">Science: Computers</option>
                            <option value="19">Science: Mathematics</option>
                            <option value="20">Mythology</option>
                            <option value="21">Sports</option>
                            <option value="22">Geography</option>
                            <option value="23">History</option>
                            <option value="24">Politics</option>
                            <option value="25">Art</option>
                            <option value="26">Celebrities</option>
                            <option value="27">Animals</option>
                            <option value="28">Vehicles</option>
                            <option value="29">Entertainment: Comics</option>
                            <option value="30">Science: Gadgets</option>
                            <option value="31">Entertainment: Japanese Anime &amp; Manga</option>
                            <option value="32">Entertainment: Cartoon &amp; Animations</option>
                        </select>
                    </div>

                    <div className="w-full md:w-2/4 lg:w-1/4 mb-[10px] md:mb-[6px] lg:mb-0">
                        <select className="select mx-2 w-[95%] bg-semiHover font-style font-thin text-[14px] md:text-[15px] lg:text-[17px]" id='level' value={level} onChange={onChangeData}>
                            <option disabled>Pick Level</option>
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </div>

                    <div className="w-full md:w-2/4 lg:w-1/4 mb-[10px] md:mb-[6px] lg:mb-0">
                        <select className="select mx-2 w-[95%] bg-semiHover font-style font-thin text-[14px] md:text-[15px] lg:text-[17px]" id='type' value={type} onChange={onChangeData}>
                            <option disabled>Select Type</option>
                            <option value="multiple">Multiple Choice</option>
                            <option value="boolean">True / False</option>
                        </select>
                    </div>
                </div>
                {/* <input type="hidden" name="token" value="9ec10865437fae4c9ab2e90d1f1f5fe79169e4556e169a2a36315b399d1d3bfc"></input> */}
                <div className="w-full flex justify-center items-center">
                    <button type='submit' className='styleBtn px-[25px] py-[8px] capitalize font-num font-bold text-[17px] rounded' >Start Quiz</button>
                </div>
            </form>
        </div>
    </div>
    </>
  )
}

export default QuizForm