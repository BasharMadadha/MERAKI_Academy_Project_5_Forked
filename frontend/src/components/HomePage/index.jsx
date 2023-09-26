import React, { useEffect } from "react";
import AddPost from "../AddPost/index";
import Post from "../Post/index";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setToggleProf, setUsers } from "../redux/authSlicer/auth";

const HomePage = () => {

  const dispatch = useDispatch();
  dispatch(setToggleProf(false));

  const setUser = async () => {
    try {
      const result = await axios.get("http://localhost:5000/users/getAllUser");
      if (result.data) {
        dispatch(setUsers(result.data));
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    setUser();
  }, []);
  return (
    <div>
      <AddPost />
      <Post />
    </div>
  );
};
export default HomePage;
