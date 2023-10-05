import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Navbar from "../Navbar/index";

const CardList = () => {
  const users = useSelector((state) => state.auth.users);
  const user = useSelector((state) => state.auth.userInfo);
  const [cards, setCards] = useState([]);

  const userCard = users?.find((user1) => user?.id === user1.id);
  const userCards = userCard.user_cards;

  useEffect(() => {
    getCards();
  }, []);

  const getCards = async () => {
    await axios
      .get("http://localhost:5000/card")
      .then((res) => {
        setCards(res.data);
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
        <ul>
          {cards?.map(
            (card) =>
              userCards?.find((card1) => card.card_id === card1.card_id) && (
                <li key={card.card_id}>
                  <div>
                    <img src={card.card_image} alt={card.card_name} />
                  </div>
                  <div>
                    <h3>{card.card_name}</h3>
                    <p>{card.card_description}</p>
                    <p>Attack: {card.attack}</p>
                    <p>Archetype: {card.archetype}</p>
                    <p>Price: {card.card_prices}</p>
                  </div>
                </li>
              )
          )}
        </ul>
      </div>
    </div>
  );
};

export default CardList;