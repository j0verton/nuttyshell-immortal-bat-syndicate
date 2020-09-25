import { EventList } from "./events/EventList.js"
import { ArticleList } from './articles/ArticleList.js'

export const Nutshell = () => {
    // Render all your UI components here

    EventList()

    // adds articles to DOM and enables save and delete functionality
    ArticleList()
}