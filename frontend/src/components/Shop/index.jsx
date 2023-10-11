import React, { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
import Swal from "sweetalert2";
import video from "../../assets/videoB.webm";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
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
  Img,
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

  const slides = [
    {
      url: "https://res.cloudinary.com/dv7ygzpv8/image/upload/v1697058244/runeterra-ionia-01_hkfdnl.jpg",
      name: "IONIA",
      title:
        "Surrounded by treacherous seas, Ionia is composed of a number of allied provinces scattered across a massive archipelago",
      image: "https://universe.leagueoflegends.com/images/iona_crest_icon.png",
    },
    {
      url: "https://res.cloudinary.com/dv7ygzpv8/image/upload/v1697058405/runeterra-noxus-05_ronnnp.jpg",
      name: "NOXUS",
      title:
        "oxus is a powerful empire with a fearsome reputation. To those beyond its borders,",
      image: "https://universe.leagueoflegends.com/images/noxus_crest_icon.png",
    },
    {
      url: "https://res.cloudinary.com/dv7ygzpv8/image/upload/v1697058471/runeterra-piltover-04_o2ia9i.jpg",
      name: "PILTOVER",
      title:
        "Piltover is a thriving, progressive city whose power and influence is on the rise.",
      image:
        "https://universe.leagueoflegends.com/images/piltover_crest_icon.png",
    },

    {
      url: "https://res.cloudinary.com/dv7ygzpv8/image/upload/v1697058527/runeterra-demacia-01_ftmisb.jpg",
      name: "DEMACIA",
      title: "Astrong, lawful kingdom with a prestigious military history.",
      image:
        "https://universe.leagueoflegends.com/images/demacia_crest_icon.png",
    },
    {
      url: "https://res.cloudinary.com/dv7ygzpv8/image/upload/v1697058605/runeterra-freljord-02_nshcon.jpg",
      name: "FRELJORD",
      title:
        "The Freljord is a harsh and unforgiving place—where the people are born warriors.",
      image:
        "https://universe.leagueoflegends.com/images/freljord_crest_icon.png",
    },
    {
      url: " https://res.cloudinary.com/dv7ygzpv8/image/upload/v1697058680/runeterra-shadowisles-02_exbws1.jpg",
      name: "SHADOWISLES",
      title:
        "This cursed land was once home to a noble, enlightened civilization.",
      image:
        "https://universe.leagueoflegends.com/images/shadow_isles_crest_icon.png",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };
  return (
    <div className="shopC">
      <div className="overlay">
        <video className="video" src={video} autoPlay loop muted></video>
        <NavBar />
        <div className="slider-container">
          <div
            style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
            className="slider-image"
          >
            <img className="iconImg" src={slides[currentIndex].image} />
            <p className="pName">{slides[currentIndex].name}</p>
            <p className="pTitle">{slides[currentIndex].title}</p>
          </div>
          <div className="slider-arrow left">
            <BsChevronCompactLeft onClick={prevSlide} size={30} />
          </div>
          <div className="slider-arrow right">
            <BsChevronCompactRight onClick={nextSlide} size={30} />
          </div>
          <div className="slider-dots">
            {slides.map((slide, slideIndex) => (
              <div
                key={slideIndex}
                onClick={() => goToSlide(slideIndex)}
                className={slideIndex === currentIndex ?"currentIndex":"slider-number"}
              >
                {slideIndex + 1}
              </div>
            ))}
          </div>
        </div>
        {/* <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh" // You can adjust the height as needed
          position="absolute"
          top="0"
          left="60%"
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
        </Box> */}
      </div>
    </div>
  );
};

export default Shope;
