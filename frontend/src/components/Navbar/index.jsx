import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../redux/authSlicer/auth";
import { useNavigate } from "react-router-dom";



const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogged = useSelector((state) => state.auth.isLogged);


  const handleLogout = () => {
    dispatch(setLogout());
  };
  useEffect(() => {
    if (!isLogged) {
      navigate("/login");
    }
  }, [isLogged]);
  return (
    <>
      <div className="NavBar">
        {isLogged ? (
          <>
            <Link className="Link" to="/dashboard">
              Homepage
            </Link>
          
            <button className="logout" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="Link" to="/">
              Register
            </Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </>
  );
};

export default NavBar;
