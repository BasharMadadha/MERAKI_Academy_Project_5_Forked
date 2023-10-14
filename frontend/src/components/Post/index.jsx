import "./style.css";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { setUser_id, setToggleProf } from "../redux/authSlicer/auth";
import { setPosts } from "../redux/postSlicer/post";
import Comment from "./Comment/comment";
import Like from "./Like/like";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import { HamburgerIcon, RepeatIcon, EditIcon } from "@chakra-ui/icons";
import NavBar from "../Navbar";

const Post = ({}) => {
  const dispatch = useDispatch();
  const [postId, setPostId] = useState("");
  const [commentUP, setCommentUP] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.userInfo);
  const users = useSelector((state) => state.auth.users);
  const user_id = useSelector((state) => state.auth.user_id);
  const toggleProf = useSelector((state) => state.auth.toggleProf);
  const posts = useSelector((state) => state.posts.posts);

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    getPosts();
    console.log(posts);
  }, []);
  const getPosts = async () => {
    await axios
      .get(`http://localhost:5000/posts/`, config)
      .then((res) => {
        const rever = res.data.result;
        dispatch(setPosts([...rever].reverse()));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const DeletePost = async (id) => {
    await axios
      .delete(`http://localhost:5000/posts/${id}`)
      // .then((res) => {
      //   toggleProf ? getPostsByUser(user_id) : getPosts();
      // })
      .catch((error) => {
        console.log(error);
      });
  };

  const UpdatePost = async (id, content) => {
    await axios
      .put(`http://localhost:5000/posts/${id}`, {
        content,
      })
      // .then((res) => {
      //   toggleProf ? getPostsByUser(user_id) : getPosts();
      // })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="pot">
      <NavBar />

      <div
        className="contanerP"
        style={{
          backgroundImage:
            'url("http://res.cloudinary.com/dv7ygzpv8/image/upload/v1696834590/hhbinzveeoenlsqnepe4.jpg")',
        }}
      >
        <div className="news">
          {posts.slice(0, 3).map((post) => (
            <div className="neews" key={post.id}>
              <p >{post.content}</p>
              
              <img src={post.image_url} />
            </div>
          ))}
        </div>
      </div>
      <ul class="btns">
  <li class="category__1">Latest</li>
  <li class="category__2">Info</li>
  <li class="category__3">Updates</li>
  <li class="category__4">Events</li>
</ul>
<ul class="news-list">
        <li class="news-item">
            <a href="https://genshin.hoyoverse.com/en/news/detail/113142">
                <img src="https://fastcdn.hoyoverse.com/content-v2/hk4e/113142/42ee58e358dcc11c0d345828849f9455_3807686355477813330.jpg" alt="News Image" class="news-image"/>
                <div class="news-info">
                    <h3 class="news-title">"To the Stars Shining in the Depths" Version 4.1 Update Details</h3>
                    <p class="news-summary">Dear Travelers, Below are the details of the Version 4.1 update "To the Stars Shining in the Depths" and the update compensation.</p>
                </div>
            </a>
            <div class="news-meta">
                <div class="news-date">Sep 27, 2023</div>
            </div>
        </li>
    </ul>
    <ul class="news-list2">
        <li class="news-item">
            <a href="https://genshin.hoyoverse.com/en/news/detail/113142">
                <img src="https://fastcdn.hoyoverse.com/content-v2/hk4e/113142/42ee58e358dcc11c0d345828849f9455_3807686355477813330.jpg" alt="News Image" class="news-image"/>
                <div class="news-info">
                    <h3 class="news-title">"To the Stars Shining in the Depths" Version 4.1 Update Details</h3>
                    <p class="news-summary">Dear Travelers, Below are the details of the Version 4.1 update "To the Stars Shining in the Depths" and the update compensation.</p>
                </div>
            </a>
            <div class="news-meta">
                <div class="news-date">Sep 27, 2023</div>
            </div>
        </li>
    </ul>
    <ul class="news-list3">
        <li class="news-item">
            <a href="https://genshin.hoyoverse.com/en/news/detail/113142">
                <img src="https://fastcdn.hoyoverse.com/content-v2/hk4e/113142/42ee58e358dcc11c0d345828849f9455_3807686355477813330.jpg" alt="News Image" class="news-image"/>
                <div class="news-info">
                    <h3 class="news-title">"To the Stars Shining in the Depths" Version 4.1 Update Details</h3>
                    <p class="news-summary">Dear Travelers, Below are the details of the Version 4.1 update "To the Stars Shining in the Depths" and the update compensation.</p>
                </div>
            </a>
            <div class="news-meta">
                <div class="news-date">Sep 27, 2023</div>
            </div>
        </li>
    </ul>
    <ul class="news-list4">
        <li class="news-item">
            <a href="https://genshin.hoyoverse.com/en/news/detail/113142">
                <img src="https://fastcdn.hoyoverse.com/content-v2/hk4e/113142/42ee58e358dcc11c0d345828849f9455_3807686355477813330.jpg" alt="News Image" class="news-image"/>
                <div class="news-info">
                    <h3 class="news-title">"To the Stars Shining in the Depths" Version 4.1 Update Details</h3>
                    <p class="news-summary">Dear Travelers, Below are the details of the Version 4.1 update "To the Stars Shining in the Depths" and the update compensation.</p>
                </div>
            </a>
            <div class="news-meta">
                <div class="news-date">Sep 27, 2023</div>
            </div>
        </li>
    </ul>
    
      {/* {posts?.map((post) => {
          const userPost = users.find((user1) => post.user_id === user1.id);
          return (
            <div key={post.post_id} className="postA">
              <div className="userP">
                  <div className="userInfoP">
                    <img
                      className="userInfoP_img"
                      src={userPost.image}
                      alt=""
                    />
                    <div className="details">
                      <span className="name">{userPost.username}</span>
                      <span className="date">{post.created_at}</span>
                    </div>
                  </div>
              
              </div>
              <div className="content">
                <p>{post.content}</p>
                {post.image_url && (
                  <img
                    className="content_img"
                    src={post.image_url}
                    alt=""
                    style={{ borderRadius: "10px" }}
                  />
                )}
              </div>
              <div className="itemP">
                <Like
                  post={post}
                  // getPostsByUser={getPostsByUser}
                  getPosts={getPosts}
                />
                <div
                  onClick={() => {
                    setCommentUP((show) => !show);
                    setPostId(post.post_id);
                  }}
                >
                  <TextsmsOutlinedIcon /> {post.comments?.length} Comments
                </div>
                <ShareOutlinedIcon />
                Share
              </div>
              {commentUP && post.post_id === postId && (
                <Comment
                  post={post}
                  // getPostsByUser={getPostsByUser}
                  getPosts={getPosts}
                />
              )}
              {user?.id === post.user_id && (
                <div className="menuP">
                  <Menu>
                    <MenuButton
                      as={IconButton}
                      aria-label="Options"
                      icon={<HamburgerIcon />}
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
      </div>  */}
    </div>
  );
};

export default Post;
