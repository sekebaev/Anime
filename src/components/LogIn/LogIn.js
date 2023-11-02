import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios";

import regis from "../regis/Regis.module.css";
import cross from "../../assets/cross-svgrepo-com 1.png"

export default function LogIn({setN, setB}) {
  const history = useNavigate();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");


  function Del(){
    setB("");
  }
  function Click(){
    setB(false)
  }

  function handleClick(){
    if (!email.match(/[^@\s]+@[^@\s]+\.[a-zA-Z]{2,}/)) {
      alert('Введите правильный адрес электронной почты.');
    }else{
      if (email === "") {
        alert("Введите данные");
      }else if(pass === ""){
        alert("Введите данные");
      }else{
        const url = "https://aaa.sekebaev.repl.co/login.php";
  
        let fData = new FormData();
        fData.append("email", email);
        fData.append("pass", pass);
  
        axios.post(url, fData)
        .then((response) => {
          if (response.data.login === email) {
            setN(response.data.login, response.data.name);
            history("/main");
          }else if (response.data){
            alert("Неправильный пароль");
          }else{
            alert("Такого логина не существует, пожайлуйста зарегистрируйтесь");
            Click();
          }
        })
        .catch((error) => {
          alert(error);
        })
  
      }
    }
    
    
  }

  return (
    <div className={regis.blockWrap}>
      <div className={regis.block}>
        
        <div className={regis.form} style={{height:"300px"}}>
          <p className={regis.x} onClick={Del}><img src={cross} alt="" /></p>
          <h2>АВТОРИЗАЦИЯ</h2>
            
          <input className={regis.int} type="email"  placeholder="example@example.com" required onChange={(e) => {setEmail(e.target.value)}}/>
            
          <input className={regis.int} type="password" id="password" name="password" placeholder="Ваш пароль" required onChange={(e) => {setPass(e.target.value)}}/>
            
          <input type="submit" value="Войти" onClick={handleClick} className={regis.submit}/>
            
          <div className={regis.link}>
            <p>Вы у нас впервые?</p>
            <p onClick={Click} className={regis.Link}>Регистрация</p>
          </div>
        </div>
      </div>
      <div className={regis.blur}></div>
    </div>
  )
}
