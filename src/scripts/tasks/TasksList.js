import { useTasks } from "./TasksData.js"

const eventHub = document.querySelector("body")



export const TasksList = () => {
    let userTasks = useTasks().filter(t => { 
        return parseInt(t.user.id) === parseInt(sessionStorage.getItem("userId")) 
    })
    const contentTarget = document.querySelector(".tasksContainer")
    contentTarget.innerHTML += `${userTasks.map(task => { 
        return `
        
        <section class="taskCard"><div>
        <label for="myTasks--${task.id}">${task.task}
        </label>
        <input type="checkbox" id="myTasks--${task.id}">
        </div></section>
        `
     }).join("")}
        `
}