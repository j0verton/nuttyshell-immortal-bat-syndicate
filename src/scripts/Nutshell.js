import { EventList } from "./events/EventList.js"
import { NewMessageForm } from "./messages/MessageForm.js"
import { chatFeed, MessageList } from "./messages/MessageList.js"
import { Tasks } from "./tasks/Tasks.js";
import { ArticleList } from './articles/ArticleList.js'
import "./messages/MessageProvider.js"
import { renderCurrentWeather } from "./weather/WeatherList.js";

export const Nutshell = () => {
    // Render all your UI components here

    //adds current weather to DOM
    renderCurrentWeather()
    //adds events to the DOM
    EventList()
    // adds articles to DOM and enables save and delete functionality
    ArticleList()

    NewMessageForm()
    MessageList()
    chatFeed()
    //adds tasks to dom
    Tasks();
}
