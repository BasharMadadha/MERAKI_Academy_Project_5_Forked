import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  setUsername,
  setPassword,
  setEmail,
  setImage,
} from "../redux/RegisterSlicer/register";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const role_id = 1;

  // State variables for input values
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputImage, setInputImage] = useState("");

  const isLogged = useSelector((state) => state.auth.isLogged);

  const addNewUser = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:5000/users/register", {
        username: inputUsername,
        password: inputPassword,
        email: inputEmail,
        image: inputImage,
        role_id,
      });

      if (result.data.success) {
        console.log("Register successfully");
        setInputUsername("");
        setInputPassword("");
        setInputEmail("");
        setInputImage("");
        navigate("/Login");
      } else {
        throw new Error("Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error.message);
      console.log("Registration didn't work");
    }
  };

  return (
    <>
      <div className="container">
        <div className="Form">
          <p className="title">Register:</p>
          <br />
          <input
            type="text"
            placeholder="Username"
            value={inputUsername}
            onChange={(e) => setInputUsername(e.target.value)}
          />
          <br />
          <input
            type="email"
            placeholder="Email"
            value={inputEmail}
            onChange={(e) => setInputEmail(e.target.value)}
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
          />
          <input
            type="text"
            placeholder="Image URL"
            value={inputImage}
            onChange={(e) => setInputImage(e.target.value)}
          />
          <br />
          <button onClick={addNewUser}>Register</button>
          <br />
        </div>
      </div>
    </>
  );
};

export default Register;
