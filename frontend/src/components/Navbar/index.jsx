import React, { useEffect, useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogout, setUser_id, setToggleProf } from "../redux/authSlicer/auth";
import { setUsersSearch } from "../redux/navSlicer/nav";
import { useNavigate } from "react-router-dom";
import { Typeahead, withAsync } from "react-bootstrap-typeahead";
// import SideBar from "../SideBar";
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
import { TbMoneybag } from "react-icons/Tb";
import { HiOutlineBell } from "react-icons/Hi";

import axios from "axios";
const AsyncTypeahead = withAsync(Typeahead);

const NavBar = ({users}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogged = useSelector((state) => state.auth.isLogged);
  const userInfo = useSelector((state) => state.auth.userInfo);
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
    console.log(option);
  };

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
    return state.nav;
  });
  const filterBy = (option, props) => {
    return option.username.toLowerCase().includes(props.text.toLowerCase());
  };

  return (
    <div className="nav">
      {/* <SideBar /> */}
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4} width={"100%"}>
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
                  <Link className="Link" to="/HomePage">
                    Homepage
                  </Link>
                  <Link
                    to={"/ProfilePage"}
                    onClick={() => {
                      dispatch(setToggleProf(true));
                      dispatch(setUser_id(userInfo?.id));
                    }}
                  >
                    Profile
                  </Link>
                  {userInfo?.role_id === 2 && <Link to={"/Admin"}>Admin</Link>}
                  <Link to={"/Shop"}>Shop</Link>
                  <span>
                    <TbMoneybag
                      onClick={() => {
                        navigate("/Shop");
                      }}
                    />
                    &nbsp;{userNav?.crypto_amount||userNav1?.crypto_amount}
                  </span>
                </HStack>
              </HStack>
              <>
                <ul className="navUl">
                  <li>
                    <HiOutlineBell
                      onClick={() => {
                        alert("notification");
                      }}
                    />
                  </li>
                </ul>

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
                    <Link
                      to="/ProfilePage"
                      onClick={() => {
                        dispatch(setToggleProf(true));
                        dispatch(setUser_id(option.id));
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
                    </Link>
                  )}
                />

                <button className="logout" onClick={handleLogout}>
                  Logout
                </button>
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
        </Flex>
      </Box>
    </div>
  );
};

export default NavBar;
