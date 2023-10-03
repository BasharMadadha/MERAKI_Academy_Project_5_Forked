import React, { useState, useEffect } from "react";
import { Box, Image } from '@chakra-ui/react';
import io from "socket.io-client";
const socket = io("http://localhost:5001");

const Game = () => {
 const [connectedPlayers, setConnectedPlayers] = useState(false);


 useEffect(() => {
  socket.on("game-start", (connectedPlayers) => {
    console.log("players-ready to fight ",connectedPlayers);
    setConnectedPlayers(connectedPlayers);
    console.log("test for to ");
  });

  return () => {
    socket.off("game-start");
  };
}, [connectedPlayers]);
  return (
    <Box>
    {connectedPlayers ? (

    <div>wait </div>
    ) : (
      <Image
        src="https://c4.wallpaperflare.com/wallpaper/734/871/790/yu-gi-oh-trading-card-games-hd-wallpaper-preview.jpg"
        alt="Image Alt Text"
      />
    )}
  </Box>
  );
};

export default Game;
