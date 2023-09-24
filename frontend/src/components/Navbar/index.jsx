import React, { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../redux/authSlicer/auth";
import { setUsersSearch } from "../redux/navSlicer/nav";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogged = useSelector((state) => state.auth.isLogged);
  const [userSearch, setuserSearch] = useState("");

const searchandle = () =>{
  axios
  .get(`http://localhost:5000/user/${userSearch}`)
  .then((response) => {
    console.log(response.data.data);
    // dispatch(setUsersSearch(response.data))
  })
  .catch((err) => {
    console.log(err);
  });
}
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
            <>
            <input type="text" onChange={(e)=>{
               setuserSearch(e.target.value)
            }}/>
            <button onClick={searchandle}>search</button>
            </>
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
