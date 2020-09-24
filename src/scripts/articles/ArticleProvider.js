// collects, copies, and distributes articles from database.json

const eventHub = document.querySelector("body")

let articles = []

export const getNotes = () => {
    return fetch('http://localhost:8088/articles')
        .then(response => response.json())
        .then(parsedArticles => {
            articles = parsedArticles
        })
}

export const useNotes = () => {
    return articles.slice()
}