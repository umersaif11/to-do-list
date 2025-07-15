// index.js

import "./styles.css";
import { projectsForTodo, tasksForToDo } from "./app-logic.js";
import { renderProjects, displayTasks } from "./app-ui.js";

function main(){
    const projectsModule = projectsForTodo();
    const tasksModule = tasksForToDo();

    const projectsListContainer = document.querySelector("ul#projects-list");
    const tasksListContainer = document.querySelector("ul#task-list");
    const taskHeading = document.querySelector(".tasks-heading");

    function refreshUI(){
        const allProjects = projectsModule.projects();
        const activeProject = projectsModule.getActiveProject();

        if(projectsListContainer){
            renderProjects(allProjects);
        }
        if(tasksListContainer && activeProject){
            displayTasks(activeProject["todos"]);
        }
    }



}