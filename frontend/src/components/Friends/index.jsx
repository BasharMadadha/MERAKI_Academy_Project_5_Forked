import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserFriends } from "../redux/frinedSlicer/friends";
import axios from "axios";
import "./style.css";

const Friends = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const dispatch = useDispatch();
  const friends = useSelector((state) => state.friends.friends);
  const userId = useSelector((state) => state.auth.userId);
  const users = useSelector((state) => state.auth.users);
  const [pendingRequests, setPendingRequests] = useState([]);



  
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

  const sendFriendsRequest = async (reqsTo) => {
    try {
      const response = await axios.post(`http://localhost:5000/addFriends`, {
        reqsFrom: userId,
        reqsTo: reqsTo,
      });
      console.log(response);
      if (response.data.success) {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const friendsRequest = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/userRequest/${userId}`
      );
      console.log("req1", response);
      if (response.status === 200) {
        setPendingRequests(response.data.requests);
        
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    friendsRequest();
    console.log("req", pendingRequests);
  }, [userId]);

  const [selectedFriend, setSelectedFriend] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const selectFriend = (friend) => {
    setSelectedFriend(friend);
    toggleDropdown();
  };

  useEffect(() => {
    getUserFriend();
    console.log("friend", friends);
    console.log("users", users);
  }, [dispatch, userId]);

  return (
    <div className="firendpage">
      <h1 className="users">
        {Array.isArray(users) &&
          users.map((user) => (
            <div className="userA" key={user.id}>
              <img
                src={user.image}
                alt="https://cdn.vox-cdn.com/thumbor/K7sQz0dqd7UUspPFAXd1dcXFszg=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/13450228/2b28479080f95087.jpg"
              />
              <p>{user.username}</p>
              <button
                className="btn"
                onClick={() => sendFriendsRequest(user.id)}
              >
                Send Request
              </button>
            </div>
          ))}
      </h1>
      <div className="firends">
        <div className="relative mt-2">
          <button
            type="button"
            className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
            aria-haspopup="listbox"
            aria-expanded={isDropdownOpen}
            onClick={toggleDropdown}
          >
            <span className="flex items-center">
              {selectedFriend ? (
                <img
                  src={selectedFriend.image}
                  alt="https://cdn.vox-cdn.com/thumbor/K7sQz0dqd7UUspPFAXd1dcXFszg=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/13450228/2b28479080f95087.jpg"
                  className="h-5 w-5 flex-shrink-0 rounded-full"
                />
              ) : null}
              <span className="ml-3 block truncate">
                {selectedFriend
                  ? selectedFriend.friend_username
                  : "Select a friend"}
              </span>
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
              <svg
                className={`h-5 w-5 ${
                  isDropdownOpen ? "text-indigo-500" : "text-gray-400"
                }`}
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </button>

          {isDropdownOpen && (
            <ul
              className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
              tabIndex="-1"
              role="listbox"
              aria-labelledby="listbox-label"
            >
              {friends?.map((friend) => (
                <li
                  key={friend.id}
                  className={`${
                    selectedFriend === friend
                      ? "bg-indigo-600 text-white"
                      : "text-gray-900"
                  } relative cursor-pointer select-none py-2 pl-3 pr-9`}
                  onClick={() => selectFriend(friend)}
                >
                  <div className="flex items-center">
                    <img
                      src={friend.image}
                      alt={`https://th.bing.com/th/id/OIP.0SHw3bNFD6unhffN9fI6EAAAAA?pid=ImgDet&rs=1`} // Use the provided URL as alt text
                      className="h-5 w-5 flex-shrink-0 rounded-full"
                    />
                    <span className="font-normal ml-3 block truncate">
                      {friend.friend_username}
                    </span>
                  </div>
                  {selectedFriend === friend && (
                    <span className="text-white absolute inset-y-0 right-0 flex items-center pr-4">
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <ul className="request">
        {pendingRequests.map((request) => (
          <li key={request.id}>
            <p>Request ID: {request.id}</p>
            <p>From User ID: {request.id}</p>
            <button >
              Accept
            </button>
            <button >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Friends;
