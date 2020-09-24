// map over articles array and display all on DOM

import { getArticles, useArticles, deleteArticle } from './ArticleProvider.js'
import { ArticleHTMLConverter } from './Article.js'

const eventHub = document.querySelector("body")
const newsTarget = document.getElementById("main")

// renders news container
const createNews = () => newsTarget.innerHTML += `<section id="news--container"></section>`

// renders news
const render = () => {
    const artArr = useArticles()
    const contentTarget = document.getElementById("news--container")

    artArr.reverse()

    contentTarget.innerHTML = artArr.map((artObj) => {
        return ArticleHTMLConverter(artObj)
    }).join("")
}

// makes sure news container renders before news
export const ArticleList = () => {
    getArticles()
        .then(createNews)
        .then(render)
}

eventHub.addEventListener("articleStateChanged", () => {
    const newArticles = useArticles()
    render(newArticles)
})

// delete article functionality
eventHub.addEventListener("click", event => {
    if (event.target.id.startsWith('deleteArticle--')) {
        const [prefix, id] = event.target.id.split("--")

        deleteArticle(id).then(() => {
            const updatedArticles = useArticles()
            render(updatedArticles)
        })
    }
})