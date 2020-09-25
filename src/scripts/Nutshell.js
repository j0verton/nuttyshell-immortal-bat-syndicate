import { EventList } from "./events/EventList.js"
import { NewMessageForm } from "./messages/MessageForm.js"
import { MessageList } from "./messages/MessageList.js"
import { Tasks } from "./tasks/Tasks.js";
import { ArticleList } from './articles/ArticleList.js'
import "./messages/MessageProvider.js"

export const Nutshell = () => {
    // Render all your UI components here

    EventList()

    // adds articles to DOM and enables save and delete functionality
    ArticleList()

    NewMessageForm()
    MessageList()
    //adds tasks to dom
    Tasks();
}
