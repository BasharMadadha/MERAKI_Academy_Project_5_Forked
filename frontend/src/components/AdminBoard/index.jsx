import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Badge,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  Input,
  Box,
  GridItem,
  Grid,
  useColorModeValue,
  Container,
} from "@chakra-ui/react";
import axios from "axios";
import NavBar from "../Navbar";
const Admin = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const [formData, setFormData] = useState({
    userId: "",
    newRoleId: "",
    newCryptoAmount: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const data = async () => {
    try {
      const response = await axios.put("http://localhost:5000/beAdmin", {
        formData: formData,
      });
      return response;
    } catch (err) {
      console.log(err.message);
    }
  };
  if (userInfo && userInfo.role_id === 2) {
    return (
      <>
        <NavBar />
        <Box>
          <Container maxW="100%" marginTop={"70px"}>
            <Grid templateColumns={{ sm: "1fr", md: "1fr 1fr" }} gap={4}>
              <GridItem>
                <Stack
                  borderWidth="1px"
                  borderRadius="lg"
                  w={{ sm: "10px", md: "300px" }}
                  height={{ sm: "400px", md: "700px" }}
                  direction={{ base: "column", md: "row" }}
                  bg={useColorModeValue("white", "gray.900")}
                  boxShadow={"2xl"}
                  padding={4}
                >
                  <Image
                    objectFit="cover"
                    boxSize="100%"
                    src={userInfo.image}
                    alt="#"
                  />
                  <Text fontWeight={600} color={"black.500"} size="sm" mb={1}>
                    {userInfo.username}
                  </Text>
                </Stack>
              </GridItem>
              <GridItem colSpan={{ sm: 1, md: 1 }}>
                <Stack
                  borderWidth="1px"
                  borderRadius="lg"
                  w={{ sm: "100%", md: "300px" }}
                  minH={{ sm: "400px", md: "700px" }}
                  direction="column"
                  bg={useColorModeValue("white", "gray.900")}
                  boxShadow="2xl"
                  padding={4}
                >
                  <Input
                    type="number"
                    name="userId"
                    value={formData.userId}
                    onChange={handleInputChange}
                    placeholder="User ID"
                    size="md"
                    mb={2}
                  />
                  <Input
                    type="number"
                    name="newRoleId"
                    value={formData.newRoleId}
                    onChange={handleInputChange}
                    placeholder="New Role ID"
                    size="md"
                    mb={2}
                  />
                  <Input
                    type="number"
                    name="newCryptoAmount"
                    value={formData.newCryptoAmount}
                    onChange={handleInputChange}
                    placeholder="New Crypto Amount"
                    size="md"
                    mb={4}
                  />
                  <Button onClick={data} colorScheme="blue" size="md" w="100%">
                    Update User
                  </Button>
                </Stack>
              </GridItem>
            </Grid>
          </Container>
        </Box>
      </>
    );
  }
};

export default Admin;
