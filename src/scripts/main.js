import { checkAuth } from "./auth/authProviderer.js"
import { LoginForm } from "./auth/LoginForm.js"
import { RegisterForm } from "./auth/RegisterForm.js"
import { Nutshell } from "./Nutshell.js"

const eventHub = document.querySelector("body")
//listens for userAuthenticated custom event and then runs Nutshell()
eventHub.addEventListener("userAuthenticated", e => {
    Nutshell()
})
//creates login form
LoginForm()

//creates registerUser from
RegisterForm()

//chechs session storage for activeUser key and if present dispatches an event to clear the forms and run nutshell
checkAuth()