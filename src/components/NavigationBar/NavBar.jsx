import React from 'react'
import './NavBar.css';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <div className='navbar'>
      <h3>PicoSphere</h3>
      <ul>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/login'>My Account</NavLink></li>
      </ul>
    </div>
  )
}

export default NavBar
