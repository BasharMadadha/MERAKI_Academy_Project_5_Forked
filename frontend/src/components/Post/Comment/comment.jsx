import { Link } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./Comment.css";
import Swal from "sweetalert2";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import { HamburgerIcon, RepeatIcon, EditIcon } from "@chakra-ui/icons";

const Comment = ({ post_id }) => {
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.userInfo);
  const users = useSelector((state) => state.auth.users);
  const [comments, setComments] = useState([]);

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    getCommentsByPost(post_id);
  }, []);

  const getCommentsByPost = async (id) => {
    await axios
      .get(`http://localhost:5000/comment/${id}`, config)
      .then((res) => {
        console.log(res.data.result);
        setComments(res.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const createComment = async (id, content) => {
    await axios
      .post(`http://localhost:5000/comment/${id}`, { content }, config)
      .then((res) => {
        getCommentsByPost(post_id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteComment = async (id) => {
    await axios
      .delete(`http://localhost:5000/comment/${id}`)
      .then((res) => {
        getCommentsByPost(post_id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const UpdatePost = async (id, content) => {
    await axios
      .put(`http://localhost:5000/comment/${id}`, {
        content,
      })
      .then((res) => {
        getCommentsByPost(post_id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleComment = async () => {
    await Swal.fire({
      input: "textarea",
      inputLabel: ` What's on your mind ${user?.username} ...`,
      inputPlaceholder: "Type in your mind here...",
      inputAttributes: {
        "aria-label": "Type your message here",
      },
      showCancelButton: true,
    })
      .then((result) => {
        if (result.value) {
          createComment(post_id, result.value);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      {comments.map((comment) => {
        const userComment = users.find((user1) => comment.user_id === user1.id);
        return (
          userComment.id === comment.user_id && (
            <div key={comment.comment_id} className={"comment"}>
              <div className="userInfoP">
                <img className="userImage" src={userComment.image} alt="" />
                <div className="detailsC">
                  <Link style={{ textDecoration: "none", color: "inherit" }}>
                    <span className="nameC">{userComment.username}</span>
                  </Link>
                  <span className="dateC">{comment.created_at}</span>
                </div>
                <span>{comment.content}</span>
              </div>
              <Menu>
                <MenuButton
                className="menuBtn"
                  as={IconButton}
                  aria-label="Options"
                  icon={<HamburgerIcon />}
                />
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
                            deleteComment(comment.comment_id);
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
                          inputLabel: ` What's on your mind ${user?.username} ...`,
                          inputPlaceholder: "Type in your mind here...",
                          inputAttributes: {
                            "aria-label": "Type your message here",
                          },
                          showCancelButton: true,
                        }).then((result) => {
                          UpdatePost(comment.comment_id, result.value);
                        });
                      })();
                    }}
                  >
                    Update
                  </MenuItem>
                </MenuList>
              </Menu>
            </div>
          )
        );
      })}
      <button className="Btnx" onClick={handleComment}>
        <div className="signx">+</div>
        <div className="textx">Create</div>
      </button>
    </div>
  );
};

export default Comment;
