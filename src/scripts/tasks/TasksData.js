const eventHub = document.querySelector("body");

let taskList = [];

const dispatchStateChangeEvent = () => {
  const taskStateChangedEvent = new CustomEvent("taskStateChanged");

  eventHub.dispatchEvent(taskStateChangedEvent);
};

export const getTasks = () => {
  // fetch("http://localhost:8088/tasks?_expand=users")
  // Will also need a userID to pass to get specific tasks for user.
  return fetch("http://localhost:8088/tasks?_expand=user")
    .then((response) => response.json())
    .then((tasks) => {
      taskList = tasks;
    });
};
export const useTasks = () => {
  return taskList.slice();
};
export const SaveTask = (task) => {
  return fetch("http://localhost:8088/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  })
    .then(getTasks)
    .then(dispatchStateChangeEvent);
};

export const DeleteTask = (id) => {
  return fetch(`http://localhost:8088/tasks/${id}`, {
    method: "DELETE",
  })
    .then(getTasks)
    .then(dispatchStateChangeEvent);
};
export const CompleteTask = (id) => {
  return fetch(`http://localhost:8088/tasks/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      completed: true
    })
  })
    .then(getTasks)
    .then(dispatchStateChangeEvent);
};
