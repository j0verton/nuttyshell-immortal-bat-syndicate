import { checkAuth } from "./auth/authProviderer.js"
import { LoginForm } from "./auth/LoginForm.js"
import { RegisterForm } from "./auth/RegisterForm.js"
import { Nutshell } from "./Nutshell.js"

const eventHub = document.querySelector("body")
eventHub.addEventListener("userAuthenticated", e => {
    Nutshell()
})

LoginForm()
RegisterForm()
checkAuth()