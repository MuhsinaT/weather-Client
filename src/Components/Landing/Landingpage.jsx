import React from 'react'
import './Landing.css'
import { Link } from 'react-router-dom'

function Landingpage() {
  return (
    <>

   <div className="landing-page">
   <div className='landing'>
      <h3>Welcome to Your Weather & Data Dashboard</h3>
        <Link to="/dash">
          <button className="enter-button">Dashboard 
          <i className="fa-solid fa-arrow-right " style={{marginLeft:'5px'}}  />
          </button>
        </Link>
   </div>
    </div>
  
  </>
  )
}

export default Landingpage
