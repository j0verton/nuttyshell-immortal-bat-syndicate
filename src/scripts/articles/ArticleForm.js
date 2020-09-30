// form presented to user to add news article

import { saveArticle, editArticle } from './ArticleProvider.js'
import { replaceTs } from '../replaceTs.js'

const eventHub = document.querySelector("body")

// share article functionality
eventHub.addEventListener("click", event => {
    if (event.target.id === "saveArticle") {

        const title = document.getElementById("input--title")
        const synopsis = document.getElementById("input--synopsis")
        const url = document.getElementById("input--url")
        const id = document.getElementById('entryId')

        if (id.value) {

            const artArr = [
                document.getElementById('input--title'),
                document.getElementById('input--synopsis'),
                document.getElementById('input--url')
            ]

            replaceTs(artArr)

            const editedArticle = {
                userId: parseInt(sessionStorage.getItem("activeUser")),
                title: title.value,
                date: Date.now(),
                synopsis: synopsis.value,
                url: url.value,
                id: parseInt(id.value)
            }

            editArticle(editedArticle)

        } else if (title.value !== "" && synopsis.value !== "" && url.value !== "") {

            const artArr = [
                document.getElementById('input--title'),
                document.getElementById('input--synopsis'),
                document.getElementById('input--url')
            ]

            replaceTs(artArr)

            const newArticle = {
                userId: parseInt(sessionStorage.getItem("activeUser")),
                title: title.value,
                date: Date.now(),
                synopsis: synopsis.value,
                url: url.value
            }

            saveArticle(newArticle)

        } else {
            window.alert("Please fill in all fields.")
        }
    }
})

// renders form
export const ArticleForm = () => {
    const contentTarget = document.getElementById("newsContainer")

    // note: full url required
    contentTarget.innerHTML += `
        <section id="formModal" class="modal">
            <form id="input--form" class="modal-content">
                <div id="input--header">
                    <h3 id="modalGreeting">Share an ArTicle</h3>
                    <span id="modalClose">&times;</span>
                </div>

                <input type="hidden" name="entryId" id="entryId">
                <input type="text" id="input--title" placeholder="TiTle of the ArTicle"></input>

                <textarea id="input--synopsis" placeholder="Please include a synopsis..." rows="10" cols="50"></textarea>

                <input type="text" id="input--url" placeholder="Copy/PasTe URL of ArTicle Here"></input>

                <button id="saveArticle" type="reset">Share</button>
            </form>
        </section>
    `
}