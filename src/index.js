// index.js

import "./styles.css";
import { projectsForTodo, toDoFunction, tasksForToDo } from "./app-logic.js";
import { renderProjects, displayTasks } from "./app-ui.js";

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


renderProjects(projects.projects());

const projectsContainer = document.querySelector("ul#projects-list");
const taskHeading = document.querySelector(".tasks-heading");


taskHeading.textContent = projects.getActiveProject().id;
displayTasks(projects.projects()[0]["todos"]);

projectsContainer.addEventListener("click", (event) => { 
    const projectItem = event.target.closest(".project-item");
    if(projectItem){
        projects.switchProject(projectItem.dataset.id);
        console.log(projects.getActiveProject());
        displayTasks(projects.getActiveProject()["todos"]);
        taskHeading.textContent = projects.getActiveProject().id;
    }
});