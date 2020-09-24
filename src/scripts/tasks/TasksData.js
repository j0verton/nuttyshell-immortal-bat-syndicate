const eventHub = document.querySelector("body")

let taskList = [];


export const getTasks = () => {
  // fetch("http://localhost:8088/tasks?_expand=users")
  // Will also need a userID to pass to get specific tasks for user.
  return fetch("http://localhost:8088/tasks?_expand=user")
    .then((response) => response.json())
    .then((tasks) => {
      console.log(tasks)
      taskList = tasks;
    });
};
export const useTasks = () => {
  return taskList.slice();
};
