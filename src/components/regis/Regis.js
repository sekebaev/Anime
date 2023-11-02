import React, {useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios";

import regis from "./Regis.module.css";

import cross from "../../assets/cross-svgrepo-com 1.png"

export default function Regis({setN, setB}) {
  
  const history = useNavigate();

  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [email, setEmail] = useState("");

  function Del(){
    setB("");
    
  }

  function Click(){
    setB(true);

  }
  function handleClick(){
    if (!email.match(/[^@\s]+@[^@\s]+\.[a-zA-Z]{2,}/)) {
      alert('Введите правильный адрес электронной почты.');
    }else{
      if (name === "") {
        alert("Введите данные");
      }else if(pass === ""){
        alert("Введите данные");
      }else if(email === ""){
        alert("Введите данные");
      }else{
        const url = "https://aaa.sekebaev.repl.co/regis.php";
  
        let fData = new FormData();
        fData.append("name", name);
        fData.append("email", email);
        fData.append("pass", pass);
  
        axios.post(url, fData)
        .then((response) => {
          if (response.data === 1) {
            Click(false);
            alert("Такой логин уже существует, попробуйте войти")
          }else{
            setN(response.data.login, response.data.name);
            history("/main");
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
        <div className={regis.form}>
          <p className={regis.x} onClick={Del}><img src={cross} alt="" /></p>
          <h2>РЕГИСТРАЦИЯ</h2>
            
          <input className={regis.int} name='name' type="text" placeholder="Ваше имя" required onChange={(e) => {setName(e.target.value)}}/>
            
          <input className={regis.int} name='email' type="email" placeholder="example@example.com" required onChange={(e)=>{setEmail(e.target.value)}}/>
            
          <input className={regis.int} type="password" id="password" name="password" placeholder="Ваш пароль" required onChange={(e) => {setPass(e.target.value)}}/>
            
          <input type="submit" value="Отправить" onClick={handleClick} className={regis.submit}/>
            
          <div className={regis.link}>
            <p>Вы уже зарегистрировались?</p>
            <p className={regis.Link} onClick={Click}>Войти</p>
          </div>
        </div>
      </div>
      <div className={regis.blur}></div>
    </div>
  )
}
