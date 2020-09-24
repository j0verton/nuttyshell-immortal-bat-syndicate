const eventHub = document.querySelector("body")

export const checkAuth = () => {
    if(sessionStorage.getItem("activeUser")){
        eventHub.dispatchEvent(new CustomEvent("userAuthenticated"))
    }
}