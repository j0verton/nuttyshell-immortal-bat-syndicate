export const Message = messageObj => {
    let user =''
    if (messageObj.sendingUserId === sessionStorage.getItem("activeUser")){
        console.log("if")
        user = 'currentUser'
    } else {
        user = messageObj.sendingUserId
    }
    return `   
        <li class="${user} message>${messageObj.message} - ${messageObj.date}</li>
    `

}