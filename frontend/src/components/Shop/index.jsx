import React, { useEffect, useState } from "react";
import "./style.css";
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
import { useSelector, useDispatch } from "react-redux";
import { setCards } from "../redux/cardSlicer/card";
import NavBar from "../Navbar";
import { useNavigate } from "react-router-dom";

const Shope = () => {
  const dispatch = useDispatch();
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
  const cards = useSelector((state) => state.cards.cards);
  const user = useSelector((state) => state.auth.userInfo);
  const userId = useSelector((state) => state.auth.userId);

  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

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
        dispatch(setCards(res.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const buyCommenCard = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/card/getRandomCards",
        {
          lootPrice: 500,
          userId,
        }
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
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
  console.log(users);
  return (
    <div className="shopC">
      <div className="overlay"></div>

      <video  className="video" src={video} autoPlay loop muted />

      <NavBar />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh" // You can adjust the height as needed
        position="absolute"
        top="0"
        left="10%"
      >
        <Card
          overflow="hidden"
          variant="outline"
          maxW="800px" // Adjust the max width as needed
          marginRight="20px"
        >
          <Image
            objectFit="cover"
            maxW={{ base: "100%", sm: "200px" }}
            src="http://res.cloudinary.com/dv7ygzpv8/image/upload/v1696741224/dr9kfazuluihrft4zb1f.png"
          />
          <Stack>
            <CardBody>
              <Heading size="md">commen cards</Heading>
            </CardBody>
            <CardFooter>
              <Button
                onClick={() => buyCommenCard()}
                variant="solid"
                colorScheme="blue"
              >
                Buy "500"
              </Button>
            </CardFooter>
          </Stack>
        </Card>

        <Card
          overflow="hidden"
          variant="outline"
          maxW="800px" // Adjust the max width as needed
        >
          <Image
            objectFit="cover"
            maxW={{ base: "100%", sm: "200px" }}
            src="http://res.cloudinary.com/dv7ygzpv8/image/upload/v1696741224/dr9kfazuluihrft4zb1f.png"
          />
          <Stack>
            <CardBody>
              <Heading size="md">YAMI cards</Heading>
            </CardBody>
            <CardFooter>
              <Button
                onClick={() => buyCommenCard()}
                variant="solid"
                colorScheme="blue"
              >
                Buy "500"
              </Button>
            </CardFooter>
          </Stack>
        </Card>
      </Box>
    </div>
  );
};

export default Shope;
