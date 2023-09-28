import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setLogin,
  setUserId,
  setEmail,
  setPassword,
  setUserInfo,
} from "../redux/authSlicer/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  Text,
  Link,
} from "@chakra-ui/react";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const emailFromStore = useSelector((state) => state.auth.email);
  const passwordFromStore = useSelector((state) => state.auth.password);
  const isLogged = useSelector((state) => state.auth.isLogged);
  console.log("123", isLogged);
  const [email, setEmailState] = useState(emailFromStore);
  const [password, setPasswordState] = useState(passwordFromStore);

  const login = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:5000/users/login", {
        email,
        password,
      });
      // console.log("result", result);
      if (result.data && result.data.token) {
        console.log(result);
        dispatch(setLogin(result.data.token));
        dispatch(setUserId(result.data.userId));
        dispatch(setUserInfo(result.data.user));
        navigate("/Homepage");
        setUser();
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      console.error("Login error:", error.message);
    }
  };


  const handleEmailChange = (e) => {
    setEmailState(e.target.value);
    dispatch(setEmail(e.target.value));
  };

  const handlePasswordChange = (e) => {
    setPasswordState(e.target.value);
    dispatch(setPassword(e.target.value));
  };

  return (
    <Flex
      minHeight="100vh"
      alignItems="center"
      justifyContent="center"
      backgroundColor="gray.50"
      p={4}
    >
      <Box maxW="md" w="full" bg="white" rounded="lg" boxShadow="lg" p={8}>
        <Heading fontSize="3xl" textAlign="center">
          Log in to your account
        </Heading>
        <form onSubmit={login}>
          <FormControl mt={6}>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={handleEmailChange}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
          </FormControl>
          <Button
            mt={6}
            colorScheme="blue"
            size="lg"
            type="submit"
            width="100%"
          >
            Log in
          </Button>
        </form>
        {isLogged === true ? (
          <Text mt={4} textAlign="center">
            Welcome to the Dashboard
          </Text>
        ) : (
          <Text mt={4} textAlign="center">
            You are not authenticated. Please{" "}
            <Link color="blue.500" href="/register">
              Sign Up
            </Link>
          </Text>
        )}
      </Box>
    </Flex>
  );
};

export default Login;
