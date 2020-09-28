import { EventList } from "./events/EventList.js";
import { Tasks } from "./tasks/Tasks.js";
import { ArticleList } from './articles/ArticleList.js'
import { WeatherForLocation } from "./weather/WeatherList.js";

export const Nutshell = () => {
    // Render all your UI components here

    //adds current weather to DOM
    WeatherForLocation()
    //adds events to the DOM
    EventList()
    // adds articles to DOM and enables save and delete functionality
    ArticleList()
    //adds tasks to dom
    Tasks();
}
