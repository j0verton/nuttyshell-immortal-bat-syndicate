import { getFriends, useFriends } from "../friends/FriendsData.js";
const eventHub = document.querySelector("body")
const render = friendCollection => {
    document.querySelector("#newMessageForm").innerHTML = `
        <select class="dropdown" id="friendSelect">
            <option value="0">choose a friend To message...</option>
            ${
                friendCollection.map(
                    friendObj => {
                        const name = friendObj.user.username;
                        return `<option value="${name}">${name}</option>`;
                    }
                )
            }
        </select>
    `
}

export const FriendSelect = () => {
    getFriends()
    .then(() => {
        const friendsArray = useFriends()
        render(friendsArray)
    })
}

eventHub.addEventListener("keydown", event => {
    if(event.code === 50){
        console.log("@")
        FriendSelect()
    }

} )

document.addEventListener('keyup', logKey)