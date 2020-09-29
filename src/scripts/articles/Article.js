// export articles in HTML format to render to DOM

export const ArticleHTMLConverter = (artObj) => {

    // shows edit and delete buttons for user's posts
    if (parseInt(sessionStorage.getItem("activeUser")) === artObj.userId) {
        return `
        <article class="article--container" id="article--${artObj.id}">
            <h3 class="article--title">${artObj.title}</h3>
            <p class="article--user"><strong>Posted by:</strong> ${artObj.user.username}</p>
            <p class="article--timestamp"><strong>Date:</strong> ${new Date(artObj.date).toLocaleDateString('en-US')}</p>

            <p class="article--synopsis">${artObj.synopsis}</p>

            <div class="article--actions">
                <a href="${artObj.url}" target="_blank">
                    Read More
                </a>

                <div class="formBtns">
                    <button id="editArticle--${artObj.id}" class="editBtn">Edit</button>
                    <button id="deleteArticle--${artObj.id}" class="trashBtn">🗑️</button>
                </div>
            </div>
        </article>
    `

        // removes edit and delete buttons for other user's posts
    } else {
        return `
        <article class="article--container" id="article--${artObj.id}">
            <h3 class="article--title">${artObj.title}</h3>
            <p class="article--user"><strong>Posted by:</strong> ${artObj.user.username}</p>
            <p class="article--timestamp"><strong>Date:</strong> ${new Date(artObj.date).toLocaleDateString('en-US')}</p>

            <p class="article--synopsis">${artObj.synopsis}</p>

            <div class="article--actions">
                <a href="${artObj.url}" target="_blank">
                    Read More
                </a>
            </div>
        </article>
    `
    }
}