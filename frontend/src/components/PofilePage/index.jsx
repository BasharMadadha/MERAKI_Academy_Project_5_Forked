import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./style.css";
import NavBar from "../Navbar";
import { setPosts } from "../redux/postSlicer/post";
import { AiFillSetting } from "react-icons/Ai";
import Friends from "../Friends";

const ProfilePage = () => {
  const [userPorfile, setUserPorfile] = useState({});
  const user_id = useSelector((state) => state.auth.user_id);
  const isLogged = useSelector((state) => state.auth.isLogged);
  const dispatch = useDispatch();
  const [div1Visible, setDiv1Visible] = useState(false);
  const [div2Visible, setDiv2Visible] = useState(false);
  const [div3Visible, setDiv3Visible] = useState(false);

  const toggleDiv1 = () => {
    setDiv1Visible(!div1Visible);
    setDiv3Visible(false);
    setDiv2Visible(false);
  };

  const toggleDiv2 = () => {
    setDiv2Visible(!div2Visible);
    setDiv1Visible(false);
    setDiv3Visible(false);
  };

  const toggleDiv3 = () => {
    setDiv3Visible(!div3Visible);
    setDiv2Visible(false);
    setDiv1Visible(false);
  };

  useEffect(() => {
    getUserByID(user_id);
    getPostsByUser(user_id);
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
      <div className="backg">
        <NavBar getUserByID={getUserByID} getPostsByUser={getPostsByUser} />

        <div class="grid-container">
          <div className="div1">
            <div className="cover-photo">
              <img
                className="cover"
                src="https://c4.wallpaperflare.com/wallpaper/753/398/573/digital-art-artwork-sekiro-shadows-die-twice-video-games-video-game-art-hd-wallpaper-preview.jpg"
              />
            </div>
            <div className="profile-picture">
              <img src={userPorfile.image} alt="Profile Picture" />
            </div>
            <div class="spinner">
              <span>
                <h1 className="h1s">{userPorfile.username}</h1>
              </span>
            </div>
            <div>
              <p className="dis">Sleep. Eat. Game. Repeat.</p>
            </div>
            <div class="parent">
              <div class="child child-2">
                <button class="button btn-2" onClick={toggleDiv2}>
                  <p>FRIENDS LIST</p>
                </button>
              </div>
              <div class="child child-3">
                <button class="button btn-3" onClick={toggleDiv3}>
                  <p>MY CARDS</p>
                </button>
              </div>
              <div class="child child-1">
                <button class="button btn-1" onClick={toggleDiv1}>
                  <p>OVERVIEW</p>
                </button>
              </div>
            </div>
          </div>

          <div className="div2">
            <Link to="/EditePage">
              <button className="setting">
                <AiFillSetting />
              </button>
            </Link>

            {div1Visible && (
              <div>
                <h1>OVERVIEW</h1>
              </div>
            )}

            {div2Visible && (
              <div>
                <Friends />
              </div>
            )}

            {div3Visible && (
              <div>
                <h1 className="center">MY CARDS</h1>
                <div class="grid-container2">
                  <div class="grid-item2">
                    <img
                      className="cardimg"
                      src="https://preview.redd.it/3a2o0icg8kb71.jpg?width=804&format=pjpg&auto=webp&s=495afc99324f4f1ca8134a36922d7399e33db579"
                      alt=""
                    />{" "}
                    <p className="cardname">MISS FOTUNE</p>
                  </div>
                  <div class="grid-item2">
                    <img
                      className="cardimg"
                      src="https://preview.redd.it/appzgu0tju461.jpg?width=804&format=pjpg&auto=webp&s=188672e8bf14702501ecfa114aa5e3b3e9bfef40"
                      alt=""
                    />{" "}
                    <p className="cardname">MISS FOTUNE</p>
                  </div>
                  <div class="grid-item2">
                    <img
                      className="cardimg"
                      src="https://preview.redd.it/nyepm6cu8kb71.jpg?width=804&format=pjpg&auto=webp&s=189d29803240f14ce495ef29f9f4b4f17030fdc4"
                      alt=""
                    />{" "}
                    <p className="cardname">GAREN</p>
                  </div>
                  <div class="grid-item2">
                    <img
                      className="cardimg"
                      src="https://preview.redd.it/etf5tir5lu461.jpg?width=804&format=pjpg&auto=webp&s=3a6371f648ee29f8ea3a680ae2a0446c56d5ff80"
                      alt=""
                    />{" "}
                    <p className="cardname">GANGPLANK</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
