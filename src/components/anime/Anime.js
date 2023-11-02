import React, { useState, useEffect } from 'react';

import anime from "./Anime.module.css";

import BasicPagination from '../../components/pagination/BasicPagination'

const itemsPerPage = 5;



const current = []
const planning = []
const completed = []
const paused = []

let info = "";

function alert_yes(pic) {
  // Создаем элемент для всплывающего окна
  const popup = document.createElement("div");
  popup.textContent = "Перенесено в " + pic;
  popup.style.position = "fixed";
  popup.style.top = "50%";
  popup.style.left = "50%";
  popup.style.transform = "translate(-50%, -50%)";
  popup.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
  popup.style.color = "#fff";
  popup.style.padding = "20px";
  popup.style.borderRadius = "10px"; // Увеличиваем радиус границы
  popup.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
  popup.style.zIndex = "9999";
  popup.style.fontSize = "18px";
  popup.style.textAlign = "center";
  popup.style.opacity = "0"; // Начальная непрозрачность
  popup.style.transition = "opacity 0.5s ease-in"; // Добавляем CSS-переход для плавного появления и угасания

  // Добавляем элемент в DOM
  document.body.appendChild(popup);

  // Задержка перед показом окна
  const showDelay = 200; // 1 секунда

  // Плавное появление
  setTimeout(() => {
    popup.style.opacity = "1";
  }, showDelay);

  // Задержка перед скрытием окна
  const hideDelay = 1000; // 3 секунды

  // Плавное угасание
  setTimeout(() => {
    popup.style.opacity = "0";
  }, showDelay + hideDelay); // Задержка перед скрытием учитывает и задержку перед показом
}
function alert_no(pic) {
  // Создаем элемент для всплывающего окна
  const popup = document.createElement("div");
  popup.textContent = "Уже есть в " + pic;
  popup.style.position = "fixed";
  popup.style.top = "50%";
  popup.style.left = "50%";
  popup.style.transform = "translate(-50%, -50%)";
  popup.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
  popup.style.color = "#fff";
  popup.style.padding = "20px";
  popup.style.borderRadius = "10px"; // Увеличиваем радиус границы
  popup.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
  popup.style.zIndex = "9999";
  popup.style.fontSize = "18px";
  popup.style.textAlign = "center";
  popup.style.opacity = "0"; // Начальная непрозрачность
  popup.style.transition = "opacity 0.5s ease-in"; // Добавляем CSS-переход для плавного появления и угасания

  // Добавляем элемент в DOM
  document.body.appendChild(popup);

  // Задержка перед показом окна
  const showDelay = 200; // 1 секунда

  // Плавное появление
  setTimeout(() => {
    popup.style.opacity = "1";
  }, showDelay);

  // Задержка перед скрытием окна
  const hideDelay = 1000; // 3 секунды

  // Плавное угасание
  setTimeout(() => {
    popup.style.opacity = "0";
  }, showDelay + hideDelay); // Задержка перед скрытием учитывает и задержку перед показом
}

