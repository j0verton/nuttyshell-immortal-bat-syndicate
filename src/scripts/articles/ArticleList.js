// map over articles array and display all on DOM

import { getArticles, useArticles, deleteArticle } from './ArticleProvider.js'
import { ArticleHTMLConverter } from './Article.js'
import { ArticleForm } from './ArticleForm.js'

const eventHub = document.querySelector("body")

const render = artArr => {
    // renders news container
    const newsTarget = document.getElementById('main')
    const renderNews = () => newsTarget.innerHTML += `<section id="newsContainer"></section>`

    renderNews()

    // renders articles
    const contentTarget = document.getElementById("newsContainer")
    const revArtArr = artArr.reverse()
    const artHTML = revArtArr.map(art => ArticleHTMLConverter(art)).join("")

    contentTarget.innerHTML = `
        <section id="newsContainer">
            <h2>News</h2>
            <button id="showFormBtn">Share an Article</button>
            ${artHTML}
        </section>
    `

    ArticleForm()
}

export const ArticleList = () => {
    getArticles()
        .then(() => {
            render(useArticles())
        })
}

eventHub.addEventListener("articleStateChanged", () => {
    const newArticles = useArticles()
    render(newArticles)
})

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