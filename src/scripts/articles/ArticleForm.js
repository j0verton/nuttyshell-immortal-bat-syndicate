// form presented to user to add news article

import { getArticles, saveArticle } from './ArticleProvider.js'

const eventHub = document.querySelector("body")
const formTarget = document.getElementById("main")

const createForm = () => formTarget.innerHTML += `<section id="form--container"></section>`

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

const render = () => {
    const contentTarget = document.getElementById("form--container")

    contentTarget.innerHTML = `
        <form id="input--form">
            <h3>Share an Article</h3>
            
            <input type="text" id="input--title" placeholder="Title of the Article"></input>

            <textarea id="input--synopsis" placeholder="Please include a synopsis..." rows="5" cols="50"></textarea>

            <input type="text" id="input--url" placeholder="Copy/Paste URL of Article Here"></input>

            <button id="saveArticle" type="reset">Share</button>
        </form>
    `
}

export const ArticleForm = () => {
    getArticles()
        .then(createForm)
        .then(render)
}