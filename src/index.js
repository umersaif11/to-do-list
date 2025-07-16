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

    const addProject = document.querySelector("div.add-project");
    const dialogAddProject = document.querySelector("dialog#project-dialog");
    const submitAddProject = document.querySelector("button#add-project-btn");
    const cancelAddProject = document.querySelector("button#cancel-project-btn");
    const inputAddProject = document.querySelector("input#projectTitle");

    if(addProject){
        addProject.addEventListener("click", () => {
            inputAddProject.value = '';
            dialogAddProject.showModal();
        });

        cancelAddProject.addEventListener("click", () => {
            dialogAddProject.close();
        });

        submitAddProject.addEventListener("click", (event) => {
            event.preventDefault();
            projectsModule.createProject(inputAddProject.value);
            const lastCreatedProject = projectsModule.projects()[projectsModule.projects().length - 1];
            projectsModule.switchProject(lastCreatedProject.uniqueId);
            taskHeading.textContent = projectsModule.getActiveProject().id;
            refreshUI();
            dialogAddProject.close();
        })
    }

    const addTask = document.querySelector(".add-task-btn");
    const dialogAddTask = document.querySelector("dialog#todo-dialog");
    const submitAddTask = document.querySelector("button#add-task-button");
    const cancelAddTask = document.querySelector("button#cancel-task-btn");

    const inputTaskTitle = document.querySelector("input#task-title-input");
    const inputDescripTitle = document.querySelector("textarea#task-descrip-input");
    const inputTaskDate = document.querySelector("input#task-date-input");
    const inputTaskPriority = document.querySelector("select#priority-input");

    if(addTask){
        addTask.addEventListener("click", () => {
            inputTaskTitle.value = '';
            inputDescripTitle.value = '';
            inputTaskDate.value = '';
            dialogAddTask.showModal();
        });

        cancelAddTask.addEventListener("click", () => {
            dialogAddTask.close();
        });

        submitAddTask.addEventListener("click", (event) => {
            event.preventDefault();
            projectsModule.putToDoIntoProject(inputTaskTitle.value,
                inputDescripTitle.value,
                inputTaskDate.value,
                inputTaskPriority.value
            );
            refreshUI();
            dialogAddTask.close();
        })
    }

    const editTask = document.querySelector("ul#task-list");
    const dialogEditTask = document.querySelector("dialog#modifyTodoDialog");
    const submitEditTask = document.querySelector("button#submit-editTask-btn");
    const deleteTask = document.querySelector("button#deleteTaskButton");

    const inputEditTaskTitle = document.querySelector("input#editTask-title-input");
    const inputEditTaskDescrip = document.querySelector("textarea#editTask-descrip-input");
    const inputEditTaskDate = document.querySelector("input#editTask-date-input");
    const inputEditTaskPriority = document.querySelector("select#editPriority-input");

    if(editTask){
        editTask.addEventListener("click", (event) => {
            const taskItem = event.target.closest(".task-body");
            if(taskItem){
                deleteTask.dataset.id = event.target.dataset.id;
                submitEditTask.dataset.id = event.target.dataset.id;

                const allTasksArray = tasksModule.getAllTasks();
                const clickedTask = allTasksArray.find(obj => 
                    obj.id === event.target.dataset.id);

                inputEditTaskTitle.value = clickedTask.title;
                inputEditTaskDescrip.value = clickedTask.description;
                inputEditTaskDate.value = clickedTask.dueDate;
                inputEditTaskPriority.value = clickedTask.priority;

                 dialogEditTask.showModal();
            }
        });

        deleteTask.addEventListener("click", (event) => {
            projectsModule.removeToDoFromProject(event.target.dataset.id);
            refreshUI();
            dialogEditTask.close();
        });

        submitEditTask.addEventListener("click", (event) => {
            const updateObject = {
            title: inputEditTaskTitle.value,
            description: inputEditTaskDescrip.value,
            dueDate: inputEditTaskDate.value,
            priority: inputEditTaskPriority.value
        }
            projectsModule.editToDo(event.target.dataset.id, updateObject);
            refreshUI();
            dialogEditTask.close();
        })
    }


    taskHeading.textContent = projectsModule.getActiveProject().id;
    refreshUI();
}
main();