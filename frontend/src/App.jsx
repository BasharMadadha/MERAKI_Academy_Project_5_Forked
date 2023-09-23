import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import { ChakraProvider } from "@chakra-ui/react";
import NavBar from "./components/Navbar/index";
import HomePage from "./components/HomePage";

function App() {
  return (
    <ChakraProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
