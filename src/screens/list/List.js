import React, { useState } from 'react'

import Header from '../../components/header/Header'
import Profile from '../../components/profile/Profile'
import Anime from '../../components/anime/Anime'

import eye from "../../assets/eye.png";
import plan from "../../assets/planning.png";
import task from "../../assets/task.png";
import pause from "../../assets/pause.png"
import cross from "../../assets/cross-svgrepo-com 1.png"
import "./List.css"
import anime from "../../components/anime/Anime.module.css"
import Block from '../../components/block/Block';


export default function List() {
  const [li, setLi] = useState("one");
  const [blur, setBlur] = useState(false);

  const [isElementVisible, setElementVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [fixed, setFixed] = useState(false);

  const [blockWhere, setBlockWhere] = useState("");

  const handleItemClick = (item) => {
    setBlur(true)
    setFixed(true);
    setElementVisible(true);
    document.body.style.overflow = "hidden";
    setSelectedItem(item);
  };

  function CloseElement() {
    setBlur(false);
    setFixed(false);
    setElementVisible(false);
    document.body.style.overflow = "";
    setBlockWhere("");
  };
  
  const clickLi = (liItem) => {
    setLi(liItem);
  };

  function where(i) {
    setBlockWhere(i);
  }

  return (
    <div>
      <Header/>
      <div className='listWrap'>
        <div className='listContainer'>
          <div className='listContent'>
            <Profile fixed={fixed} clickLi={clickLi} />
            <Anime handleItemClick={handleItemClick}  li={li} w={blockWhere}/>
          </div>
        </div>
      </div>
      <div className='blur' style={{display:blur ? "block" : "none"}}>
        {isElementVisible && selectedItem && (
          <div className="overlay" >
            <div className={anime.newObject}>
              <p className='x' onClick={CloseElement}><img src={cross} alt="" /></p>
              <Block selectedItem={selectedItem}/>
            </div>
            <div className='choose'>
              <div onClick={() => {where("Current")}}>
                <img src={eye} alt=""/>
                <p>Current</p>
              </div>
              <div onClick={() => {where("Planning")}}>
                <img src={plan} alt="" />
                <p>Planning</p>
              </div>
              <div onClick={() => {where("Completed")}}>
                <img src={task} alt="" /><p>Completed</p>
              </div>
              <div onClick={() => {where("Paused")}}>
                <img src={pause} alt="" /><p>Paused</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
