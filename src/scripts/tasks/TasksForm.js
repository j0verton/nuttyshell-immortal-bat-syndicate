import { SaveTask } from "./TasksData.js";

const eventHub = document.querySelector("body");


///Changes the visibility of the new task button and form.
eventHub.addEventListener("click", (e) => {
    if (e.target.id === "newTaskDisplay") {
        newTaskDisplay.style.display = "none"
        newTask.value = ""
        taskDate.value = ""
        inputForm.style.display = "block"
    }
    else if (e.target.id === "cancelTaskBtn") {
        newTaskDisplay.style.display = "block"
        inputForm.style.display = "none"
    }
  else if (e.target.id === "saveTaskBtn") {
      console.log("Save Button Clicked",e.target.value)
    if (document.getElementById("newTask").value) {
      const newTask = {
        userId: sessionStorage.getItem("userId"),
        task: document.getElementById("newTask").value,
        date: document.getElementById("taskDate").value,
        completed: false
      };
      SaveTask(newTask)
    }
  }
});

export const TaskForm = () => {
  const contentTarget = document.querySelector(".tasksForm");
  contentTarget.innerHTML = `
  <button id="newTaskDisplay">New Task</button>
  <div id="inputForm" style="display:none">
    <input id="newTask" type="text" placeholder="To Do">
    <label for="taskDate"> Complete By: </label>
    <input type="date" id="taskDate">
    <button id="saveTaskBtn">Save Task</button><button id="cancelTaskBtn">Cancel</button> </div>
    `;
};
