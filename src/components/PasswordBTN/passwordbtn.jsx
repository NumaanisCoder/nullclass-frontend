import React, { useState } from 'react'
import './passbtn.css';

const PasswordBTN = () => {
    const [BTN, setBTN] = useState("Show")
    const input = document.querySelector("#passwordfiled");
    
    
  return (
    <div>
      <button type="button" className="passtypebtn" >{BTN}</button>
    </div>
  )
}

export default PasswordBTN
