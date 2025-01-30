import React, { useState } from 'react'
import styles from "../CSSmodules/login.module.css";
import LoginForm from '../components/loginForm';
import ForgatPw from '../components/ForgatPw';
const Login = () => {
    const [isforgat, setIsForget]=useState(false);
  return (
    <div className={styles.loginContainer} >
       {isforgat?<ForgatPw isforgat setIsForget={setIsForget} />:<LoginForm isforgat setIsForget={setIsForget}/>} 
        {/* <ForgatPw/> */}
    </div>
  )
}

export default Login;