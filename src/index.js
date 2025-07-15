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

    if(projectsModule.projects().length === 0){

        projectsModule.createProject("Default");
        projectsModule.switchProject(projectsModule.projects()[0].uniqueId);
        projectsModule.putToDoIntoProject("Read javascript", "Read factory functions in detail", "2025-03-25", "normal");
        projectsModule.putToDoIntoProject("clean floor", "with vaccum cleaner", "2025-07-15", "high");

        projectsModule.createProject("Education");
        projectsModule.switchProject(projectsModule.projects()[1].uniqueId);
        projectsModule.putToDoIntoProject("drink milk", "oatmilk 5%", "2025-07-07", "low");
    }

    if(projectsListContainer){
        projectsListContainer.addEventListener("click", (event) => {
            const projectItem = event.target.closest(".project-item");
            if(projectItem){
                projectsModule.switchProject(projectItem.dataset.id);
                taskHeading.textContent = projectsModule.getActiveProject().id;
                refreshUI();
            }
        });
    }


    refreshUI();
}
main();