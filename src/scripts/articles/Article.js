// export articles in HTML format to render to DOM

export const ArticleHTMLConverter = (artObj) => {
    return `
        <article class="article--container" id="article--${artObj.id}">
            <h2 class="article--title">${artObj.title}</h2>
            <p class="article--timestamp">Posted: ${new Date(artObj.date).toLocaleDateString('en-US')}</p>

            <p class="article--synopsis">${artObj.synopsis}</p>

            <div class="article--actions">
                <a href="${artObj.url}" target="_blank">
                    Read More
                </a>

                <button id="deleteArticle--${artObj.id}">Delete</button>
            </div>
        </article>
    `
}