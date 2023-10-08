import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Heading,
  List,
  ListItem,
  Text,
  VStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,

} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { ChevronDownIcon } from "@chakra-ui/icons";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const users = useSelector((state) => state.auth.users);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get("http://localhost:5000/notif");
        if (response && response.data) {
          setNotifications(response.data.result);
          console.log(response);
        }
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchNotifications();
  }, []);
  notifications.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  const getSenderUsername = (senderId) => {
    if (senderId !== null) {
      const user = users.find((user) => user.id === senderId);
      return user ? user.username : senderId.toString();
    }
    return "Unknown Sender";
  };

  return (
    <Box p="4">
      <Heading as="h1" mb="4">
        Notifications
      </Heading>
      <Menu>
        {({ isOpen }) => (
          <>
            <MenuButton
              isActive={isOpen}
              as={Button}
            >
              {isOpen ? "Close" : "Open"}
            </MenuButton>
            <MenuList>
              {notifications.map((notification) => (
                <MenuItem key={notification.id} onClick={() => alert("Kagebunshin")}>
                  <VStack align="start" spacing="1">
                    <Text> {getSenderUsername(notification.sender_id)}</Text>
                    {notification.comment_id !== null && (
                      <Text>Comment {notification.comment_id}</Text>
                    )}
                    {notification.like_id !== null && (
                      <Text>Like {notification.like_id}</Text>
                    )}
                    <Text>{new Date(notification.created_at).toLocaleString()}</Text>
                  </VStack>
                </MenuItem>
              ))}
            </MenuList>
          </>
        )}
      </Menu>
    </Box>
  );
};

export default Notification;
