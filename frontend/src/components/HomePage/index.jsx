import React from "react";
import AddPost from "../AddPost/index";
import Post from "../Post/index";
import Users from "../Friends/usres";
import {
  Box,
  Heading,
  Container,
  Divider,
  VStack,
  Flex,
} from "@chakra-ui/react";

const HomePage = () => {
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
          <Box flex={1} ml={4}>
            <Users />
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default HomePage;
