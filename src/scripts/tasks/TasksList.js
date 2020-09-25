import { DeleteTask, useTasks } from "./TasksData.js"

const eventHub = document.querySelector("body")

eventHub.addEventListener("click", e => {
    if (e.target.id.startsWith("dltTaskBtn")) {
        console.log("Delete Button Clicked")
        let [prefix,targetId] = e.target.id.split("--")
        DeleteTask(targetId)
    }
})

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
        <input type="checkbox" id="myTasks--${task.id}"><i class="fa fa-trash-o" id="dltTaskBtn--${task.id}"></i>
        </div></section>
        `
     }).join("")}
        `
}