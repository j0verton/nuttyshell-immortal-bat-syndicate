import { getTasks } from "./TasksData.js";
import { TasksList } from "./TasksList.js";

const eventHub = document.querySelector("body");

export const TasksSetup = () => {
  sessionStorage.setItem("userId",1)
  const contentTarget = document.querySelector("#main");
  contentTarget.innerHTML += `
  <h3>Tasks</h3>
 <div class="tasksContainer"></div>
 `;
};

export const TasksHTML = () => {};
getTasks()
.then(_ => {
  TasksSetup();
  TasksList();
});
