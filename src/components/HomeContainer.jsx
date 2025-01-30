import React from 'react'
import "../home.css"
import logoImage from "../assets/logo.png"

const HomeContainer = () => {
  return (
    <div className='displayMain displayHome'>
            <img src={logoImage} alt="logo image" className='logoImgHome'/>
            <p>Welcome to Digitalflake admin</p>
        </div>
  )
}

export default HomeContainer