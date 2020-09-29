import { EventList } from "./events/EventList.js"
import { NewMessageForm } from "./messages/MessageForm.js"
import { MessageList } from "./messages/MessageList.js"
import { Tasks } from "./tasks/Tasks.js";
import { ArticleList } from './articles/ArticleList.js'
import { friendsSetup } from './friends/FriendsList.js'
import { WeatherForLocation } from "./weather/WeatherList.js";
import "./messages/MessageProvider.js"

export const Nutshell = () => {
    // Render all your UI components here

    //adds current weather to DOM
    WeatherForLocation()
    //adds events to the DOM
    EventList()
    // adds articles to DOM and enables save and delete functionality
    ArticleList()

    NewMessageForm()
    MessageList()
    //adds tasks to dom
    Tasks()
    //Adds friends to the DOM
    friendsSetup();
}
