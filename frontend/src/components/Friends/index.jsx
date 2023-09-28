import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserFriends } from "../redux/frinedSlicer/friends";
import axios from "axios";

import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import "./style.css";

const Friends = () => {
  const dispatch = useDispatch();
  const friends = useSelector((state) => state.friends.friends);
  const userId = useSelector((state) => state.auth.userId);
  const [pendingRequests, setPendingRequests] = useState([]);
  useEffect(() => {
    friendsRequest();
    console.log("req", pendingRequests);
  }, [userId]);

  useEffect(() => {
    getUserFriend();
    console.log("friend", friends);
  }, [dispatch, userId]);

  const getUserFriend = async () => {
    try {
      console.log("Before axios request");

      const response = await axios.get(
        `http://localhost:5000/userFriends/${userId}`
      );
      console.log("After axios request", response.data.userFriends);

      if (response.status === 200) {
        dispatch(getUserFriends(response.data.userFriends));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const friendsRequest = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/userRequest/${userId}`
      );
      console.log("req1", response);
      if (response.status === 200) {
        setPendingRequests(response.data.requests);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const removeFriend = async (friendId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/deleteFriends?friendId=${friendId}&userId=${userId}`
      );
      if (response.data.success) {
        console.log(response);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const acceptFriendRequest = async (reqsFrom) => {
    try {
      const reqsTo = userId;
      const response = await axios.put(
        "http://localhost:5000/updateFriendRequest",
        {
          reqsFrom: reqsFrom,
          reqsTo: reqsTo,
          status: "friend",
        }
      );
      if (response.data.success) {
        setPendingRequests((prevRequests) =>
          prevRequests.filter((request) => request.id !== reqsTo)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="firendpage">
      <div className="">
        <h1>firend</h1>
        <Center py={6}>
          <Box
            maxW={"270px"}
            w={"full"}
            bg={useColorModeValue("white", "gray.800")}
            boxShadow={"2xl"}
            rounded={"md"}
            overflow={"hidden"}
           
          >
            {friends.map((friend) => (
              
              <Box 
              key={friend.friend_id}
              mt={"50px"}
              >
                
                <Flex justify={"center"} mt={-12}>
                  <Avatar
                    size={"xl"}
                    src={friend.friend_image}
                    css={{
                      border: "2px solid white",
                    }}
                  />
                </Flex>
                <Box p={6}>
                  <Stack spacing={0} align={"center"} mb={5}>
                    <Heading
                      fontSize={"2xl"}
                      fontWeight={500}
                      fontFamily={"body"}
                    >
                      {friend.friend_username}
                    </Heading>
                  </Stack>
                  <Button
                    w={"full"}
                    mt={8}
                    bg={useColorModeValue("#151f21", "gray.900")}
                    color={"white"}
                    rounded={"md"}
                    _hover={{
                      transform: "translateY(-2px)",
                      boxShadow: "lg",
                    }}
                    onClick={() => removeFriend(friend.friend_id)}
                  >
                    Remove
                  </Button>
                </Box>
                
              </Box>
              
            ))}
          </Box>
        </Center>
      </div>
      <ul className="request">
        {pendingRequests.map((request) => (
          <li key={request.id}>
            <p> {request.username}</p>
            <img src={request.image} alt={"image"} />

            <button
              className="reqbtn"
              onClick={() => acceptFriendRequest(request.user_id)}
            >
              Accept
            </button>
            <button
              className="reqbtn"
              onClick={() => removeFriend(request.user_id)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Friends;
