import React, { useState } from 'react'
import Timer from './Timer'
import Stopwatch from './Stopwatch'

const Toggle = ( {toggle, score, problems, setProblems, data, setData} ) => {


    if(toggle % 2 == 0){
  
        return (
          <Timer score = {score} problems = {problems} setProblems = {setProblems} data = {data} setData = {setData}/>
        )
      } else {
  
        return(
          <Stopwatch score = {score} problems = {problems} setProblems = {setProblems} data = {data} setData = {setData}/>
        )
      } 

}


export default Toggle