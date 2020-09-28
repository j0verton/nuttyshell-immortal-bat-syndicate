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
        const username = document.querySelector("#register--username").value
        const email = document.querySelector("#register--email").value
        const zip = document.querySelector("#register--zip").value

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
                            "email": email,
                            "zip":zip
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
            <input id="register--username" type="text" placeholder="Enter your username">
            <input id="register--email" type="text" placeholder="Enter your email address">
            <input type="text" id="register--zip" class="eventInput" maxlength="5" pattern="[0-9]{5}" required placeholder="Zip Code:">
            <button id="register--button">Register</button>
        </section>
    `
}
//this function exports the registerUser form to main.js
export const RegisterForm = () => {
    render()
}