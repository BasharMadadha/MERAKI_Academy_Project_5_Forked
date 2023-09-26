import React from 'react';
import "./style.css";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { IoMdOptions } from 'react-icons/Io';
import { AiOutlineHome } from 'react-icons/Ai';
import { LuGamepad2 } from 'react-icons/Lu';
import { CgProfile } from 'react-icons/Cg';
import { TbLogout } from 'react-icons/Tb';
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../redux/authSlicer/auth";

const SideBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goToProfile = () =>{
    navigate("/ProfilePage")
  }
  const goToHome = () =>{
    navigate("/HomePage")
  }
  const goToGame = () =>{
    // navigate("")
    alert("game")
  }
  const LogOutFunc = () =>{
    dispatch(setLogout());
  }







  const [show, setShow] = useState(true);
  return (
        <>
          <Offcanvas show={show} className='sidebar' >             
            <button className='sidebarbtn2' onClick={goToProfile}><CgProfile  className='sidebarbtncontentcopy'/> <span>Profile</span></button>
            <button className='sidebarbtn2' onClick={goToHome}><AiOutlineHome  className='sidebarbtncontentcopy'/> <span>Home</span></button>
            <button className='sidebarbtn2' onClick={goToGame}><LuGamepad2  className='sidebarbtncontentcopy'/> <span>Game</span></button>
            <button className='sidebarbtn2' onClick={LogOutFunc}><TbLogout  className='sidebarbtncontentcopy'/> <span>LogOut</span></button>
          </Offcanvas>
          
        </>
  )
}

export default SideBar



