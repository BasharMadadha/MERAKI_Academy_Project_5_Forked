import React, { useState, useEffect } from "react";
import { Box, Image, Center, Grid, Text, Flex } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import GameNavbar from "./onlineUser";

import io from "socket.io-client";
const socket = io("http://localhost:5001");
import NavBar from "../Navbar";
import { useSelector } from "react-redux";

const Game = () => {
  const [isReady, setIsReady] = useState(false);
  const [playerHand, setPlayerHand] = useState([]);
  const [currentRound, setCurrentRound] = useState(1);
  const [selectedCards, setSelectedCards] = useState([]);
  const [clickedCards, setClickedCards] = useState([]);
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [soketId1, setSocletId1] = useState("");
  const [soketId2, setSocletId2] = useState("");
  const [enamyCard, setEnamyCard] = useState([]);
  const [isCardSelectionAllowed, setIsCardSelectionAllowed] = useState(true);

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isRoundEnded, setIsRoundEnded] = useState(true);
  const userId = useSelector((state) => state.auth.userId);
  const users = useSelector((state) => state.auth.users);
  const cards = useSelector((state) => state.cards.cards);
  const userInfo = users.find((user) => user.id === userId) || {};

  const userCardIds = userInfo.user_cards
    ? userInfo.user_cards.map((userCard) => userCard.card_id)
    : [];

  const UserCards = cards?.filter((card) => userCardIds.includes(card.card_id));

  const toggleReady = () => {
    if (!isButtonDisabled) {
      setIsReady(!isReady);
      setIsButtonDisabled(true);
      socket.emit("player-ready", userId);
    }
  };
  const toggleReady2 = () => {
    if (isRoundEnded) {
      setCurrentRound(currentRound + 1);
      setIsRoundEnded(false);
      console.log("test");
      if (soketId1) {
        socket.emit("next-round", soketId1);
        console.log("next-round", soketId1);
      }
      if (soketId2) {
        socket.emit("next-round", soketId2);
        console.log("next-round", soketId2);
      }
    }
  };

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };
  const getRandomCardNotInHand = () => {
    let randomCard;
    do {
      const randomIndex = Math.floor(Math.random() * UserCards.length);
      randomCard = UserCards[randomIndex];
    } while (playerHand.includes(randomCard));
    playerHand.push(randomCard);
    return randomCard;
  };
  const randomIndex = Math.floor(Math.random() * UserCards.length);
  const randomNumber = UserCards[randomIndex];

  useEffect(() => {
    console.log("s1", soketId1);
    console.log("s2", soketId2);
    console.log(enamyCard);
    socket.on("game_started", (socket_id) => {
      console.log("Game has started!");
      const shuffledUserCards = shuffleArray(UserCards);
      const initialHand = shuffledUserCards.slice(0, 5);
      setPlayerHand(initialHand);
     
    });
    socket.on("you-one", (data) => {
      setSocletId1(data);
      setPlayer1(userId);
      console.log("You are player 1");
      if (userId === player1 && currentRound === 1) {
        setPlayerHand([...playerHand, getRandomCardNotInHand()]);
      }
    });
    socket.on("you-two", (data) => {
      setSocletId2(data);
      setPlayer2(userId);
      console.log("You are player 2");
    });
    socket.on("card-selected1", (card) => {
      setEnamyCard([...enamyCard, card]);
      console.log(card, "from enamy");
      console.log(enamyCard);
    });
    socket.on("card-selected2", (card) => {
      setEnamyCard([...enamyCard, card]);
      console.log(card, "from enamy");

      console.log(enamyCard);
    });
    socket.on("new-round", (card) => {
      console.log("it is true? ", card);

      setIsCardSelectionAllowed(card);
      setIsRoundEnded(card);
      setPlayerHand([...playerHand, getRandomCardNotInHand()]);
      setCurrentRound(currentRound + 1);
    });

    return () => {
      socket.off("game-started");
      socket.off("receive-cards");
    };
  }, [currentRound, isRoundEnded, enamyCard]);
  const removeCardFromHand = (cardToRemove) => {
    setPlayerHand((prevHand) =>
      prevHand.filter((card) => card !== cardToRemove)
    );
  };
  const handleCardSelect = (card) => {
    if (isCardSelectionAllowed) {
      if (player1 === userId && currentRound % 2 === 1) {
        if (!clickedCards.includes(card)) {
          setClickedCards([card]);
          setSelectedCards([...selectedCards, card]);
          removeCardFromHand(card);
          setIsCardSelectionAllowed(false);
          console.log("Selected Card:", card);
          socket.emit("select-card1", card, soketId1);
        }
      } else if (player2 === userId && currentRound % 2 === 0) {
        if (!clickedCards.includes(card)) {
          setClickedCards([card]);
          setSelectedCards([...selectedCards, card]);
          removeCardFromHand(card);
          setIsCardSelectionAllowed(false);
          socket.emit("select-card2", card);
          console.log("Selected Card:", card, soketId2);
        }
      }
    }
  };
  const selectedCardsForAttacks = (card) => {
    
  };
  return (
    <Box>
      <GameNavbar />

      <Center h="100vh" flexDirection="column" alignItems="center">
        <Image
          src="http://res.cloudinary.com/dv7ygzpv8/image/upload/v1696379431/qpavqpkecmeisxfpnsjr.png"
          alt="Image Alt Text"
          mb={4}
        />
        <Grid
          templateColumns={`repeat(auto-fill, minmax(px, 1fr))`}
          gap={2}
          css={{ gridAutoFlow: "column" }}
        >
          {enamyCard?.map((card) => (
            <Box
              key={card.card_id}
              onClick={() => selectedCardsForAttacks(card)}
            >
              <Image
                src={card.card_image}
                alt={card.card_name}
                maxW="100px"
                maxH="100px"
              />
              <Text fontSize="lg" fontWeight="bold" mt={2}>
                {card.attack}
              </Text>
            </Box>
          ))}
        </Grid>
        <Grid
          templateColumns={`repeat(auto-fill, minmax(px, 1fr))`}
          gap={2}
          css={{ gridAutoFlow: "column" }}
        >
          {selectedCards?.map((card) => (
            <Box
              key={card.card_id}
              onClick={() => selectedCardsForAttacks(card)}
            >
              <Image
                src={card.card_image}
                alt={card.card_name}
                maxW="100px"
                maxH="100px"
              />
              <Text fontSize="lg" fontWeight="bold" mt={2}>
                {card.attack}
              </Text>
            </Box>
          ))}
        </Grid>
        <Text fontWeight="bold">Current Round: {currentRound}</Text>
        <Flex flexDirection="column" alignItems="center" mt={4}>
          <Grid
            templateColumns={`repeat(auto-fill, minmax(px, 1fr))`}
            gap={2}
            css={{ gridAutoFlow: "column" }}
          >
            {playerHand?.map((card) => (
              <Box
                key={card.card_id}
                onClick={() => handleCardSelect(card)}
                style={{
                  cursor: clickedCards.includes(card)
                    ? "not-allowed"
                    : "pointer",
                  opacity: clickedCards.includes(card) ? 0.5 : 1,
                  border: selectedCards.includes(card)
                    ? "2px solid red"
                    : "none",
                }}
              >
                <Image
                  src={card.card_image}
                  alt={card.card_name}
                  maxW="100px"
                  maxH="100px"
                />
                <Text fontSize="lg" fontWeight="bold" mt={2}>
                  {card.attack}
                </Text>
              </Box>
            ))}
          </Grid>
          <Button mt={4} onClick={toggleReady}>
            {"Ready"}
          </Button>
          {((player1 === userId && currentRound % 2 === 1) ||
            (player2 === userId && currentRound % 2 === 0)) && (
            <Button mt={4} onClick={toggleReady2}>
              {"End Round"}
            </Button>
          )}
        </Flex>
      </Center>
    </Box>
  );
};

export default Game;
