import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserFriends } from "../redux/frinedSlicer/friends";
import axios from "axios";
import "./style.css";
const Friends = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const dispatch = useDispatch();
  const friends = useSelector((state) => state.friends.friends);
  const userId = useSelector((state) => state.auth.userId);

  const getUserFriend = async () => {
    try {
      console.log("Before axios request");

      const response = await axios.get(
        `http://localhost:5000/userFriends/${userId}`
      );
      console.log("After axios request", response.data.userFriends);

      if (response.status === 200) {
        dispatch(getUserFriends(response.data.userFriends));
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getUserFriend();
    console.log("freind", friends);
  }, [dispatch, userId]);

  return (
    <div >
    <h1>User Friends</h1>
    <ul >
      {friends.map((friend) => (
        <li key={friend.id} >
          <h3>{friend.id}</h3>
          <p>status: {friend.status}</p>
          <p>name: {friend.friend_username}</p>
          <img
            src="https://cdn.vox-cdn.com/thumbor/K7sQz0dqd7UUspPFAXd1dcXFszg=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/13450228/2b28479080f95087.jpg"
            alt="Friend's image"
            
          />
        </li>
      ))}
    </ul>
  </div>
  
  );
};
export default Friends;
