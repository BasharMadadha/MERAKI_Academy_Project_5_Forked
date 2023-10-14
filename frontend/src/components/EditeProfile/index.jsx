import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGears,
  faUser,
  faBell,
  faLanguage,
  faBookmark,
  faQuestion,
  faAddressCard,
} from "@fortawesome/free-solid-svg-icons";
import { Input } from "@chakra-ui/react";
import Swal from "sweetalert2";
import axios from "axios";
import { useSelector } from "react-redux";
import { IconButton, Button } from "@chakra-ui/react";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import "./style.css";
import NavBar from "../Navbar";

const EditePage = () => {
  const [selectedTab, setSelectedTab] = useState("GENERAL");
  const [password, setPassword] = useState({
    password: "",
    old_password: "",
    confirm_password: "",
  });
  const [username, setUsername] = useState({
    username: "",
    confirm_username: "",
  });
  const [image, setImage] = useState("");
  const token = useSelector((state) => state.auth.token);
  const [loading, setLoading] = useState(false);

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const processFile = async (files) => {
    setLoading(true);
    const CLOUD_NAME = "dv7ygzpv8";
    const UNSIGNED_UPLOAD_PRESET = "dpybqbgc";
    const file = files;
    const FETCH_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

    const DATA = new FormData();

    DATA.append("file", file);
    DATA.append("cloud_name", CLOUD_NAME);
    DATA.append("upload_preset", UNSIGNED_UPLOAD_PRESET);
    await fetch(FETCH_URL, {
      method: "post",
      mode: "cors",
      body: DATA,
    })
      .then((res) => res.json())
      .then((data) => {
        setImage(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const tabs = {
    GENERAL: (
      <div className="tabContent">
        <h2>General Settings</h2>
        <div className="generalOptions">
          <div className="option">
            <h3>Change Password</h3>
            <div className="passwordChangeForm">
              <Input
                type="password"
                placeholder="Old Password"
                value={password.old_password}
                onChange={(e) => {
                  setPassword({ ...password, old_password: e.target.value });
                }}
              />
              <Input
                type="password"
                placeholder="New Password"
                value={password.password}
                onChange={(e) => {
                  setPassword({ ...password, password: e.target.value });
                }}
              />
              <Input
                type="password"
                placeholder="Confirm New Password"
                value={password.confirm_password}
                onChange={(e) => {
                  setPassword({
                    ...password,
                    confirm_password: e.target.value,
                  });
                }}
              />
              <Button
                colorScheme="teal"
                size="md"
                onClick={() => {
                  axios
                    .put(
                      "http://localhost:5000/users",
                      {
                        old_password: password.old_password,
                        password: password.password,
                        confirm_password: password.confirm_password,
                      },
                      config
                    )
                    .then((result) => {
                      setPassword({
                        ...password,
                        old_password: "",
                        password: "",
                        confirm_password: "",
                      });
                      <>
                        {Swal.fire({
                          position: "top",
                          icon: "success",
                          title: result.data.message,
                          showConfirmButton: false,
                          timer: 1500,
                        })}
                      </>;
                    })
                    .catch((error) => {
                      <>
                        {Swal.fire({
                          position: "top",
                          icon: "warning",
                          title: "Password Not Match",
                          showConfirmButton: false,
                          timer: 1500,
                        })}
                      </>;
                    });
                }}
              >
                Change Password
              </Button>
            </div>
          </div>
          <div className="option">
            <h3>Change User Name</h3>
            <div className="emailChangeForm">
              <Input
                type="text"
                placeholder="New User Name"
                value={username.username}
                onChange={(e) => {
                  setUsername({ ...username, username: e.target.value });
                }}
              />
              <Input
                type="text"
                placeholder="Confirm New User Name"
                value={username.confirm_username}
                onChange={(e) => {
                  setUsername({
                    ...username,
                    confirm_username: e.target.value,
                  });
                }}
              />
              <Button
                colorScheme="teal"
                size="md"
                onClick={() => {
                  axios
                    .put(
                      "http://localhost:5000/users/image",
                      {
                        username: username.username,
                        confirm_username: username.confirm_username,
                      },
                      config
                    )
                    .then((result) => {
                      setUsername({
                        ...username,
                        username: "",
                        confirm_username: "",
                      });
                      <>
                        {Swal.fire({
                          position: "top",
                          icon: "success",
                          title: result.data.message,
                          showConfirmButton: false,
                          timer: 1500,
                        })}
                      </>;
                    })
                    .catch((error) => {
                      <>
                        {Swal.fire({
                          position: "top",
                          icon: "warning",
                          title: "Email Not Match",
                          showConfirmButton: false,
                          timer: 1500,
                        })}
                      </>;
                    });
                }}
              >
                Change User Name
              </Button>
            </div>
          </div>
          <div className="option">
            <h3>Change Profile Image</h3>
            <div className="profileImageChangeForm">
              {image.length > 0 && <img src={image} alt="" className="picU" />}
              <label htmlFor="file-input">
                <IconButton
                  as="span"
                  fontSize="30px"
                  aria-label="Upload Image"
                  icon={
                    <FontAwesomeIcon
                      icon={faImage}
                      onClick={() => {
                        (async () => {
                          const { value: file } = await Swal.fire({
                            title: "Select image",
                            input: "file",
                            inputAttributes: {
                              accept: "image/*",
                              "aria-label": "Upload your profile picture",
                            },
                          });
                          if (file) {
                            processFile(file);
                          }
                        })();
                      }}
                    />
                  }
                />
              </label>
              <Button
                colorScheme="teal"
                size="md"
                onClick={() => {
                  axios
                    .put(
                      "http://localhost:5000/users/image",
                      {
                        image,
                      },
                      config
                    )
                    .then((result) => {
                      setImage("");
                      <>
                        {Swal.fire({
                          position: "top",
                          icon: "success",
                          title: result.data.message,
                          showConfirmButton: false,
                          timer: 1500,
                        })}
                      </>;
                    })
                    .catch((error) => {
                      <>
                        {Swal.fire({
                          position: "top",
                          icon: "warning",
                          title: "Please Add",
                          showConfirmButton: false,
                          timer: 1500,
                        })}
                      </>;
                    });
                }}
              >
                Change Profile Image
              </Button>
            </div>
          </div>
        </div>
      </div>
    ),
    PROFILE: (
      <div className="tabContent">
        <p>Profile Content</p>
        <img
          src="https://res.cloudinary.com/dmhvb05w3/image/upload/v1693662933/p4/r83f0uun9hyvvu10h24i.jpg"
          alt="Profile Image"
        />
      </div>
    ),
    NOTIFICATIONS: (
      <div className="tabContent">
        <p>Notifications Content</p>
        <img src="https://res.cloudinary.com/dmhvb05w3/image/upload/v1693662941/p4/lfwk7vkrxn6ta304u2oz.webp" />
      </div>
    ),
    LANGUAGE: (
      <div className="tabContent">
        <p>Language Content</p>
        <img src="https://res.cloudinary.com/dmhvb05w3/image/upload/v1693662949/p4/hpql3u0fxqof835zwu8e.jpg"></img>
      </div>
    ),
    APPEARANCE: (
      <div className="tabContent">
        <p>Appearance Content</p>
        <img src="https://res.cloudinary.com/dmhvb05w3/image/upload/v1693662961/p4/wwtaozkhtwqd7qc7tt8m.jpg" />
      </div>
    ),
    PLUGINS: (
      <div className="tabContent">
        <p>Plugins Content</p>
        <img src="https://res.cloudinary.com/dmhvb05w3/image/upload/v1693663000/p4/ob3aic1uihvirpwccxxg.jpg" />
      </div>
    ),
    ABOUT: (
      <div className="tabContent">
        <p>About Content</p>
        <img src="https://res.cloudinary.com/dmhvb05w3/image/upload/v1693663013/p4/uqxyqscpgdvgvydogrgh.jpg" />
      </div>
    ),
  };

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div className="editePageContainer">
      <NavBar />
      <div className="sidebars">
        <div className="sidebarWrapper">
          <ul className="sidebarList">
            <button
              className={`sidebarsListItem ${
                selectedTab === "GENERAL" ? "active" : ""
              }`}
              onClick={() => handleTabClick("GENERAL")}
            >
              <FontAwesomeIcon icon={faGears} />
              <span className="sidebarListItemText">GENERAL</span>
            </button>
            <button
              className={`sidebarsListItem ${
                selectedTab === "PROFILE" ? "active" : ""
              }`}
              onClick={() => handleTabClick("PROFILE")}
            >
              <FontAwesomeIcon icon={faUser} />
              <span className="sidebarListItemText">Profile</span>
            </button>
            <button
              className={`sidebarsListItem ${
                selectedTab === "NOTIFICATIONS" ? "active" : ""
              }`}
              onClick={() => handleTabClick("NOTIFICATIONS")}
            >
              <FontAwesomeIcon icon={faBell} />
              <span className="sidebarListItemText">Notifications</span>
            </button>
            <button
              className={`sidebarsListItem ${
                selectedTab === "LANGUAGE" ? "active" : ""
              }`}
              onClick={() => handleTabClick("LANGUAGE")}
            >
              <FontAwesomeIcon icon={faLanguage} />
              <span className="sidebarListItemText">Language</span>
            </button>
            <button
              className={`sidebarsListItem ${
                selectedTab === "APPEARANCE" ? "active" : ""
              }`}
              onClick={() => handleTabClick("APPEARANCE")}
            >
              <FontAwesomeIcon icon={faBookmark} />
              <span className="sidebarListItemText">Appearance</span>
            </button>
            <button
              className={`sidebarsListItem ${
                selectedTab === "PLUGINS" ? "active" : ""
              }`}
              onClick={() => handleTabClick("PLUGINS")}
            >
              <FontAwesomeIcon icon={faQuestion} />
              <span className="sidebarListItemText">Plugins</span>
            </button>
            <button
              className={`sidebarsListItem ${
                selectedTab === "ABOUT" ? "active" : ""
              }`}
              onClick={() => handleTabClick("ABOUT")}
            >
              <FontAwesomeIcon icon={faAddressCard} />
              <span className="sidebarListItemText">About</span>
            </button>
          </ul>
        </div>
      </div>
      <div className="contentContainer">
        <div
          className={`tabContent ${
            selectedTab === "GENERAL" ? "centered" : ""
          }`}
        >
          {tabs[selectedTab]}
        </div>
      </div>
    </div>
  );
};
export default EditePage;
