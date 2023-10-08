import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Navbar/index";
import { UnorderedList, ListItem } from "@chakra-ui/react";
import { Grid, GridItem, Image, Box } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";

const CardList = () => {
  const users = useSelector((state) => state.auth.users);
  const user = useSelector((state) => state.auth.userInfo);
  const [cards, setCards] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getCards();
    
  }, []);

  useEffect(() => {
    console.log(cards); // Log the cards state after it has been updated
  }, [cards]); // Listen to changes in the cards state

  const getCard = async () => {
    try {
      const response = await axios.get(
        "https://db.ygoprodeck.com/api/v7/cardinfo.php?format=Speed%20Duel"
      );
      console.log(response.data);
      if (response.data) {
        const filteredCards = response.data.data.filter(
          (card) => card.frameType !== "spell" && card.frameType !== "trap"
        );
        setCards(filteredCards);
      } else {
        console.log("err");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
   const getCards = async () => {
    await axios
      .get(`http://localhost:5000/card`)
      .then((res) => {
        dispatch(setCards(res.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Navbar />
      <div style={{ marginTop: "70px" }}>
        <h1>My Cards</h1>
        <Grid templateColumns="repeat(3, 1fr)" gap={4}>
          {cards?.map((card) => (
            <GridItem key={card.card_id}>
              <Box>
                <Image src={card.card_image} alt={card.card_name} />
              </Box>
            </GridItem>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default CardList;
