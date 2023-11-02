import React from 'react'

import eye from "../../assets/eye.png";
import plan from "../../assets/planning.png";
import task from "../../assets/task.png";
import pause from "../../assets/pause.png"
import ava from "../../assets/Ellipse 2.png"
import logout from "../../assets/log-out-01-svgrepo-com 1.png"

import profile from "./Profile.module.css";


export default function Profile({fixed, clickLi}) {
  
  const Click = (elem) => {
    clickLi(elem);
  }

return (
    <div className={profile.wrap} >
      <div className={profile.profile} style={{position: fixed ? "fixed" : "sticky"}}>
        <div className={profile.one}>
          <div className={profile.ava}>
            <img src={ava} alt="" />
          </div>
          <h1>{localStorage.getItem("name")}</h1>
          <p>{localStorage.getItem("email")}</p>
        </div>
        <div className={profile.two}>
          <ul>
            <li onClick={() => Click("one")}><img src={eye} alt="" />Anime</li>
            <li onClick={() => Click("two")}><img src={eye} alt="" />Current</li>
            <li onClick={() => Click("three")}><img src={plan} alt="" />Planning</li>
            <li onClick={() => Click("four")}><img src={task} alt="" />Completed</li>
            <li onClick={() => Click("five")}><img src={pause} alt="" />Paused</li>
          </ul>
        </div>
        <div className={profile.three}>
          <div className={profile.logOut}>
            <img src={logout} alt="" />
            Log out
          </div>
        </div>
      </div>
    </div>
  )
}
