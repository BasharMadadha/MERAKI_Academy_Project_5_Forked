import "./style.css";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import Swal from "sweetalert2";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import { HamburgerIcon, RepeatIcon, EditIcon } from "@chakra-ui/icons";

const Post = () => {

  const [posts, setPosts] = useState([]);
  const [postId, setPostId] = useState("");
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.userInfo);
 
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    await axios
      .get(`http://localhost:5000/posts/`, config)
      .then((res) => {
        setPosts(res.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const DeletePost = async (id) => {
    await axios
      .delete(`http://localhost:5000/posts/${id}`)
      .then((res) => {
        getPosts();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const UpdatePost = async (id, content) => {
    await axios
      .put(`http://localhost:5000/posts/${id}`, {
        content,
      })
      .then((res) => {
        getPosts();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="post">
      <div className="containerP">
        {posts.map((post) => {
          return (
            <div key={post.post_id} className="postA">
              <div className="userP">
                <div className="userInfoP">
                  <img src={post.user_id} alt="" />
                  <div className="details">
                    <span className="name">{post.user_id}</span>
                    <span className="date">{post.created_at}</span>
                  </div>
                </div>
              </div>
              <div className="content">
                <p>{post.content}</p>
                <img
                  src={post.image_url}
                  alt=""
                  style={{ borderRadius: "10px" }}
                />
              </div>
              <div className="itemP">
                {/* <Likes /> */}
                <TextsmsOutlinedIcon />
                Comments
                <ShareOutlinedIcon />
                Share
              </div>
              {user?.id === post.user_id && (
                <div className="menuP">
                  <Menu>
                    <MenuButton
                      as={IconButton}
                      aria-label="Options"
                      icon={<HamburgerIcon />}
                      // variant="outline"
                      onClick={() => {
                        setPostId(post.post_id);
                      }}
                    />
                    {post.post_id === postId && (
                      <MenuList>
                        <MenuItem
                          icon={<RepeatIcon />}
                          command="⌘⇧N"
                          onClick={() => {
                            Swal.fire({
                              title: "Are you sure?",
                              text: "You won't be able to revert this!",
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonColor: "#d33",
                              cancelButtonColor: "#3085d6",
                              confirmButtonText: "Yes, delete it!",
                            }).then((result) => {
                              if (result.isConfirmed) {
                                DeletePost(post.post_id);
                                Swal.fire(
                                  "Deleted!",
                                  "Your file has been deleted.",
                                  "success"
                                );
                              }
                            });
                          }}
                        >
                          Delete
                        </MenuItem>
                        <MenuItem
                          icon={<EditIcon />}
                          command="⌘O"
                          onClick={() => {
                            (() => {
                              Swal.fire({
                                input: "textarea",
                                inputLabel: ` What's on your mind ${user.username} ...`,
                                inputPlaceholder: "Type in your mind here...",
                                inputAttributes: {
                                  "aria-label": "Type your message here",
                                },
                                showCancelButton: true,
                              }).then((result) => {
                                UpdatePost(post.post_id, result.value);
                              });
                            })();
                          }}
                        >
                          Update
                        </MenuItem>
                      </MenuList>
                    )}
                  </Menu>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Post;
