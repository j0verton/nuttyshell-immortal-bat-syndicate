import { friendsSetup } from "./FriendsList"

const eventHub = document.querySelector("body");

eventHub.addEventListener("taskStateChanged", (e) => {
friendsSetup()
});
  