import React, { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../redux/authSlicer/auth";
import { setUsersSearch } from "../redux/navSlicer/nav";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Typeahead, withAsync } from 'react-bootstrap-typeahead';
import SideBar from "../SideBar";
import { TbMoneybag } from 'react-icons/Tb';

const AsyncTypeahead = withAsync(Typeahead);

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogged = useSelector((state) => state.auth.isLogged);
  const userInfo = useSelector((state) => state.auth.userInfo);



const searchandle = (query) =>{
  axios
  .get(`http://localhost:5000/user/${query}`)
  .then((response) => {
    dispatch(setUsersSearch(response.data.data))
  })
  .catch((err) => {
    console.log(err);
  });
}


const selectedHandle = (option)=> {
    console.log(option);
    navigate("/ProfilePage")
    setUsers(option)
}

  const handleLogout = () => {
    dispatch(setLogout());
  };

  useEffect(() => {
    if (!isLogged) {
      navigate("/login");
    }
  }, [isLogged]);
  const [isLoading, setIsLoading] = useState(false);

  const nav = useSelector((state) => {
  
    return state.nav

  });



  const filterBy = () => true;

  
  return (


    <>
    {/* <SideBar /> */}
      <div className="NavBar">
      
        {isLogged ? (
          <>
            <Link className="Link" to="/HomePage">
              Homepage
            </Link>
            <button className="logout" onClick={handleLogout}>
              Logout
            </button>
            <>
           
            <span onClick={()=>{alert("hello")}} className="crypto_amount"><TbMoneybag/>&nbsp;{userInfo.crypto_amount}</span>



  <AsyncTypeahead
      filterBy={filterBy}
      id="async-example"
      isLoading={isLoading}
      labelKey="username"
      minLength={2}
      onSearch={searchandle}
      onChange={selectedHandle}
      options={nav.usersSearch}
      placeholder="Search for a user..."
      renderMenuItemChildren={(option) => (
        <>
          <img
            src={option.image}
            style={{
              height: '24px',
              marginRight: '10px',
              width: '24px',
            }}
          />
          <div>{option.username}</div>
        </>
      )}
    />
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
