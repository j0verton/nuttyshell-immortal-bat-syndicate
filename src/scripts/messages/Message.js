export const Message = messageObj => {
return 
    `   
        <li class="${messageObj.sendingUserId}>${messageObj.message} - ${messageObj.datetoLocaleString(undefined, {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })}</li>
    `

}