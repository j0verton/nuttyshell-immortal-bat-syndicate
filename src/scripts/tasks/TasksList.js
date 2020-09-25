import { CompleteTask, DeleteTask, useTasks } from "./TasksData.js";

const eventHub = document.querySelector("body");

sessionStorage.setItem("modify", false);

eventHub.addEventListener("click", (e) => {
  if (e.target.id.startsWith("dltTaskBtn")) {
    let [prefix, targetId] = e.target.id.split("--");
    DeleteTask(targetId);
  }
  if (e.target.id.startsWith("myTasks")) {
    let [prefix, targetId] = e.target.id.split("--");
    CompleteTask(targetId);
  }
  if (e.target.id.startsWith("taskModify")) {
    let [prefix, targetId] = e.target.id.split("--");
    let selectedTask = useTasks().find((task) => {
      return parseInt(task.id) === parseInt(targetId);
    });
    sessionStorage.setItem("modify", parseInt(targetId));
    newTask.value = selectedTask.task;
    taskDate.value = selectedTask.date;
    newTaskDisplay.style.display = "none";
    inputForm.style.display = "block";
  }
});

export const TasksList = () => {
  let userTasks = useTasks().filter((t) => {
    return (
      parseInt(t.user.id) === parseInt(sessionStorage.getItem("activeUser"))
    );
  });
  let incomplete = userTasks.filter((t) => {
    return t.completed === false;
  });
  const contentTarget = document.querySelector(".tasksContainer");
  contentTarget.innerHTML += `${incomplete
    .map((task) => {
      return `
        
        <section class="taskCard"><div>
        <label for="myTasks--${task.id}">${task.task} ${task.date}
        </label>
        <input type="checkbox" id="myTasks--${task.id}"> <span id="taskModify--${task.id}" class="glyphicon glyphicon-cog"></span> <i class="fa fa-trash-o" id="dltTaskBtn--${task.id}"></i>
        </div></section>
        `;
    })
    .join("")}
        `;
};
