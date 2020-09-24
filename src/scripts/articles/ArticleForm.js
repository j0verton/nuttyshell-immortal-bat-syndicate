// form presented to user to add news article

import { getArticles, saveArticle } from './ArticleProvider.js'

const eventHub = document.querySelector("body")
const formTarget = document.getElementById("main")

// renders form container
const createForm = () => formTarget.innerHTML += `<section id="form--container"></section>`

// share article functionality
eventHub.addEventListener("click", event => {
    if (event.target.id === "saveArticle") {

        const title = document.getElementById("input--title")
        const synopsis = document.getElementById("input--synopsis")
        const url = document.getElementById("input--url")

        if (title.value !== "" && synopsis.value !== "" && url.value !== "") {
            const newArticle = {
                title: title.value,
                date: Date.now(),
                synopsis: synopsis.value,
                url: url.value
            }

            saveArticle(newArticle)
        } else {
            window.alert("Please fill in all fields.")
        }
    }
})

// renders form
const render = () => {
    const contentTarget = document.getElementById("form--container")

    contentTarget.innerHTML = `
        <button id="showFormBtn">Share an Article</button>

        <div id="formModal" class="modal">
            <form id="input--form" class="modal-content">
                <div id="input--header">
                    <h3 id="input--greeting">Share an Article</h3>
                    <span id="modalClose">&times;</span>
                </div>

                <input type="text" id="input--title" placeholder="Title of the Article"></input>

                <textarea id="input--synopsis" placeholder="Please include a synopsis..." rows="5" cols="50"></textarea>

                <input type="text" id="input--url" placeholder="Copy/Paste URL of Article Here"></input>

                <button id="saveArticle" type="reset">Share</button>
            </form>
        </div>
    `
}

// makes sure form container is rendered before form
export const ArticleForm = () => {
    getArticles()
        .then(createForm)
        .then(render)
}

// display form in modal
eventHub.addEventListener("click", event => {
    const modal = document.getElementById("formModal")

    if (event.target.id === "showFormBtn") {
        modal.style.display = "block"
    } else if (event.target.id === "modalClose" || event.target.id === "saveArticle") {
        modal.style.display = "none"
    }

    window.onclick = () => {
        if (event.target == modal) {
            modal.style.display = "none"
        }
    }
})