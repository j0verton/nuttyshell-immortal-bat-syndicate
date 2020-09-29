// export articles in HTML format to render to DOM

export const ArticleHTMLConverter = (artObj) => {
    const currentUser = parseInt(sessionStorage.getItem("activeUser"))
    const postUser = artObj.userId

    if (parseInt(sessionStorage.getItem("activeUser")) === artObj.userId) {
        return `
        <article class="article--container" id="article--${artObj.id}">
            <h3 class="article--title">${artObj.title}</h3>
            <p class="article--user">Posted by: ${artObj.user.username}</p>
            <p class="article--timestamp">Date: ${new Date(artObj.date).toLocaleDateString('en-US')}</p>

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
    } else {
        return `
        <article class="article--container" id="article--${artObj.id}">
            <h3 class="article--title">${artObj.title}</h3>
            <p class="article--user">Posted by: ${artObj.user.username}</p>
            <p class="article--timestamp">Date: ${new Date(artObj.date).toLocaleDateString('en-US')}</p>

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

/*
 .then(() => {
            const currentUser = parseInt(sessionStorage.getItem("activeUser"))
            const postUser = artObj.userId

            if (parseInt(sessionStorage.getItem("activeUser")) === artObj.userId) {
                const editBtn = document.querySelector('.editBtn')
                editBtn.display = 'none'
            }
        })
        */