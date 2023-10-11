
import React, { useEffect, useState, useRef } from "react";
import "./style.css";
import NavBar from "../Navbar";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import {
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Box,
  Grid,
  GridItem,
  Container,
} from "@chakra-ui/react";
import axios from "axios";
import Notification from "../notificationx/index";
import { setPosts } from "../redux/postSlicer/post";
import { setUsers } from "../redux/authSlicer/auth";
const HomePage = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const posts = useSelector((state) => state.posts.posts);
  const token = useSelector((state) => state.auth.token);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const btnRef = useRef();

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % posts.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? posts.length - 1 : prevIndex - 1
    );
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
  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/posts/`, config);
        const rever = res.data.result;
        dispatch(setPosts([...rever].reverse()));
      } catch (error) {
        console.log(error);
      }
    };

    const interval = setInterval(nextImage, 5000);

    getPosts();
    setUser();
    return () => {
      clearInterval(interval);
    };
  }, [currentImageIndex]);

  return (
    <>
      <NavBar />

      <Notification />
      <div className="HomePage-container">
        <div className="background-vido">
          <video autoPlay loop muted playsInline>
            <source
              src="https://res.cloudinary.com/dmhvb05w3/video/upload/v1696968750/adventure-skyscape-moewalls-com_fxmgd9.mp4"
              type="video/mp4"
            />
          </video>
        </div>

        <div className="message">
          <ul className="news__tab__list">
            <li className="news__tab__item news__tab__item--active">message</li>
          </ul>
          <ul className="news__list"></ul>
        </div>
        <div className="chat">
          <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
            friend
          </Button>
          <Drawer
            isOpen={isOpen}
            placement="right"
            onClose={onClose}
            finalFocusRef={btnRef}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Create your account</DrawerHeader>
              <DrawerBody></DrawerBody>
              <DrawerFooter>
                <Button variant="outline" mr={3} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme="blue">Save</Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>

          <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
            world
          </Button>
          <Drawer
            isOpen={isOpen}
            placement="right"
            onClose={onClose}
            finalFocusRef={btnRef}

      <Box p={4}>
        <GridItem colSpan={1} marginTop="60px">
          <AddPost />
        </GridItem>
        <Container maxW="100%">
          <Grid
            h="200px"
            templateRows="repeat(2, 1fr)"
            templateColumns="repeat(5, 1fr)"
            gap={4}

          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Create your account</DrawerHeader>
              <DrawerBody></DrawerBody>
              <DrawerFooter>
                <Button variant="outline" mr={3} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme="blue">Save</Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>

        <div className="background-video2">
          <video autoPlay loop muted playsInline>
            <source
              src="https://res.cloudinary.com/dmhvb05w3/video/upload/v1697005514/fantasy-traditional-temples-sakura-moewalls-com_fseoqb.mp4"
              type="video/mp4"
            />
          </video>

          <div className="posts">
            <ul className="news__tab__list">
              <li className="news__tab__item news__tab__item--active">News</li>
            </ul>
            <ul className="news__list">
              {posts.slice(0, 5).map((post) => (
                <li className="new-news" key={post.id}>
                  <p>{post.content}</p>
                  <p className="news_date">
                    {new Date(post.created_at).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>

            <div className="image-slider">
              <img
                src={posts[currentImageIndex]?.image_url}
                alt={`Image ${currentImageIndex}`}
              />
              <button onClick={prevImage}>---</button>
              <button onClick={nextImage}>---</button>
            </div>
          </div>
        </div>

        <div className="background-video3">
          <video autoPlay loop muted playsInline>
            <source
              src="https://res.cloudinary.com/dmhvb05w3/video/upload/v1697005486/fantasy-world-full-of-cherry-blossom-trees-moewalls-com_hhqymf.mp4"
              type="video/mp4"
            />
          </video>
        </div>
      </div>
    </>
  );
};

export default HomePage;
