import { useFriends, getFriends, useUsers } from "./FriendsData.js";

const eventHub = document.querySelector("body");

const contentTarget = document.querySelector("aside");

export const friendsSetup = () => {
  contentTarget.innerHTML += `<aside id="friendsListSection"></aside>`;
  getFriends().then(render);
};

const render = () => {
  const contentTarget1 = document.querySelector("#friendsListSection");
  contentTarget1.innerHTML = `
 Friends
 <ul id="friendsList">
 ${useFriends()
   .map((friend) => {
     return `<li class="friendCard">${friend.user.username}</li>`;
   })
   .join("")}
 </ul>
 <button id="addFriendBtn">Add Friend</button>
 <div class="addFriendDiv"></div>
 `;
};
// eventHub.addEventListener("keyup", (e) => {
//   if (e.target.id === "newFriend") {

//   }
// });
eventHub.addEventListener("click", (e) => {
  if (e.target.id === "addFriendBtn") {
      addFriendBtn.style.display = "none"
    let friendTarget = document.querySelector(".addFriendDiv")
    friendTarget.innerHTML = `
    <form autocomplete="off">
    <div id="friendInput" class="autocomplete">
    <input id="newFriend" type="text" placeholder="search a user">
    <div><button id="addFriendBtn2">+Friend</button></div><div><button>Cancel</button></div></div></form>
     
    `
  }
});

// export const searchFunction = () => {
//     // Declare variables
//     let input, filter, main, search;
//     input = document.getElementById('friendInput');
//     filter = input.value.toUpperCase();
//     // main = document.querySelector(".newZealandMain");
//     search = useUsers()
//         // Loop through all list items, and hide those who don't match the search query
//     for (let element in search) {
//         let txtValue = element.username
//         if (txtValue.toUpperCase().indexOf(filter) > -1) {
//             // element.style.display = "";

//         } else {
//             element.style.display = "none";
//         }
//     }
// }