let friendsList;
let usersList

export const getFriends = () => {
  return fetch(`http://localhost:8088/friends?_expand=user&activeUserId=${sessionStorage.getItem("activeUser")}`)
    .then((response) => response.json())
    .then((friends) => {
        friendsList = friends
    });
};
export const useFriends = () => {
  console.table("List of friends", friendsList);
  return friendsList.slice();
};
export const getUsers = () => {
    return fetch(`http://localhost:8088/users`)
    .then((response) => response.json())
    .then((users) => {
        usersList = users
    });

}
export const useUsers = () => {
    return usersList.slice()
}