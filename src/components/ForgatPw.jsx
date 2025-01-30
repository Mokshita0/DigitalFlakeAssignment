import React from "react";
import styles from "../CSSmodules/login.module.css";
import { Link } from "react-router-dom";
import { Button, TextField } from "@mui/material";
const ForgatPw = ({isforgat,setIsForget}) => {
    console.log(isforgat,setIsForget);
    const handlebackLogin=()=>{
        setIsForget({isforgat:false});
      };
  return (
    <div className={styles.forgetPwContainer}>
      <h1>Did you forget password?</h1>
      <p>
        Enter your email address and we’ll send you a link to restore password
      </p>
      <TextField
        required
        id="outlined-required"
        defaultValue=" "
        label="email"
        type="email"
        className={styles.inputfiled}
      />
      <button className={styles.resetBtn} type="submit">
        Request reset link
      </button>
      <p>
        <Link to={"/"} onClick={handlebackLogin}>back to login</Link>
      </p>
    </div>
  );
};

export default ForgatPw;
