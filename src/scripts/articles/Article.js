// export articles in HTML format to render to DOM

export const ArticleHTMLConverter = (artObj) => {
    return `
        <article class="article--container" id="article--${artObj.id}">
            <h3 class="article--title">${artObj.title}</h3>
            <p class="article--timestamp">Posted: ${new Date(artObj.date).toLocaleDateString('en-US')}</p>

            <p class="article--synopsis">${artObj.synopsis}</p>

            <div class="article--actions">
                <a href="${artObj.url}" target="_blank">
                    Read More
                </a>

                <button id="editArticle--${artObj.id}" class="editBtn">Edit</button>
                <button id="deleteArticle--${artObj.id}" class="trashBtn">🗑️</button>
            </div>
        </article>
    `
}