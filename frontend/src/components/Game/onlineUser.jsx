import React from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { SpinnerIcon, ArrowLeftIcon, WarningIcon } from "@chakra-ui/icons";
import { Box, Flex, Avatar, HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const socket = io("http://localhost:5001");

const GameNavbar = () => {
  const userId = useSelector((state) => state.auth.userId);

  const handleButtonClick = () => {
    console.log("work");
    socket.emit("user-login", userId);
    console.log(userId);
  };
  // const userId = useSelector((state) => state.auth.userId);
  // const online = useSelector((state) => state.auth.onlineUsers);
  // const isLogged = useSelector((state) => state.auth.isLogged);
  // const dispatch = useDispatch();
  // dispatch(setToggleProf(false));
  // const setUserH = async () => {
  //   try {
  //     const result = await axios.get("http://localhost:5000/users/getAllUser");
  //     if (result.data) {
  //       dispatch(setUsers(result.data));
  //     }
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // };

  // const getUserFriend = async () => {
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:5000/userFriends/${userId}`
  //     );

  //     if (response.status === 200) {
  //       dispatch(getUserFriends(response.data.userFriends));
  //     }
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };
  
  const getCards = async () => {
    await axios
      .get(`http://localhost:5000/card`)
      .then((res) => {
        dispatch(setCards(res.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };


  return (
    <div className="wrapper">
      <div className="menu">
        <HStack spacing={8} alignItems={"center"}>
          <Box>Logo</Box>
          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            <Link className="Link" to="/HomePage">
              Homepage
            </Link>
          </HStack>
        </HStack>
      </div>
    </div>
  );
};

export default GameNavbar;
