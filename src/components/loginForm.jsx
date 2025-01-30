import React, { useState } from "react";
import styles from "../CSSmodules/login.module.css";
import logo from "../assets/logo.png";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";


const LoginForm = ({ isforgat, setIsForget }) => {

  const [userDetials, setuserDetails] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  //create function to handle submit form
  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:7000/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userDetials.email,
        password: userDetials.password,
      }),
    });
    const json = await response.json();
    // console.log(json);

    if (!json.success) {
      alert(json.message);
    }
    if (json.success) {
      localStorage.setItem("authToken", json.authToken);
      localStorage.setItem("userEmail", userDetials.email);
      // console.log(localStorage.getItem("authToken"));
      setuserDetails({ email: "", password: "" });
      //if logged in then navigate to home page
      navigate("/home");
      console.log('home');
    }
  };

  const onchange = (e) => {
    setuserDetails({ ...userDetials, [e.target.name]: e.target.value });
  };

  const handleForget = () => {
    setIsForget({ isforgat: true });
  };

  return (
    <div className={styles.logincontainer}>
      <img src={logo} alt="logo" className={styles.logoImg} />

      <p>Welcome to Digitalflake admin</p>
      <form className={styles.loginform}>
        <TextField
          required
          id="outlined-required"
          defaultValue=" "
          label="email"
          type="email"
          className={styles.inputfiled}
          name="email"
          onChange={onchange}
          value={userDetials.email}
        />
        <TextField
          required
          id="outlined-required"
          defaultValue=""
          label="password"
          type="password"
          className={styles.inputfiled}
          name="password"
          onChange={onchange}
          value={userDetials.password}
        />
        <p>
          <Link to={"/"} onClick={handleForget}>
            forgat password{" "}
          </Link>
        </p>
        <button type="submit" className={styles.loginBtn} onClick={handleLogin}>
          Log In
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
