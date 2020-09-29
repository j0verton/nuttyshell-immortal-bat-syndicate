const contentTarget = document.querySelector(".auth--login")
const eventHub = document.querySelector("body")

//this listens for the userAuthenticated custom event and clears the login form
eventHub.addEventListener("userAuthenticated", e => {
    contentTarget.innerHTML = ""
})

//this was provided code that adds a new user to the database,
//then outputs a custom event 
eventHub.addEventListener("click", e => {
    if (e.target.id === "login__button") {
        const username = document.querySelector("#login__username").value

        return fetch(`http://localhost:8088/users?username=${username}`)
            .then(response => response.json())
            .then(users => {
                if (users.length > 0) {
                    const user = users[0]
                    sessionStorage.setItem("activeUser", user.id)
                    eventHub.dispatchEvent(new CustomEvent("userAuthenticated"))
                }
            })
    }
})
//this fuction creates a login form
const render = () => {
    contentTarget.innerHTML += `
        <section class="login">
            <input id="login__username" type="text" placeholder="EnTer your username">
            <button id="login__button">Log In</button>
        </section>
    `
}
//this is a function that exports the render to main.js
export const LoginForm = () => {
    render()
}
