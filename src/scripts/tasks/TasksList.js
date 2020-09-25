import { CompleteTask, DeleteTask, useTasks } from "./TasksData.js"

const eventHub = document.querySelector("body")

eventHub.addEventListener("click", e => {
    if (e.target.id.startsWith("dltTaskBtn")) {
        let [prefix,targetId] = e.target.id.split("--")
        DeleteTask(targetId)
    }
    if (e.target.id.startsWith("myTasks")) {
        let [prefix,targetId] = e.target.id.split("--")     
        CompleteTask(targetId)   

    }
})

export const TasksList = () => {
    let userTasks = useTasks().filter(t => { 
        return parseInt(t.user.id) === parseInt(sessionStorage.getItem("userId")) 
    })
    let uncompleted = userTasks.filter(t => {
        return t.completed === false
    })
    const contentTarget = document.querySelector(".tasksContainer")
    contentTarget.innerHTML += `${uncompleted.map(task => { 
        return `
        
        <section class="taskCard"><div>
        <label for="myTasks--${task.id}">${task.task}
        </label>
        <input type="checkbox" id="myTasks--${task.id}"><i class="fa fa-trash-o" id="dltTaskBtn--${task.id}"></i>
        </div></section>
        `
     }).join("")}
        `
}