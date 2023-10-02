import React, { useEffect, useState } from "react";
import axios from "axios";

const Shope = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    axios
      .get("https://db.ygoprodeck.com/api/v7/cardinfo.php?archetype=Blue-Eyes")
      .then((response) => {
        const filteredCards = response.data.data.filter(
          (card) => card.type !== "Spell Card" && card.type !== "Trap Card"
        );
        setCards(filteredCards);
      })
      .catch((error) => {
        console.log(error);
      });
    
  }, []);

  return (
    
    <div>
      <h1>SHOPE</h1>
      {cards.map((card) => {
        return (
          
          <div key={card.id}>
            <img src={card.card_images[0].image_url} alt={card.name} />
            <h2>{console.log(card)}</h2>
          </div>
        );
      })}
    </div>
  )
};

export default Shope;
