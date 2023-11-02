import React, { useState } from 'react'

import Header from '../../components/header/Header'
import Regis from '../../components/regis/Regis'
import Login from '../../components/LogIn/LogIn'

import "./Main.css";
import mai from "../../assets/mai.png";


export default function Main() {
  const [block, setBlock] = useState("");


  const dataList = (e,n) =>{
    localStorage.setItem("name", n);
    localStorage.setItem("email", e);
  }

  function handleClick(e) {
    setBlock(e);
  }
  return (
    <div className='wrapBlock'>
      
      <Header/>
      <div className='main'>
        <div className='Container'>
          <div className='mainText'>
            <h1>Погружайся в стиль мира аниме на нашей платформе!</h1>
            <p>Составляй список аниме и следи за своими анимешными приключениями!</p>
            <div className='mainButton'>
              <div className='shadowButton'></div>
              
              <button onClick={handleClick}>Создать список</button>
              
            </div>
          </div>
        </div>
        <div className='maiCircleWrap'>
  
          <div className='mai'>
            <img src={mai} alt="" />
          </div>
          <div className='circle'></div>
          
        </div>
      </div>
      <div className='blockRegis'>
      {block ? (
        <Login setB={handleClick} setN={dataList}/>
      ) : (
        block === '' ? (
          <></>
        ) : (
          <Regis setB={handleClick} setN={dataList}/>
        )
      )}
      </div>
      
    </div>
  )
}
