// index.js

import "./styles.css";
import { projectsForTodo, toDoFunction, tasksForToDo } from "./app-logic.js";
import { renderProjects, listAndHeading, displayTasks } from "./app-ui.js";

const toDo = toDoFunction();
const projects = projectsForTodo();
const tasks = tasksForToDo();

if (projects.projects().length === 0) {
  projects.createProject("defaultProject");
  projects.switchProject("defaultProject");
  projects.putToDoIntoProject("Read javascript", "Read factory functions in detail", "2025-03-25", "normal");
  projects.putToDoIntoProject("clean floor", "with vaccum cleaner", "2025-07-15", "high");

  projects.createProject("Education");
  projects.switchProject("Education");
  projects.putToDoIntoProject("drink milk", "oatmilk 5%", "2025-07-07", "low");
}

console.log(projects.getActiveProject());
console.log(projects.projects());

// --- Example Usage (Commented Out) ---
// projects.removeToDoFromProject("3db4da3b-847b-4ecc-8fc3-876a0dea1e5d");
// projects.editToDo("8648221d-f15b-41f1-940d-b4c0a2f34d43", {
//   title: "Read java",
//   description: "Read Factory"
// });
// projects.toggleCompleteStatus("db63a17d-c794-4389-87f8-5fc329988f9f");
// projects.renameProject("Education", "ED-ucation");
// projects.deleteProject("ED-ucation");
// console.log(tasks.getAllTasks());
// console.log(tasks.getTodayTasks());
// console.log(tasks.getScheduledTasks());
// console.log(tasks.getOverdueTasks());

renderProjects(projects.projects());

const projectsContainer = document.querySelector("div.projects");

projectsContainer.addEventListener("click", (event) => {
  listAndHeading();
  const taskHeading = document.getElementById("tasks-heading");

  for (let i = 0; i < projects.projects().length; i++) {
    if (event.target.dataset.id === projects.projects()[i].uniqueId) {
      projects.switchProject(projects.projects()[i].id);
      taskHeading.textContent = projects.getActiveProject();
      // displayTasks();
    }
  }
});