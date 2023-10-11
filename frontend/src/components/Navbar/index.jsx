import React, { useEffect, useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogout, setUser_id, setToggleProf } from "../redux/authSlicer/auth";
import { setUsersSearch } from "../redux/navSlicer/nav";
import { useNavigate } from "react-router-dom";
import { Typeahead, withAsync } from "react-bootstrap-typeahead";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Text,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";

import io from "socket.io-client";
const socket = io("http://localhost:5001");
import axios from "axios";
const AsyncTypeahead = withAsync(Typeahead);

const NavBar = ({ users, getUserByID, getPostsByUser }) => {

  const [scrolled, setScrolled] = useState(false);
  const [notification, setNotification] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogged = useSelector((state) => state.auth.isLogged);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const userId = useSelector((state) => state.auth.userId);
  const toggleProf = useSelector((state) => state.auth.toggleProf);
  const userss = useSelector((state) => state.auth.users);
  const userNav = users?.find((user1) => userInfo?.id === user1.id);
  const userNav1 = userss?.find((user1) => userInfo?.id === user1.id);
  const searchandle = (query) => {
    axios
      .get(`http://localhost:5000/user/${query}`)
      .then((response) => {
        dispatch(setUsersSearch(response.data.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const selectedHandle = (option) => {
    // console.log(option);
  };

  const handleLogout = () => {
    if (userId) {
      socket.emit("user-logout", userId);
    }
    dispatch(setLogout());
  };

  useEffect(() => {
    if (!isLogged) {
      navigate("/");
    }
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isLogged]);

  const [isLoading, setIsLoading] = useState(false);

  const nav = useSelector((state) => {
    return state.nav;
  });

  const filterBy = (option, props) => {
    // console.log(option, props);
    return option.username.toLowerCase();
  };


  const getnotification = ()=>{
    axios
      .get(`http://localhost:5000/notif`)
      .then((response) => {
        setNotification(response.data.result)
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // const test  = notification.map((elem,i)=>{
  //     console.log(elem);
  // })
  
  return (
    <div className={scrolled ? 'navbar scrolled' : 'navbar'}>
      {/* <SideBar /> */}
      <Box px={4} width={"100%"}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          {isLogged ? (
            <>
              <HStack spacing={8} alignItems={"center"}>
                <Box>Logo</Box>
                <HStack
                  as={"nav"}
                  spacing={4}
                  display={{ base: "none", md: "flex" }}
                >
                  <Link
                    className="Link"
                    to="/HomePage"
                    onClick={() => {
                      dispatch(setToggleProf(false));
                    }}
                  >
                    Homepage
                  </Link>
                  <Link className="Link" to="/map">
                    map
                  </Link>
                  <Link
                    to={"/ProfilePage"}
                    onClick={() => {
                      dispatch(setToggleProf(true));
                      dispatch(setUser_id(userInfo?.id));
                      getUserByID(userInfo?.id);
                      getPostsByUser(userInfo?.id);
                    }}
                  >
                    Profile
                  </Link>
                  {userInfo?.role_id === 2 && <Link to={"/Admin"}>Admin</Link>}
                  <Link to={"/Shop"}>Shop</Link>
                
                </HStack>
              </HStack>
              <>


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
                    <p
                      onClick={() => {

                        navigate("/ProfilePage")
                        dispatch(setToggleProf(true));
                        dispatch(setUser_id(option?.id));
                        getUserByID(option?.id);
                        getPostsByUser(option?.id);

                        if (toggleProf === true) {
                          navigate("/ProfilePage");
                          dispatch(setToggleProf(true));
                          dispatch(setUser_id(option?.id));
                          getUserByID(option?.id), getPostsByUser(option?.id);
                        } else {
                          navigate("/ProfilePage");
                          dispatch(setToggleProf(true));
                          dispatch(setUser_id(option?.id));
                        }

                      }}
                    >
                      <Avatar
                        size={"sm"}
                        src={option.image}
                        style={{
                          height: "24px",
                          marginRight: "10px",
                          width: "24px",
                        }}
                      />
                      <p>{option.username}</p>
                    </p>
                  )}
                />

                <button className="logout" onClick={handleLogout}>
                  Logout
                </button>
              </>
            </>
          ) : (
            <>
              <Link className="Link" to="/register">
                Register
              </Link>
              <Link to="/">Login</Link>
            </>
          )}
        </Flex>
      </Box>
    </div>
  );
};

export default NavBar;
