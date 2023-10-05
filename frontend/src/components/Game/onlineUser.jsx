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
