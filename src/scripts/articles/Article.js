// export articles in HTML format to render to DOM

export const ArticleHTMLConverter = (artObj) => {
    return `
        <article class="article--container" id="article--${artObj.id}">
            <h2 class="article--title">${artObj.title}</h2>

            <p class="article--synopsis">${artObj.synopsis}</p>

            <div class="article--actions">
                <a href="${artObj.url}" target="_blank">
                    <h3>Read More</h3>
                </a>

                <button id="deleteArticle--${artObj.id}">Delete</button>
            </div>
        </article>
    `
}