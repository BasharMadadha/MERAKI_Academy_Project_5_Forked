import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import { ChakraProvider } from "@chakra-ui/react";
import SideBar from "./components/SideBar/index";
import HomePage from "./components/HomePage";
import ProfilePage from "./components/PofilePage";
import EditePage from "./components/EditeProfile";
import Friends from "./components/Friends/index";
import Users from "./components/Friends/usres";
import Shop from "./components/Shop/index";
import Admin from "./components/AdminBoard/index";
import CardList from './components/Shop/card'

function App() {
  return (
    <ChakraProvider>
      <Routes>
        <Route path="/sidebar" element={<SideBar />} />
        <Route path="/" element={<Register />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ProfilePage" element={<ProfilePage />} />
        <Route path="/EditePage" element={<EditePage />} />
        <Route path="/Friends" element={<Friends />} />
        <Route path="/users" element={<Users />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/card"element={<CardList />} />
        </Routes>
    </ChakraProvider>
  );
}

export default App;
