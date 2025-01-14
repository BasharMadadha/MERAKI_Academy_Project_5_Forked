import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./style.css";
import Post from "../Post";
import NavBar from "../Navbar";
import { setPosts } from "../redux/postSlicer/post";


const ProfilePage = () => {
  const [userPorfile, setUserPorfile] = useState({});
  const user_id = useSelector((state) => state.auth.user_id);
  const userId = useSelector((state) => state.auth.userId);
  const isLogged = useSelector((state) => state.auth.isLogged);
  const dispatch = useDispatch();

  useEffect(() => {
    getUserByID(user_id);
    getPostsByUser(user_id)
    if (!isLogged) {
      navigate("/login");
    }
  }, []);

  const getUserByID = async (id) => {
    await axios
      .get(`http://localhost:5000/users/${id}`)
      .then((res) => {
        setUserPorfile(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getPostsByUser = async (id) => {
    await axios
      .get(`http://localhost:5000/posts/search_1/${id}`)
      .then((res) => {
        const rever = res.data.result;
        dispatch(setPosts([...rever].reverse()));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <NavBar getUserByID={getUserByID} getPostsByUser={getPostsByUser}/>
      <div className="profile-container">
        <div className="cover-photo">
          <img
            className="cover"
            src="https://c4.wallpaperflare.com/wallpaper/753/398/573/digital-art-artwork-sekiro-shadows-die-twice-video-games-video-game-art-hd-wallpaper-preview.jpg"
            alt="https://c4.wallpaperflare.com/wallpaper/753/398/573/digital-art-artwork-sekiro-shadows-die-twice-video-games-video-game-art-hd-wallpaper-preview.jpg"
          />
        </div>
        <div className="profile-info">
          <div className="profile-picture">
            <img src={userPorfile.image} alt="Profile Picture" />
          </div>
          <div className="user-details">
            <h1>{userPorfile.username}</h1>
            <p>{userPorfile.bio}</p>
          </div>
        </div>
        {userId === user_id && (
          <div className="settings-button">
            <Link to="/EditePage">
              <button>Settings</button>
            </Link>
          </div>
        )}
        <div className="user-stats">
          <div className="stat">
            <Link to="/Friends">
              <button>Friends</button>
            </Link>
          </div>
          <div className="stat">
            <h2>Followers</h2>
            <p>{userPorfile.followersCount}</p>
          </div>
          <div className="stat">
            <h2>Posts</h2>
            <p>{userPorfile.postsCount}</p>
          </div>
        </div>
        <Post getPostsByUser={getPostsByUser} />
      </div>
    </>
  );
};

export default ProfilePage;
