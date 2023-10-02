import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCards } from "../redux/cardSlicer/card";
import axios from "axios";

const CardList = () => {
  const dispatch = useDispatch();
  const cards= useSelector((state) => state.cards.cards);

  useEffect(()=>{
    getCards()
    console.log(cards);
  },[])
  const getCards = async () => {
    try {
      const result = await axios.get("http://localhost:5000/getcard");
      if (result.data) {
        console.log(result.data);
        dispatch(setCards(result.data));
      }
    } catch (error) {
      console.error(error.message);
    }
  };
 

  return (
    <div>
      <h1>All Cards</h1>
      <ul>
        {cards?.map((card) => (
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
        ))}
      </ul>
    </div>
  );
};

export default CardList;