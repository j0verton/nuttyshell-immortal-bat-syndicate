import { friendsSetup } from "./FriendsList.js";

const eventHub = document.querySelector("body");

let friendsList;
let allFriendsList;
let usersList;

eventHub.addEventListener("friendStateChanged", (e) => {
  friendsSetup();
});

const dispatchStateChangeEvent = () => {
  const friendStateChangedEvent = new CustomEvent("friendStateChanged");

  eventHub.dispatchEvent(friendStateChangedEvent);
};

export const getFriends = () => {
  return fetch(
    `http://localhost:8088/friends?_expand=user&activeUserId=${sessionStorage.getItem(
      "activeUser"
    )}`
  )
    .then((response) => response.json())
    .then((friends) => {
      friendsList = friends;
    });
};
export const getAllFriends = () => {
  return fetch(`http://localhost:8088/friends?_expand=user`)
    .then((response) => response.json())
    .then((friends) => {
      allFriendsList = friends;
    });
};
export const useFriends = () => {
  return friendsList.slice();
};
export const useAllFriends = () => {
  return allFriendsList.slice();
};
export const getUsers = () => {
  return fetch(`http://localhost:8088/users`)
    .then((response) => response.json())
    .then((users) => {
      usersList = users;
    });
};
export const useUsers = () => {
  return usersList.slice();
};
export const AddFriend = (friend) => {
  return fetch("http://localhost:8088/friends", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(friend),
  })
    .then(getFriends)
    .then(dispatchStateChangeEvent);
};
export const DeleteFriend = (id) => {
  return fetch(`http://localhost:8088/friends/${id}`, {
    method: "DELETE",
  })
    .then(getFriends)
    .then(dispatchStateChangeEvent);
};
