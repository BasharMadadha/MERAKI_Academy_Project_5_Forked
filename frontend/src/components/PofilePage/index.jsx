import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import './style.css'; 

const ProfilePage = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);

  return (
    <div className="profile-container">
      <div className="cover-photo">
        <img src="https://c4.wallpaperflare.com/wallpaper/753/398/573/digital-art-artwork-sekiro-shadows-die-twice-video-games-video-game-art-hd-wallpaper-preview.jpg" alt="https://c4.wallpaperflare.com/wallpaper/753/398/573/digital-art-artwork-sekiro-shadows-die-twice-video-games-video-game-art-hd-wallpaper-preview.jpg" />
      </div>
      <div className="profile-info">
        <div className="profile-picture">
          <img src={userInfo.image} alt="Profile Picture" />
        </div>
        <div className="user-details">
          <h1>{userInfo.username}</h1>
          <p>{userInfo.bio}</p>
        </div>
      </div>
      <div className="settings-button">
        <Link to="/EditePage">
          <button>Settings</button>
        </Link>
      </div>
      <div className="user-stats">
        <div className="stat">
        <Link to="/Friends">
          <button>Friends</button>
        </Link>
        </div>
        <div className="stat">
          <h2>Followers</h2>
          <p>{userInfo.followersCount}</p>
        </div>
        <div className="stat">
          <h2>Posts</h2>
          <p>{userInfo.postsCount}</p>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
