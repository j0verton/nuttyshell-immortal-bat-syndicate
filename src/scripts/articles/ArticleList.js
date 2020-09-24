// map over articles array and display all on DOM

import { getArticles, useArticles, deleteArticle } from './ArticleProvider.js'
import { ArticleHTMLConverter } from './Article.js'

const eventHub = document.querySelector("body")
const newsTarget = document.getElementById("main")
const contentTarget = document.getElementById("news--container")

const render = (artArr) => {
    contentTarget.innerHTML = artArr.map((artObj) => {
        return ArticleHTMLConverter(artObj)
    }).join("")
}

export const ArticleList = () => {
    getArticles()
        .then(useArticles)
        .then(render)
}