import React from "react";
import "./Like.css";
import { useState } from "react";
import axios from "axios";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbUpAltRoundedIcon from "@mui/icons-material/ThumbUpAltRounded";
import { Avatar, AvatarGroup } from "@chakra-ui/react";
import { useSelector } from "react-redux";

const Like = ({ post, getPosts, getPostsByUser }) => {
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.userInfo);
  const users = useSelector((state) => state.auth.users);
  const toggleProf = useSelector((state) => state.auth.toggleProf);
  const user_id = useSelector((state) => state.auth.user_id);
  const [toggel, setToggel] = useState(false);
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const addLike = async (id) => {
    await axios
      .post(`http://localhost:5000/like/${id}`, true, config)
      .then((res) => {
        toggleProf ? getPostsByUser(user_id) : getPosts();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const DeleteLike = async (id) => {
    await axios
      .delete(`http://localhost:5000/like/${id}`, config)
      .then((res) => {
        toggleProf ? getPostsByUser(user_id) : getPosts();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const userLike = post.likes?.find((like) => like.user_id === user?.id);

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {post.likes?.length === 0 ? (
        <ThumbUpAltOutlinedIcon
          onClick={() => {
            addLike(post.post_id);
          }}
        />
      ) : userLike ? (
        <ThumbUpAltRoundedIcon
          style={{ color: "blue" }}
          onClick={() => {
            const userLike1 = post.likes.find(
              (like) => like.user_id === user?.id
            );
            DeleteLike(userLike1.like_id);
          }}
        />
      ) : (
        <ThumbUpAltOutlinedIcon
          onClick={() => {
            addLike(post.post_id);
          }}
        />
      )}
      <AvatarGroup size="md" max={2}>
        {post.likes?.map((like) => {
          const userLike1 = users.find((user) => like.user_id === user.id);
          return (
            <Avatar
              key={like.like_id}
              name={userLike1.username}
              src={userLike1.image}
            />
          );
        })}
      </AvatarGroup>
      <span
        onClick={() => {
          setToggel((prv) => !prv);
        }}
        style={{ marginLeft: "5px" }}
      >
        {/* {post.likes?.length >= 1 && post.likes?.length} */} Likes
      </span>
      {/* {toggel && (
        <Box className="box" sx={{ flexGrow: 1, maxWidth: 752 }}>
          <List>
            {post.likes.map((like) => {
              const userLikeu = users.find((user1) => like === user1.id);
              return (
                userLikeu.id === like && (
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar src={userLikeu.image} />
                    </ListItemAvatar>
                    <ListItemText primary={userLikeu.username} />
                  </ListItem>
                )
              );
            })}
          </List>
        </Box>
      )} */}
    </div>
  );
};

export default Like;
