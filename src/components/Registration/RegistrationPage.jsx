import React from 'react'
import './RP.css';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';




const RegistrationPage = () => {
  let formData = new FormData();
  const [cookie,setCookie, removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();
  // const [error, seterror] = useState({name:"",email:"",password:""});
  formData.set('username', '');
  formData.set('email', '');
  formData.set('password', '');

  
  
  return (
    <div className='LoginFragment'>
        <div className="image-show element">
            <img src="https://image.api.playstation.com/vulcan/ap/rnd/202207/1210/4xJ8XB3bi888QTLZYdl7Oi0s.png" alt="" />
        </div>
       <div className="login-div">
        <h2>Join With Us!!!</h2>
        <form onSubmit={async (e)=>{
          e.preventDefault();
          for(const [key, value] of formData.entries()){
            console.log(`${key}:${value}`) 
          }
          const res = await axios.post('http://localhost:5500/api/v1/registration', formData,{
            headers: {
              'Content-Type': 'multipart/form-data', // Ensure the correct content type
            }});
           setCookie("token",res.data.token);
           navigate('/myaccount');
        }} encType="multipart/form-data">
          <div className="avatar">
            
              <img src="https://i.pinimg.com/280x280_RS/e1/08/21/e10821c74b533d465ba888ea66daa30f.jpg" id='imagepreview' className='circle' alt="" />
            
            <input type="file" onChange={(e)=>{
              formData.append('image', e.target.files[0]);
              const url = URL.createObjectURL(e.target.files[0]);
              document.querySelector('#imagepreview').src = url;
             console.log(URL.createObjectURL(e.target.files[0]))
            }} id="profile-pic-input" />
            <label for="profile-pic-input" id="custom-label">Choose Profile Pic</label>
          </div>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" name="name" onChange={(e)=>{
              formData.set('name',e.target.value);
            }} autoComplete="off" />
          </div>
          <div className="form-group">
            <label htmlFor="username">Email</label>
            <input type="email" name="email" onChange={(e)=>{
              formData.set('email',e.target.value);
            }} autoComplete="off" />
          </div>
          <div className="form-group pass-div">
            <label htmlFor="username">Password</label>
            <input type="password" id="passwordfield" onChange={(e)=>{
              formData.set('password',e.target.value);
            }} name="password"autoComplete="off" />
            <button className="passtypebtn" >Show</button>
          </div>
          <div className="form-group login-btn-div"> 
            <button type="submit">
             Create Account
            </button>
            <p></p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegistrationPage
