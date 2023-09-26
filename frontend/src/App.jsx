import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import { ChakraProvider } from "@chakra-ui/react";
import NavBar from "./components/Navbar/index";
import SideBar from "./components/SideBar/index";
import HomePage from "./components/HomePage";
import ProfilePage from "./components/PofilePage";
import EditePage from "./components/EditeProfile";
import Friends from "./components/Friends";
function App() {
  return (
    <ChakraProvider>
      <NavBar />
      <Routes> 
        <Route path="/sidebar" element={< SideBar/>} />
        <Route path="/" element={<Register />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ProfilePage" element={<ProfilePage />} />
        <Route path="/EditePage" element={<EditePage />} />
        <Route path="/Friends" element={<Friends />} />
        </Routes>
    </ChakraProvider>
  );
}

export default App;
