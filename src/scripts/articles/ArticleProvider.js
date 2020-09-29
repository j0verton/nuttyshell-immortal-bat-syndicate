// collects, copies, and distributes articles from database.json

const eventHub = document.querySelector("body")

const dispatchStateChangeEvent = () => {
    const articleStageChangedEvent = new CustomEvent('articleStateChanged')

    eventHub.dispatchEvent(articleStageChangedEvent)
}

let articles = []

// retrieve articles from database and push into articles array
export const getArticles = () => {
    return fetch('http://localhost:8088/news?_expand=user')
        .then(response => response.json())
        .then(parsedArticles => {
            articles = parsedArticles
        })
}

// copy articles array for use in other functions
export const useArticles = () => {
    return articles.slice()
}

// adds new articles to database
export const saveArticle = artObj => {
    return fetch('http://localhost:8088/news', {
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

// allows user to edit their articles
export const editArticle = artObj => {
    fetch(`http://localhost:8088/news/${artObj.id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(artObj)
    })
        .then(getArticles)
        .then(dispatchStateChangeEvent)
}

// removes article from database
export const deleteArticle = articleId => {
    return fetch(`http://localhost:8088/news/${articleId}`, {
        method: 'DELETE'
    })
        .then(getArticles)
        .then(dispatchStateChangeEvent)
}