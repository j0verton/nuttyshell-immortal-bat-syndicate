const eventHub = document.querySelector("body")

//this module checks session storage for an activeUser key
export const checkAuth = () => {
    if(sessionStorage.getItem("activeUser")){
        eventHub.dispatchEvent(new CustomEvent("userAuthenticated"))
    }
}