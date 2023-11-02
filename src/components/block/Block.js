import React from 'react'

import anime from "../anime/Anime.module.css";

export default function Block({selectedItem}) {
  return (
    <div className={anime.block}>
      <div className={anime.blockImg}>
        <img src={selectedItem.banner} alt="" />
      </div>
      <div className={anime.blockText}>
        <p>{selectedItem.name}</p>
        <p>Год производства : <span>{selectedItem.year}</span></p>
        <p>Жанр : <span>{selectedItem.genre}</span></p>
        <span>{selectedItem.description}</span>
      </div>
    </div>
  )
}
