import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  Card,
  CardBody,
  CardFooter,
  Text,
  Image,
  Heading,
  Button,
  Stack,
  Divider,
  ButtonGroup,
  Input,
  Box,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import NavBar from "../Navbar";

const Shope = () => {
  const [cards, setCards] = useState([]);
  const [show, setShow] = useState(false);
  const [card, setCard] = useState({
    card_name: "",
    card_description: "",
    card_image: "",
    archetype: "",
    attack: "",
    card_prices: "",
  });

  const [users, setUsers] = useState([]);
  const user = useSelector((state) => state.auth.userInfo);
  const token = useSelector((state) => state.auth.token);
  
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const userShop = users?.find((user1) => user?.id === user1.id);

  useEffect(() => {
    getCards();
    setUser();
  }, []);

  const getCards = async () => {
    await axios
      .get(`http://localhost:5000/card`)
      .then((res) => {
        setCards(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const setUser = async () => {
    try {
      const result = await axios.get("http://localhost:5000/users/getAllUser");
      if (result.data) {
        setUsers(result.data);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <NavBar users={users}/>
      <h1>SHOPE</h1>
      <Box w="80%" p={4} color="black">
        {user?.role_id === 2 && (
          <Button
            variant="solid"
            colorScheme="blue"
            onClick={() => {
              setShow((prv) => !prv);
            }}
          >
            Add Cards
          </Button>
        )}
        {show && (
          <Stack spacing={3}>
            <Input
              variant="filled"
              placeholder="Card Name"
              value={card.card_name}
              onChange={(e) => {
                setCard({ ...card, card_name: e.target.value });
              }}
            />
            <Input
              variant="filled"
              placeholder="Card Desc"
              value={card.card_description}
              onChange={(e) => {
                setCard({ ...card, card_description: e.target.value });
              }}
            />
            <Input
              variant="filled"
              placeholder="Card Image"
              value={card.card_image}
              onChange={(e) => {
                setCard({ ...card, card_image: e.target.value });
              }}
            />
            <Input
              variant="filled"
              placeholder="Card Archetype"
              value={card.archetype}
              onChange={(e) => {
                setCard({ ...card, archetype: e.target.value });
              }}
            />
            <Input
              variant="filled"
              placeholder="Card Attack"
              value={card.attack}
              onChange={(e) => {
                setCard({ ...card, attack: e.target.value });
              }}
            />
            <Input
              variant="filled"
              placeholder="Card Prices"
              value={card.card_prices}
              onChange={(e) => {
                setCard({ ...card, card_prices: e.target.value });
              }}
            />
            <Button
              variant="solid"
              colorScheme="blue"
              onClick={() => {
                axios
                  .post("http://localhost:5000/card", {
                    card_name: card.card_name,
                    card_description: card.card_description,
                    card_image: card.card_image,
                    card_prices: card.card_prices,
                    archetype: card.archetype,
                    attack: card.attack,
                  })
                  .then((result) => {
                    setCard({
                      ...card,
                      card_name: "",
                      card_description: "",
                      card_image: "",
                      card_prices:"",
                      attack: "",
                      archetype: "",
                    });
                    <>
                      {Swal.fire({
                        position: "top",
                        icon: "success",
                        title: result.data.message,
                        showConfirmButton: false,
                        timer: 1500,
                      })}
                    </>;
                  })
                  .catch((error) => {
                    <>
                      {Swal.fire({
                        position: "top",
                        icon: "warning",
                        title: "Password Not Match",
                        showConfirmButton: false,
                        timer: 1500,
                      })}
                    </>;
                  });
              }}
            >
              Add Card
            </Button>
          </Stack>
        )}
      </Box>

      {cards.map((card) => {
        return (
          <div
            key={card.card_id}
            style={{ display: "-webkit-inline-flex", margin: "20px" }}
          >
            <Card maxW="sm">
              <CardBody>
                <Image
                  src={card.card_image}
                  alt={card.name}
                  borderRadius="lg"
                />
                <Stack mt="6" spacing="3">
                  <Heading size="md">{card.card_name}</Heading>
                  {/* <Text>
              {card.card_description}
              </Text> */}
                  <Text color="blue.600" fontSize="2xl">
                    {card.card_prices}
                  </Text>
                </Stack>
              </CardBody>
              <Divider />
              <CardFooter>
                <ButtonGroup spacing="2">
                  {userShop?.user_cards.find(
                    (card1) => card.card_id === card1.card_id
                  ) ? (
                    <Button variant="solid" colorScheme="red">
                      X
                    </Button>
                  ) : (
                    <Button
                      variant="solid"
                      colorScheme="blue"
                      onClick={() => {
                        axios
                          .post(
                            "http://localhost:5000/card/buy",
                            {
                              card_id: card.card_id,
                            },
                            config
                          )
                          .then((result) => {
                            setUser();
                            <>
                              {Swal.fire({
                                position: "top",
                                icon: "success",
                                title: result.data.message,
                                showConfirmButton: false,
                                timer: 1500,
                              })}
                            </>;
                          })
                          .catch((error) => {
                            <>
                              {Swal.fire({
                                position: "top",
                                icon: "warning",
                                title: error.message,
                                showConfirmButton: false,
                                timer: 1500,
                              })}
                            </>;
                          });
                      }}
                    >
                      Buy now
                    </Button>
                  )}
                </ButtonGroup>
              </CardFooter>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default Shope;