export default function Anime({handleItemClick, li, w}) {
  const [lists, setList] = useState([]);

  useEffect(() => {
    fetch("https://aaa.sekebaev.repl.co/")
    .then(response => response.json())
    .then((data) => {
      const transformedData = data.map((item) => {
        // кодировка хз тиспе 
        const blobData = atob(item.banner);
        const arrayBuffer = new ArrayBuffer(blobData.length);
        const uint8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < blobData.length; i++) {
          uint8Array[i] = blobData.charCodeAt(i);
        }
        // кодировка хз тиспе 

        return {
          id: item.id,
          Name: item.name,
          Year: item.year,
          Genre: item.ganre,
          Description: item.discription,
          Banner: URL.createObjectURL(new Blob([uint8Array], { type: 'image/png' })),
        };
      });
      setList(transformedData);
        
    })
    .catch((error) => console.error(error));
  },[])

  let window;

  if (li === "one") {
    window = <AnimeList handleItemClick={handleItemClick} w={w}/>
  }else if(li === "two"){
    window = <Current handleItemClick={handleItemClick} w={w}/>
  }else if(li === "three"){
    window = <Planning handleItemClick={handleItemClick} w={w}/>
  }else if(li === "four"){
    window = <Completed handleItemClick={handleItemClick} w={w}/>
  }else if(li === "five"){
    window = <Paused handleItemClick={handleItemClick} w={w}/>
  }

  return (
    <>
      {window}
    </>
  )

  function AnimeList({handleItemClick, w}) {
    
    /// gpt BasicPagination
    const [currentPage, setCurrentPage] = useState(1); // Текущая страница
    // Вычисление общего количества страниц
    const pageCountList = Math.ceil(lists.length / itemsPerPage);
    
    // Определение начального и конечного индексов для текущей страницы
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    // Отображение элементов для текущей страницы
    const displayedLists = lists.slice(startIndex, endIndex);
    const handlePageChange = (event, value) => {
      setCurrentPage(value);
    };
    ///gpt BasicPagination
  
    if (w === "Current") {
      const a = current.map((item) => {
        return item.id === info.id;
      });
  
  
      if (a.some(item => item === true)) {
        alert_no(w);
      } else {
        current.push({
          id: info.id,
          Name: info.name,
          Year: info.year,
          Genre: info.genre,
          Description: info.description,
          Banner: info.banner
        });
        alert_yes(w);
      }
    }
    if (w === "Planning") {
      const a = planning.map((item) => {
        return item.id === info.id;
      });
  
      if (a.some(item => item === true)) {
        alert_no(w);
      } else {
        planning.push({
          id: info.id,
          Name: info.name,
          Year: info.year,
          Genre: info.genre,
          Description: info.description,
          Banner: info.banner
        });
        alert_yes(w);
      }
    }
    if (w === "Completed") {
      const a = completed.map((item) => {
        return item.id === info.id;
      });
  
  
      if (a.some(item => item === true)) {
        alert_no(w);
      } else {
        completed.push({
          id: info.id,
          Name: info.name,
          Year: info.year,
          Genre: info.genre,
          Description: info.description,
          Banner: info.banner
        });
        alert_yes(w);
      }
    }
    if (w === "Paused") {
      const a = paused.map((item) => {
        return item.id === info.id;
      });
  
      if (a.some(item => item === true)) {
        alert_no(w);
      } else {
        paused.push({
          id: info.id,
          Name: info.name,
          Year: info.year,
          Genre: info.genre,
          Description: info.description,
          Banner: info.banner
        });
        alert_yes(w);
      }
    }
  
    function Click(id, name, year, genre, description, banner) {
      info = {
        id: id,
        name: name,
        year: year,
        genre: genre,
        description:description,
        banner:banner
      }
      handleItemClick(info);
    }
  
    return (
      <div className={anime.wrapper}>
        <h1 style={{color: "white"}}>Anime</h1>
        {
          displayedLists.map((key) => (
            <div key={key.id}>  
              <div className={anime.block} onClick={() => Click(key.id, key.Name, key.Year, key.Genre, key.Description, key.Banner)}>
                <div className={anime.blockImg}>
                  <img src={key.Banner} alt="" />
                </div>
                <div className={anime.blockText}>
                  <p>{key.Name}</p>
                  <p>Год производства : <span>{key.Year}</span></p>
                  <p>Жанр : <span>{key.Genre}</span></p>
                  <span>{key.Description}</span>
                </div>
              </div>
            </div>
          ))
        }
        <BasicPagination currentPage={currentPage}
          onPageChange={handlePageChange}
          pageCount={pageCountList}/>
      </div>
  
    )
  }
  
  function Current({handleItemClick, w}) {
    /// gpt BasicPagination
    const [currentPage, setCurrentPage] = useState(1); // Текущая страница
    // Вычисление общего количества страниц
    const pageCountCurrent = Math.ceil(current.length / itemsPerPage);
    
    // Определение начального и конечного индексов для текущей страницы
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    // Отображение элементов для текущей страницы
    const displayedLists = current.slice(startIndex, endIndex);
    const handlePageChange = (event, value) => {
      setCurrentPage(value);
    };
    ///gpt BasicPagination
  
    if (w === "Planning") {
      const a = planning.map((item) => {
        return item.id === info.id;
      });
  
      if (a.some(item => item === true)) {
        alert_no(w);
      } else {
        planning.push({
          id: info.id,
          Name: info.name,
          Year: info.year,
          Genre: info.genre,
          Description: info.description,
          Banner: info.banner
        });
        alert_yes(w);
        for (let i = 0; i < current.length; i++) {
          if (current[i].id === info.id) {
            current.splice(i, 1);
            break; // Выходим из цикла после удаления
          }
          
        }
      }
    }else if (w === "Completed") {
      const a = completed.map((item) => {
        return item.id === info.id;
      });
  
  
      if (a.some(item => item === true)) {
        alert_no(w);
      } else {
        completed.push({
          id: info.id,
          Name: info.name,
          Year: info.year,
          Genre: info.genre,
          Description: info.description,
          Banner: info.banner
        });
        alert_yes(w);
        for (let i = 0; i < current.length; i++) {
          if (current[i].id === info.id) {
            current.splice(i, 1);
            break; // Выходим из цикла после удаления
          }
          
        }
      }
    }else if (w === "Paused") {
      const a = paused.map((item) => {
        return item.id === info.id;
      });
  
      if (a.some(item => item === true)) {
        alert_no(w);
      } else {
        paused.push({
          id: info.id,
          Name: info.name,
          Year: info.year,
          Genre: info.genre,
          Description: info.description,
          Banner: info.banner
        });
        alert_yes(w);
        for (let i = 0; i < current.length; i++) {
          if (current[i].id === info.id) {
            current.splice(i, 1);
            break; // Выходим из цикла после удаления
          }
          
        }
      }
    }
  
    function Click(id, name, year, genre, description, banner) {
      info = {
        id: id,
        name: name,
        year: year,
        genre: genre,
        description:description,
        banner:banner
      }
      handleItemClick(info);
    }
  
    return (
      <div className={anime.wrapper}>
        <h1 style={{color: "white"}}>Current</h1>
        {
          displayedLists.map((key) => (
            <div key={key.id}>  
              <div className={anime.block} onClick={() => Click(key.id, key.Name, key.Year, key.Genre, key.Description, key.Banner)}>
                <div className={anime.blockImg}>
                  <img src={key.Banner} alt="" />
                </div>
                <div className={anime.blockText}>
                  <p>{key.Name}</p>
                  <p>Год производства : <span>{key.Year}</span></p>
                  <p>Жанр : <span>{key.Genre}</span></p>
                  <span>{key.Description}</span>
                </div>
              </div>
            </div>
          ))
        }
        <BasicPagination currentPage={currentPage}
          onPageChange={handlePageChange}
          pageCount={pageCountCurrent}/>
      </div>
  
    )
  }
  
  function Planning({handleItemClick, w}) {
    
    /// gpt BasicPagination
    const [currentPage, setCurrentPage] = useState(1); // Текущая страница
    // Вычисление общего количества страниц
    const pageCountPlanning = Math.ceil(planning.length / itemsPerPage);
    
    // Определение начального и конечного индексов для текущей страницы
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    // Отображение элементов для текущей страницы
    const displayedLists = planning.slice(startIndex, endIndex);
    const handlePageChange = (event, value) => {
      setCurrentPage(value);
    };
    ///gpt BasicPagination
  
    if (w === "Completed") {
      const a = completed.map((item) => {
        return item.id === info.id;
      });
  
      if (a.some(item => item === true)) {
        alert_no(w);
      } else {
        completed.push({
          id: info.id,
          Name: info.name,
          Year: info.year,
          Genre: info.genre,
          Description: info.description,
          Banner: info.banner
        });
        alert_yes(w);
        for (let i = 0; i < planning.length; i++) {
          if (planning[i].id === info.id) {
            planning.splice(i, 1);
            break; // Выходим из цикла после удаления
          }
          
        }
      }
    }
    if (w === "Current") {
      const a = current.map((item) => {
        return item.id === info.id;
      });
  
  
      if (a.some(item => item === true)) {
        alert_no(w);
      } else {
        current.push({
          id: info.id,
          Name: info.name,
          Year: info.year,
          Genre: info.genre,
          Description: info.description,
          Banner: info.banner
        });
        alert_yes(w);
        for (let i = 0; i < planning.length; i++) {
          if (planning[i].id === info.id) {
            planning.splice(i, 1);
            break; // Выходим из цикла после удаления
          }
          
        }
      }
    }
    if (w === "Paused") {
      const a = paused.map((item) => {
        return item.id === info.id;
      });
  
      if (a.some(item => item === true)) {
        alert_no(w);
      } else {
        paused.push({
          id: info.id,
          Name: info.name,
          Year: info.year,
          Genre: info.genre,
          Description: info.description,
          Banner: info.banner
        });
        alert_yes(w);
        for (let i = 0; i < planning.length; i++) {
          if (planning[i].id === info.id) {
            planning.splice(i, 1);
            break; // Выходим из цикла после удаления
          }
          
        }
      }
    }
  
    function Click(id, name, year, genre, description, banner) {
      info = {
        id: id,
        name: name,
        year: year,
        genre: genre,
        description:description,
        banner:banner
      }
      handleItemClick(info);
    }
  
    
  
    return (
      <div className={anime.wrapper}>
        <h1 style={{color: "white"}}>Planning</h1>
        {
          displayedLists.map((key) => (
            <div key={key.id}>  
              <div className={anime.block} onClick={() => Click(key.id, key.Name, key.Year, key.Genre, key.Description, key.Banner)}>
                <div className={anime.blockImg}>
                  <img src={key.Banner} alt="" />
                </div>
                <div className={anime.blockText}>
                  <p>{key.Name}</p>
                  <p>Год производства : <span>{key.Year}</span></p>
                  <p>Жанр : <span>{key.Genre}</span></p>
                  <span>{key.Description}</span>
                </div>
              </div>
            </div>
          ))
        }
        <BasicPagination currentPage={currentPage}
          onPageChange={handlePageChange}
          pageCount={pageCountPlanning}/>
      </div>
  
    )
  }
  
  function Completed({handleItemClick, w}) {
    
    /// gpt BasicPagination
    const [currentPage, setCurrentPage] = useState(1); // Текущая страница
    // Вычисление общего количества страниц
    const pageCountCompleted = Math.ceil(completed.length / itemsPerPage);
    
    // Определение начального и конечного индексов для текущей страницы
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    // Отображение элементов для текущей страницы
    const displayedLists = completed.slice(startIndex, endIndex);
    const handlePageChange = (event, value) => {
      setCurrentPage(value);
    };
    ///gpt BasicPagination
  
    if (w === "Planning") {
      const a = planning.map((item) => {
        return item.id === info.id;
      });
  
      if (a.some(item => item === true)) {
        alert_no(w);
      } else {
        planning.push({
          id: info.id,
          Name: info.name,
          Year: info.year,
          Genre: info.genre,
          Description: info.description,
          Banner: info.banner
        });
        alert_yes(w);
        for (let i = 0; i < completed.length; i++) {
          if (completed[i].id === info.id) {
            completed.splice(i, 1);
            break; // Выходим из цикла после удаления
          }
          
        }
      }
    }
    if (w === "Current") {
      const a = current.map((item) => {
        return item.id === info.id;
      });
  
  
      if (a.some(item => item === true)) {
        alert_no(w);
      } else {
        current.push({
          id: info.id,
          Name: info.name,
          Year: info.year,
          Genre: info.genre,
          Description: info.description,
          Banner: info.banner
        });
        alert_yes(w);
        for (let i = 0; i < completed.length; i++) {
          if (completed[i].id === info.id) {
            completed.splice(i, 1);
            break; // Выходим из цикла после удаления
          }
          
        }
      }
    }
    if (w === "Paused") {
      const a = paused.map((item) => {
        return item.id === info.id;
      });
  
      if (a.some(item => item === true)) {
        alert_no(w);
      } else {
        paused.push({
          id: info.id,
          Name: info.name,
          Year: info.year,
          Genre: info.genre,
          Description: info.description,
          Banner: info.banner
        });
        alert_yes(w);
        for (let i = 0; i < completed.length; i++) {
          if (completed[i].id === info.id) {
            completed.splice(i, 1);
            break; // Выходим из цикла после удаления
          }
          
        }
      }
    }
    
  
    function Click(id, name, year, genre, description, banner) {
      const info = {
        id: id,
        name: name,
        year: year,
        genre: genre,
        description:description,
        banner:banner
      }
      handleItemClick(info);
    }
  
    
  
    return (
      <div className={anime.wrapper}>
        <h1 style={{color: "white"}}>Completed</h1>
        {
          displayedLists.map((key) => (
            <div key={key.id}>  
              <div className={anime.block} onClick={() => Click(key.id, key.Name, key.Year, key.Genre, key.Description, key.Banner)}>
                <div className={anime.blockImg}>
                  <img src={key.Banner} alt="" />
                </div>
                <div className={anime.blockText}>
                  <p>{key.Name}</p>
                  <p>Год производства : <span>{key.Year}</span></p>
                  <p>Жанр : <span>{key.Genre}</span></p>
                  <span>{key.Description}</span>
                </div>
              </div>
            </div>
          ))
        }
        <BasicPagination currentPage={currentPage}
          onPageChange={handlePageChange}
          pageCount={pageCountCompleted}/>
      </div>
  
    )
  }
  
  function Paused({handleItemClick, w}) {
    /// gpt BasicPagination
    const [currentPage, setCurrentPage] = useState(1); // Текущая страница
    // Вычисление общего количества страниц
    const pageCountPaused = Math.ceil(paused.length / itemsPerPage);
    
    // Определение начального и конечного индексов для текущей страницы
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    // Отображение элементов для текущей страницы
    const displayedLists = paused.slice(startIndex, endIndex);
    const handlePageChange = (event, value) => {
      setCurrentPage(value);
    };
    ///gpt BasicPagination
  
    if (w === "Planning") {
      const a = planning.map((item) => {
        return item.id === info.id;
      });
  
      if (a.some(item => item === true)) {
        alert_no(w);
      } else {
        planning.push({
          id: info.id,
          Name: info.name,
          Year: info.year,
          Genre: info.genre,
          Description: info.description,
          Banner: info.banner
        });
        alert_yes(w);
        for (let i = 0; i < paused.length; i++) {
          if (paused[i].id === info.id) {
            paused.splice(i, 1);
            break; // Выходим из цикла после удаления
          }
          
        }
      }
    }
    if (w === "Current") {
      const a = current.map((item) => {
        return item.id === info.id;
      });
  
  
      if (a.some(item => item === true)) {
        alert_no(w);
      } else {
        current.push({
          id: info.id,
          Name: info.name,
          Year: info.year,
          Genre: info.genre,
          Description: info.description,
          Banner: info.banner
        });
        alert_yes(w);
        for (let i = 0; i < paused.length; i++) {
          if (paused[i].id === info.id) {
            paused.splice(i, 1);
            break; // Выходим из цикла после удаления
          }
          
        }
      }
    }
    if (w === "Completed") {
      const a = completed.map((item) => {
        return item.id === info.id;
      });
  
      if (a.some(item => item === true)) {
        alert_no(w);
      } else {
        completed.push({
          id: info.id,
          Name: info.name,
          Year: info.year,
          Genre: info.genre,
          Description: info.description,
          Banner: info.banner
        });
        alert_yes(w);
        for (let i = 0; i < paused.length; i++) {
          if (paused[i].id === info.id) {
            paused.splice(i, 1);
            break; // Выходим из цикла после удаления
          }
          
        }
      }
    }
    
  
    function Click(id, name, year, genre, description, banner) {
      const info = {
        id: id,
        name: name,
        year: year,
        ganre: genre,
        description:description,
        banner:banner
      }
      handleItemClick(info);
    }
  
    
  
    return (
      <div className={anime.wrapper}>
        <h1 style={{color: "white"}}>Paused</h1>
        {
          displayedLists.map((key) => (
            <div key={key.id}>  
              <div className={anime.block} onClick={() => Click(key.id, key.Name, key.Year, key.Genre, key.Description, key.Banner)}>
                <div className={anime.blockImg}>
                  <img src={key.Banner} alt="" />
                </div>
                <div className={anime.blockText}>
                  <p>{key.Name}</p>
                  <p>Год производства : <span>{key.Year}</span></p>
                  <p>Жанр : <span>{key.Genre}</span></p>
                  <span>{key.Description}</span>
                </div>
              </div>
            </div>
          ))
        }
        <BasicPagination currentPage={currentPage}
          onPageChange={handlePageChange}
          pageCount={pageCountPaused}/>
      </div>
  
    )
  }
}


