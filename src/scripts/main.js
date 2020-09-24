import { checkAuth } from "./auth/authProviderer.js"
import { LoginForm } from "./auth/LoginForm.js"
import { RegisterForm } from "./auth/RegisterForm.js"
import { Nutshell } from "./Nutshell.js"

// export const checkAuth = () => {
//     if(sessionStorage.getItem("activeUser")){
//         console.log("auth")
//         eventHub.dispatchEvent(new CustomEvent("userAuthenticated"))
//     }
// }

const eventHub = document.querySelector("body")

eventHub.addEventListener("userAuthenticated", e => {
    Nutshell()
})

LoginForm()
RegisterForm()
checkAuth()
/*
    1. Check if the user is authenticated by looking in session storage for `activeUser`
    2. If so, render the Nutshell component
    3. If not, render the login and registration forms
    4. Also, if the user authenticates, and the login form is initially shown
        ensure that the Nutshell component gets rendered
*/

