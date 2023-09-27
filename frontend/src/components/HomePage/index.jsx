
import React, { useEffect } from "react";
import AddPost from "../AddPost/index";
import Post from "../Post/index";
import Users from "../Friends/usres";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  Box,
  Heading,
  Container,
  GridItem,
  Grid
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { setToggleProf, setUsers } from "../redux/authSlicer/auth";
const HomePage = () => {
  const userId = useSelector((state) => state.auth.userId);

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
      <GridItem colSpan={1} >
            <AddPost />
          </GridItem>
      <Container maxW="100%">
        <Grid
          h="200px"
          templateRows="repeat(2, 1fr)"
          templateColumns="repeat(5, 1fr)"
          gap={4}
        >
          <GridItem rowSpan={2} colSpan={1}>
            <Users userId={userId} />
          </GridItem>
          <GridItem colSpan={4} >
            <Post />
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};

export default HomePage;
