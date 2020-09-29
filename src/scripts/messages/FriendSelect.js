
const render = friendCollection => {
    contentTarget.innerHTML = `
        <select class="dropdown" id="friendSelect">
            <option value="0">message all users...</option>
            ${
                friendCollection.map(
                    friendObj => {
                        const name = friendObj.user.name;
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