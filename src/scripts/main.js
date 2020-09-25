/*
    1. Check if the user is authenticated by looking in session storage for `activeUser`
    2. If so, render the Nutshell component
    3. If not, render the login and registration forms
    4. Also, if the user authenticates, and the login form is initially shown
        ensure that the Nutshell component gets rendered
*/

import { checkAuth } from "./auth/authProvider.js"
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

/*
    1. Check if the user is authenticated by looking in session storage for `activeUser`
    2. If so, render the Nutshell component
    3. If not, render the login and registration forms
    4. Also, if the user authenticates, and the login form is initially shown
        ensure that the Nutshell component gets rendered
*/
//creates registerUser from
RegisterForm()

//checks session storage for activeUser key and if present dispatches an event to clear the forms and run nutshell
checkAuth()
