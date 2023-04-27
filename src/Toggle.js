import React, { useState } from 'react'
import Timer from './Timer'
import Stopwatch from './Stopwatch'

const Toggle = ( {toggle, score} ) => {


    if(toggle % 2 == 0){
  
        return (
          <Timer />
        )
      } else {
  
        return(
          <Stopwatch score = {score} />
        )
      } 

}


export default Toggle