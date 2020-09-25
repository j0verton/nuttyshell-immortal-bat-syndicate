import { EventList } from "./events/EventList.js"
import { NewMessageForm } from "./messages/MessageForm.js"
import { MessageList } from "./messages/MessageList.js"
import "./messages/MessageProvider.js"
export const Nutshell = () => {
    // Render all your UI components here
    NewMessageForm()
    MessageList()
    EventList()
}