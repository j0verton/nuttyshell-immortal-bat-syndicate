// form presented to user to add news article

import { getArticles, useArticles, saveArticle } from './ArticleProvider.js'

const eventHub = document.querySelector("body")
const contentTarget = document.getElementById("article--container")

eventHub.addEventListener("click", event => {
    if (event.target.id === "saveArticle") {

        const articleContent = document

    }
})

const render = (artArr) => {
    contentTarget.innerHTML = `
        <h3>Share an Article</h3>
        
        <input type="text" id="input--title" placeholder="Title of the Article"></input>

        <textarea id="input--synopsis" placeholder="Please include a synopsis..." rows="5" cols="50"></textarea>

        <input type="text" id="input--url" placeholder="Copy/Paste URL of Article Here"></input>

        <button id="saveArticle">Share</button>
    `
}

export const ArticleForm = () => {
    getArticles()
        .then(render)
}