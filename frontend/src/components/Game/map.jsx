import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import {
  Box,
  Heading,
  List,
  ListItem,
  Avatar,
  Text,
  VStack,
  Button,
  Input,
} from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";

const socket = io("http://localhost:5001");

const Map = () => {
  const online = useSelector((state) => state.auth.onlineUsers);
  const userId = useSelector((state) => state.auth.userId);
  const users = useSelector((state) => state.auth.users);
  const [roomIdInput, setRoomIdInput] = useState("");
  const [roomInvite, setRoomInvite] = useState("");
  const [selectedRoomId, setSelectedRoomId] = useState(""); // State to store the generated roomId
  const bgColor = useColorModeValue("gray.100", "gray.800");
  const textColor = useColorModeValue("black", "white");
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("room-invite", (selectedUserId, room) => {
      if (userId === selectedUserId) {
        setRoomInvite(true);
        setRoomIdInput(room);
        console.log("test for to ");
      }
    });
    socket.on("game-start", (connectedPlayers) => {
      console.log("players-ready to fight ",connectedPlayers);
      // setConnectedPlayers(connectedPlayers);
      console.log("test2312312312 ");
      navigate("/game");
    });
  
    return () => {
      socket.off("room-invite");
      socket.off("game-start");

    };
  }, [roomIdInput]);

  // Function to get user information by ID
  const getUserInfo = (userId) => {
    const user = users.find((user) => user.id === userId);
    return user;
  };

  const generateUniqueRoomId = () => {
    let roomId = "";
    for (let i = 0; i < 4; i++) {
      roomId += Math.floor(Math.random() * 10);
    } // here we generate code with 4 numbers
    return roomId;
  };

  const handleSelectUser = (selectedUserId) => {
    const roomId = generateUniqueRoomId();
    setSelectedRoomId(roomId);
    socket.emit("user-selected", { selectedUserId, roomId, userId });
    // navigate("/game");
  };

  const handleJoinRoom = async (room) => {
    try {
      socket.emit("player-join", roomIdInput, selectedRoomId, userId);
      // navigate("/game");
    } catch (err) {
      console.log(err.message);
    }
  };
  const otherOnlineUsers = online.filter((user) => user !== userId);

  return (
    <Box
      p={4}
      backgroundImage="url('https://cdn.vox-cdn.com/thumbor/C2by6pe1igejiwIDvhizLG5cOBI=/0x0:1775x931/2420x1613/filters:focal(746x324:1030x608)/cdn.vox-cdn.com/uploads/chorus_image/image/60472511/chrome_2018_07_24_11_40_50.0.jpg')" // Replace with the actual path to your background image
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      backgroundPosition="center"
      minHeight="100vh"
      backgroundColor={bgColor}
      color={textColor}
    >
      <List>
        {otherOnlineUsers?.map((selectedUserId) => {
          const user = getUserInfo(selectedUserId);
          return (
            <ListItem
              key={selectedUserId}
              display="flex"
              alignItems="center"
              mb={2}
              borderRadius="md"
              color="black"
              backgroundColor="white"
              boxSize="140px"
            >
              <Avatar src={user?.image} alt={user?.username} mr={2} />
              <VStack align="start">
                <Text fontWeight="bold">{user?.username}</Text>
                {selectedUserId !== userId && (
                  <Button
                    onClick={() => handleSelectUser(selectedUserId)}
                    colorScheme="teal"
                    size="sm"
                  >
                    Select
                  </Button>
                )}
              </VStack>
            </ListItem>
          );
        })}
      </List>

      {roomInvite && (
        <Box mt={4}>
          <Button onClick={handleJoinRoom}>Join Room</Button>
          <Text fontWeight="bold">Room Invitation:</Text>
          {/* <Text>{roomInvite}</Text> */}
          {/* <Input
            type="text"
            placeholder="Enter Room ID"
            value={roomIdInput}
            onChange={(e) => setRoomIdInput(e.target.value)}
            size="lg"
            variant="filled"
            mt={4}
          /> */}
        </Box>
      )}
    </Box>
  );
};

export default Map;
