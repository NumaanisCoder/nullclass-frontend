import Cookies from "js-cookie";
import "./Login.css";

import { useState,useEffect } from "react";
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import PasswordBTN from "../PasswordBTN/passwordbtn";


const Login = () => {
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const expirationTime = new Date();
  const cookieExpire = expirationTime.getHours() + 24*7;
  const [BTN, setBTN] = useState("Show")
  const [cookie, setcookie,removecookie] = useCookies();
  const [FormError, setFormError] = useState({emailerror:"",passworderror:""});
  const [SubmitBTN, setSubmitBTN] = useState("LOGIN")
  let loginFormData = new FormData();
  useEffect(() => {
    if(token){
      navigate('/myaccount');
    }
    return () => {
      
    };
  }, [])
  return (
    <div className="LoginFragment">
      <div className="image-show element">
            <img src="https://m.media-amazon.com/images/M/MV5BMTYzYzIxMjktMDM4NS00MTM5LWJlMDgtNDRhMDNhOGRmY2EwXkEyXkFqcGdeQXVyMTk2OTAzNTI@._V1_.jpg" alt="" />
        </div>
      <div className="login-div element">
        <h2>Login Form</h2>
        <form onSubmit={async (e)=>{
          e.preventDefault();
          setSubmitBTN("Logining")
    
          for(const [key, value] of loginFormData.entries()){
            console.log(`${key}:${value}`) 
          } 
          try{
          const res = await axios.post('http://localhost:5500/api/v1/login', loginFormData,{
            headers: {
              'Content-Type': 'multipart/form-data' 
            }}); 
            setcookie("token",res.data.token,{expires: cookieExpire});
            console.log(cookieExpire);
            if(res.data.success){
              navigate("/myaccount");
            }
          }catch(e){
            if(e.response.status === 404){
              setFormError({emailerror:"Email Does Not Exist"})
              setSubmitBTN("Login");
            }else if(e.response.status === 401){
              setFormError({passworderror:"Password Incorrect"});
              setSubmitBTN("Login");
            }
            
          }
            

        }} encType="multipart/form-data">
          <div className="form-group">
            <label htmlFor="username">Email</label>
            <input type="email" name="email" autoComplete="off" onChange={(e)=>{
              loginFormData.set("email",e.target.value);
            }}/>
            <p style={{color: "red", fontSize: 10}}>{FormError.emailerror}</p>
          </div>
          <div className="form-group pass-div">
            <label htmlFor="username">Password</label>
            <input type="password" id="passwordfield" name="password"autoComplete="off" onChange={(e)=>{
              loginFormData.set("password",e.target.value);
            }} />
            <button type="button" className="passtypebtn" onClick={()=>{
              const input = document.querySelector("#passwordfield");
              if(input.type === 'password'){
                input.type = 'text'
                setBTN("Hide")
              }else{
                input.type = 'password'
                setBTN("Show");
              }
            }}>{BTN}</button>
            <p style={{color: "red", fontSize: 10}}>{FormError.passworderror}</p>
          </div>
          <div className="form-group login-btn-div"> 
            <button type="submit">
              {SubmitBTN}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
