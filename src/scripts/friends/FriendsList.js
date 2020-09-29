import {
  useFriends,
  getFriends,
  useUsers,
  AddFriend,
  getUsers,
  DeleteFriend,
  getAllFriends,
  useAllFriends,
} from "./FriendsData.js";

const eventHub = document.querySelector("body");

const contentTarget = document.querySelector("aside");

export const friendsSetup = () => {
  contentTarget.innerHTML += `<aside id="friendsListSection"></aside>`;
  getFriends().then(render);
  getUsers();
};

const render = () => {
  const contentTarget1 = document.querySelector("#friendsListSection");
  contentTarget1.innerHTML = `
 Friends
 <ul id="friendsList">
 ${useFriends()
   .map((friend) => {
     return `<li class="friendCard">${friend.user.username} <i class="fa fa-trash-o" id="dltFriendBtn--${friend.id}"></i></li>`;
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
  if (e.target.id.startsWith("dltFriendBtn")) {
    getAllFriends().then((_) => {
      let [prefix, id] = e.target.id.split("--");
      let friends = useFriends();
      let friend = friends.find((friend) => friend.id === parseInt(id));
      let inverse = useAllFriends().find((f) => {
        console.log("Friend Find", f);
        return f.userId === friend.activeUserId;
      });
      DeleteFriend(id);
      console.log("Friend var", friend, "Inversed", inverse);
      DeleteFriend(inverse.id);
    });
  }
  if (e.target.id === "addFriendBtn") {
    addFriendBtn.style.display = "none";
    let friendTarget = document.querySelector(".addFriendDiv");
    friendTarget.innerHTML = `
      <form autocomplete="off">
      <div id="friendInput" class="autocomplete">
      <input id="newFriend" type="text" placeholder="search a user">
      <div><button id="addFriendBtn2">+Friend</button></div><div><button>Cancel</button></div></div></form>
       
      `;
  }
  if (e.target.id === "addFriendBtn2") {
    // addFriendBtn.style.display = "none"
    let friendTarget = document.querySelector("#newFriend").value;
    if (friendTarget) {
      friendTarget = useUsers().find((user) => user.username === friendTarget);
      if (friendTarget === undefined) {
        window.alert("This user does not exist!");
        document.querySelector("#newFriend").value = "";
      } else {
        const friendObj = {
            activeUserId: parseInt(sessionStorage.getItem("activeUser")),
            userId: friendTarget.id,
          };
          const friendObj2 = {
            userId: parseInt(sessionStorage.getItem("activeUser")),
            activeUserId: friendTarget.id,
          };
            let friendExist = useFriends().find(
          (friend) => parseInt(friendObj.userId) === parseInt(friend.userId)
        );
        if (friendExist) {
          window.alert("You are already friends!");
        } else {
            AddFriend(friendObj);
            AddFriend(friendObj2);
        }
      }
    } else {
      window.alert("Please insert a username!");
    }
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
