import React,{useState} from 'react'
import Confetti from 'react-confetti'

const ShowConfetti = () => {

    const [size] = useState({
        width : window.innerWidth,
        height : window.innerHeight
      })
  
      const {width,height} = size;

  return (
    <Confetti  width={width} height={height}  /> 
  )
}

export default ShowConfetti