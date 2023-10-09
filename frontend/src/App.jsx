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
import CardList from "./components/Shop/card";
import Map from "./components/Game/map";
import Game from "./components/Game/game";
import GameNavbar from "./components/Game/onlineUser";
import Notification from "./components/notificationx/index"
import NavBar from "./components/Navbar/index"
import FrontPage from './components/Front Page/index'
function App() {
  return (
    <ChakraProvider>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sidebar" element={<SideBar />} />
        <Route path="/register" element={<Register />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/ProfilePage" element={<ProfilePage />} />
        <Route path="/EditePage" element={<EditePage />} />
        <Route path="/Friends" element={<Friends />} />
        <Route path="/users" element={<Users />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/card" element={<CardList />} />
        <Route path="/map" element={<Map />} />
        <Route path="/game" element={<Game />} />
        <Route path="/GameNavbar" element={<GameNavbar />} />
        <Route path="/Notification" element={<Notification />} />
        <Route path="/NavBar" element={<NavBar />} />
        <Route path="/FrontPage" element={<FrontPage />} />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
