export const Message = messageObj => {
    if (messageObj.sendingUserId === sessionStorage.getItem("activeUser")){
        let user = 'currentUser'
    } else {
        let user = messageObj.sendingUserId
    }
    console.log(user)
    return 
    `   
        <li class="${user} message>${messageObj.message} - ${messageObj.date}</li>
    `

}