import React, { useEffect, useState } from "react";
import NavBar from "../Navbar/index";
import { useNavigate } from "react-router-dom";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  AbsoluteCenter,
} from "@chakra-ui/react";
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
const loot = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="shopC">
      <div className="overlay">
        <video
          className="video"
          src="https://res.cloudinary.com/dv7ygzpv8/video/upload/v1697065075/videoB_zoubn9.webm"
          autoPlay
          loop
          muted
        ></video>
        <NavBar />
        <div className={`subNav ${scrolled ? "scrolled" : ""}`}>
          <button className="btnSub" onClick={() => navigate("/shop")}>
            FEATURED
          </button>
          <button className="btnSub" onClick={() => navigate("/cards")}>
            CARDS
          </button>
          <button className="btnSub" onClick={() => navigate("/shop/loot")}>
            LOOT
          </button>
          <button className="btnSub">ACCESSORIES</button>
        </div>
        <Box position="relative" top="20%">
          <Divider w="80%" m="0"/>
          <AbsoluteCenter bg="#c49250" px="5" py="1" left="10%">
            MASTERWORK CHESTS
          </AbsoluteCenter>
        </Box>
        <div
          className="slider-container1"
          style={{ gridTemplateColumns: "repeat(4, 1fr)" ,position:"relative",top:"16%"}}
        >
          <div
            className="slider-small"
            style={{ width: "300px", height: "250px" }}
          >
            <div
              style={{
                backgroundImage: `url(https://res.cloudinary.com/dv7ygzpv8/image/upload/v1697099697/ionia-frame-35_zyzxbj.jpg)`,
              }}
              className="slider-image"
              onClick={onOpen}
            >
              <p className="pName1">Ionia Cards</p>
              <img
                className="iconImg1"
                src="https://res.cloudinary.com/dv7ygzpv8/image/upload/e_background_removal/f_png/v1697103856/edfcb052357e8600e18d06f501f6be186d8c_1232xr706_Q100_pg18ht_-_Logo_xqyve4.png"
              />
              <span className="price">500</span>
            </div>
          </div>
          <div
            className="slider-small"
            style={{ width: "300px", height: "250px" }}
          >
            <div
              style={{
                backgroundImage: `url(https://res.cloudinary.com/dv7ygzpv8/image/upload/v1697100386/frel-lor-6_gquck6.jpg)`,
              }}
              className="slider-image"
            >
              <p className="pName1">Freljord Pack</p>
              <img
                className="iconImg1"
                src="https://res.cloudinary.com/dv7ygzpv8/image/upload/e_background_removal/f_png/v1697103856/edfcb052357e8600e18d06f501f6be186d8c_1232xr706_Q100_pg18ht_-_Logo_xqyve4.png"
              />
              <span className="price">500</span>
            </div>
          </div>
          <div
            className="slider-small"
            style={{ width: "300px", height: "250px" }}
          >
            <div
              style={{
                backgroundImage: `url(https://res.cloudinary.com/dv7ygzpv8/image/upload/v1697100398/runeterra-demacia-03_me3rbs.jpg)`,
              }}
              className="slider-image"
            >
              <p className="pName1">Damacia Pack</p>
              <img
                className="iconImg1"
                src="https://res.cloudinary.com/dv7ygzpv8/image/upload/e_background_removal/f_png/v1697103856/edfcb052357e8600e18d06f501f6be186d8c_1232xr706_Q100_pg18ht_-_Logo_xqyve4.png"
              />
              <span className="price">500</span>
            </div>
          </div>
          <div
            className="slider-small"
            style={{ width: "300px", height: "250px" }}
          >
            <div
              style={{
                backgroundImage: `url(https://res.cloudinary.com/dv7ygzpv8/image/upload/v1697100378/faction-shadowisles-frame-1_ekcekm.jpg)`,
              }}
              className="slider-image"
            >
              <p className="pName1" style={{ fontSize: "25px" }}>
                Shadowisles Pack
              </p>
              <img
                className="iconImg1"
                src="https://res.cloudinary.com/dv7ygzpv8/image/upload/e_background_removal/f_png/v1697103856/edfcb052357e8600e18d06f501f6be186d8c_1232xr706_Q100_pg18ht_-_Logo_xqyve4.png"
              />
              <span className="price">500</span>
            </div>
          </div>
          <div
            className="slider-small"
            style={{ width: "300px", height: "250px" }}
          >
            <div
              style={{
                backgroundImage: `url(https://res.cloudinary.com/dv7ygzpv8/image/upload/v1697100414/runeterra-noxus-02_ycpyyt.jpg)`,
              }}
              className="slider-image"
            >
              <p className="pName1">Noxus Pack</p>
              <img
                className="iconImg1"
                src="https://res.cloudinary.com/dv7ygzpv8/image/upload/e_background_removal/f_png/v1697103856/edfcb052357e8600e18d06f501f6be186d8c_1232xr706_Q100_pg18ht_-_Logo_xqyve4.png"
              />
              <span className="price">500</span>
            </div>
          </div>
          <div
            className="slider-small"
            style={{ width: "300px", height: "250px" }}
          >
            <div
              style={{
                backgroundImage: `url(https://res.cloudinary.com/dv7ygzpv8/image/upload/v1697100426/runeterra-piltover-10_vdzc4q.jpg)`,
              }}
              className="slider-image"
            >
              <p className="pName1">Piltover Pack</p>
              <img
                className="iconImg1"
                src="https://res.cloudinary.com/dv7ygzpv8/image/upload/e_background_removal/f_png/v1697103856/edfcb052357e8600e18d06f501f6be186d8c_1232xr706_Q100_pg18ht_-_Logo_xqyve4.png"
              />
              <span className="price">500</span>
            </div>
          </div>
        </div>
        <Box position="relative" top="28%">
          <Divider w="80%" m="0"/>
          <AbsoluteCenter bg="#c49250" px="5" py="1" left="10%">
            Primeume Packs
          </AbsoluteCenter>
        </Box>
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
          <ModalOverlay />
          <ModalContent
            style={{
              backgroundImage: `url(https://res.cloudinary.com/dv7ygzpv8/image/upload/v1697100398/runeterra-demacia-03_me3rbs.jpg)`,
            }}
          >
            <ModalHeader>Bandles Cards</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Image
                src="https://res.cloudinary.com/dv7ygzpv8/image/upload/v1697065666/kwtrcfvd6p19tzgqxwxh.jpg"
                fallbackSrc=""
              />
              <Divider /> 5 Random Cards
            </ModalBody>
            <ModalFooter>
              <Button mr={40} variant="ghost">
                <img
                  className="iconRp"
                  src="https://res.cloudinary.com/dv7ygzpv8/image/upload/e_background_removal/f_png/v1697103856/edfcb052357e8600e18d06f501f6be186d8c_1232xr706_Q100_pg18ht_-_Logo_xqyve4.png"
                />
                <span style={{ color: "rgb(255, 217, 0)" }}>1000</span>
              </Button>
              <Button colorScheme="blue" px={6} py={6} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};

export default loot;
