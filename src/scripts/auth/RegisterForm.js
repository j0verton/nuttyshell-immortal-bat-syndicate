import { replaceTs } from "../replaceTs.js"

const contentTarget = document.querySelector(".auth--register")
const eventHub = document.querySelector("body")

//this listenesfor the userAuthenticated custom event and clears the registraton form
eventHub.addEventListener("userAuthenticated", e => {
    contentTarget.innerHTML = ""
})

//this was provided code that adds a new user to the database,
//then outputs a custom event 
eventHub.addEventListener("click", e => {
    if (e.target.id === "register--button") {
        // replaces lowercaseTs
        const infoArray = [
            document.querySelector("#register--username"),
            document.querySelector("#register--email")
        ]
        replaceTs(infoArray)

        const username = document.querySelector("#register--username").value
        const email = document.querySelector("#register--email").value

        if (username !== "" && email !== "") {
            // Does the user exist?
            fetch(`http://localhost:8088/users?username=${username}`)
            .then(response => response.json())
            .then(users => {
                if (users.length === 0) {
                    fetch("http://localhost:8088/users", {
                        "method": "POST",
                        "headers": {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            "username": username,
                            "email": email
                        })
                    })
                        .then(response => response.json())
                        .then((newUser) => {
                            sessionStorage.setItem("activeUser", newUser.id)
                            eventHub.dispatchEvent(new CustomEvent("userAuthenticated"))
                        })

                }
                else {
                    window.alert("Username already exists!  😭")
                }
            })
        }
    }
})

//this function creates a registerUser form
const render = () => {
    contentTarget.innerHTML += `
        <section class="register">
            <input id="register--username" type="text" placeholder="EnTer your username">
            <input id="register--email" type="text" placeholder="EnTer your email address">
            <button id="register--button">RegisTer</button>
        </section>
    `
}
//this function exports the registerUser form to main.js
export const RegisterForm = () => {
    render()
}