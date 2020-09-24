// collects, copies, and distributes articles from database.json

const eventHub = document.querySelector("body")

const dispatchStateChangeEvent = () => {
    const articleStageChangedEvent = new CustomEvent('articleStateChanged')

    eventHub.dispatchEvent(articleStageChangedEvent)
}

let articles = []

export const getArticles = () => {
    return fetch('http://localhost:8088/articles')
        .then(response => response.json())
        .then(parsedArticles => {
            articles = parsedArticles
        })
}

export const useArticles = () => {
    return articles.slice()
}

export const saveArticle = artObj => {
    return fetch('http://localhost:8088/articles', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(artObj)
    })
        .then(() => {
            return getArticles()
        })
        .then(dispatchStateChangeEvent)
}

export const deleteArticle = articleId => {
    return fetch(`http://localhost:8088/articles/${noteId}`, {
        method: 'DELETE'
    })
        .then(getArticles)
        .then(dispatchStateChangeEvent)
}