import { ArticleForm } from './articles/ArticleForm.js'
import { ArticleList } from './articles/ArticleList.js'

export const Nutshell = () => {
    // Render all your UI components here

    // creates new article form
    ArticleForm()

    // adds articles to DOM and enables save and delete functionality
    ArticleList()
}