
import React, { useEffect } from "react";
import AddPost from "../AddPost/index";
import Post from "../Post/index";
import Users from "../Friends/usres";
import axios from "axios";
import {
  Box,
  Heading,
  Container,
  Divider,
  VStack,
  Flex,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { setToggleProf, setUsers } from "../redux/authSlicer/auth";
const HomePage = () => {
  
  const dispatch = useDispatch();
  dispatch(setToggleProf(false));

  const setUser = async () => {
    try {
      const result = await axios.get("http://localhost:5000/users/getAllUser");
      if (result.data) {
        dispatch(setUsers(result.data));
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    setUser();
  }, []);
  return (
    <Box p={4}>
      <Heading as="h1" mb={4}>
        Home Page
      </Heading>
      <Container maxW="100%">
        <Flex>
          <Box flex={1}>
            <AddPost />
          </Box>
          <Box flex={2} ml={4}>
            <Post />
          </Box>
          <Box flex={3} ml={4}>
            <Users />
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default HomePage;
