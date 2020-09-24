const eventHub = document.querySelector("body")

export const checkAuth = () => {
    if(sessionStorage.getItem("activeUser")){
        console.log("auth")
        eventHub.dispatchEvent(new CustomEvent("userAuthenticated"))
    }
}