import React from 'react'

import search from "../../assets/search-alt-svgrepo-com 1.png"

import header from "./Header.module.css";
import { Link } from 'react-router-dom';

export default function Header(props) {
  return (
    <div className={header.wrapper}>
      <div className={header.Container}>
        <header>
          <Link to="/"><h1>AnimeList</h1></Link>
          <div className={header.input}>
              <input type="text" placeholder='Search'/>
              <img src={search} alt="" />
          </div>
        </header>
      </div>
    </div>
  )
}
