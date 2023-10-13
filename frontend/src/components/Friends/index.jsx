import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserFriends } from "../redux/frinedSlicer/friends";
import axios from "axios";
import {
  Heading,
  Avatar,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { Box,UnorderedList, ListItem } from "@chakra-ui/react";

import "./style.css";

const Friends = () => {
  const dispatch = useDispatch();
  const friends = useSelector((state) => state.friends.friends);
  const userId = useSelector((state) => state.auth.userId);
  const [pendingRequests, setPendingRequests] = useState([]);
  const users = useSelector((state) => state.auth.users);

  useEffect(() => {
    friendsRequest();
    console.log(users);
    // console.log("req", pendingRequests);
  }, [userId]);

  useEffect(() => {
    getUserFriend();
    // console.log("friend", friends);
  }, [dispatch, userId]);

  const getUserFriend = async () => {
    try {
      // console.log("Before axios request");
      const response = await axios.get(
        `http://localhost:5000/userFriends/${userId}`
      );
      // console.log("After axios request", response.data.userFriends);
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
      // console.log("req1", response);
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

    <div>
      {/*  friend list */}

      <div className="frienddiv">
      <p className="p">friends</p>
        <Center>
         
          <Box className="inside">
            {friends.map((friend) => (
              <Box key={friend.friend_id}>   
                <Flex>
                  <Avatar src={friend.friend_image} className="img"/>
                </Flex>
                <Box>
                  <Stack>
                    <Heading className="name">
                      {friend.friend_username}
                    </Heading>
                  </Stack>
                  <Button onClick={() => removeFriend(friend.friend_id)} className="removefrind">Remove</Button>
                </Box>
              </Box> 
            ))}
          </Box>
        </Center>
      </div>
      {/* friend list */}

      <UnorderedList listStyleType="none">
      <p className="p2">friend request</p>
    {pendingRequests.map((request) => (
      <ListItem key={request.id} borderBottom="1px solid #ccc" py={3} display="flex" alignItems="center" className="test">
        <Box marginRight="20px">
          <Image src={request.image} alt="image" boxSize="50px" borderRadius="50%" />
        </Box>
        <Text flex="1">{request.username}</Text>
        <Button
          className="reqbtn"
          colorScheme="blue"
          marginRight="5px"
          onClick={() => acceptFriendRequest(request.user_id)}
        >
          Accept
        </Button>
        <Button
          className="reqbtn"
          colorScheme="red"
          onClick={() => removeFriend(request.user_id)}
        >
          Remove
        </Button>
      </ListItem>
    ))}
  </UnorderedList>
    </div>
  );
};

export default Friends;
