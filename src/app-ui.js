// import {projectsForTodo, toDoFunction, tasksForToDo } from "./app-logic.js";
import iconImage from "./images/folder-file-svgrepo-com.svg"

function renderProjects(projects) {
  const projectsContainer = document.querySelector("div.projects");
  const addProject = document.querySelector(".add-project");

  for (let i = 0; i < projects.length; i++) {
    const projectDiv = document.createElement("div");
    projectDiv.dataset.id = projects[i].uniqueId;

    const iconImg = document.createElement("img");
    iconImg.setAttribute("src", iconImage);
    iconImg.setAttribute("height", 25);
    iconImg.setAttribute("width", 25);
    projectDiv.appendChild(iconImg);

    const nameProject = document.createElement("p");
    nameProject.textContent = `${projects[i].id}`;
    projectDiv.appendChild(nameProject);

    const numberOfItems = document.createElement("p");
    numberOfItems.textContent = `${projects[i]["todos"].length}`;
    projectDiv.appendChild(numberOfItems);

    projectsContainer.insertBefore(projectDiv, addProject);
  }
}

function getRandomGradient() {
  const angle = Math.floor(Math.random() * 360);
  const color1 = `hsl(${Math.floor(Math.random() * 200)}, 70%, 70%)`;
  const color2 = `hsl(${Math.floor(Math.random() * 200)}, 70%, 70%)`;
  return `linear-gradient(${angle}deg, ${color1}, ${color2})`;
}

function listAndHeading() {
  const mainContent = document.getElementById("main-content");

  const taskList = document.createElement("ul");
  taskList.id = "task-list";

  const taskHeading = document.createElement("p");
  taskHeading.id = "tasks-heading";
  taskList.appendChild(taskHeading);

  const addTaskButton = document.createElement("button");
  addTaskButton.classList.add("add-task-btn");
  addTaskButton.setAttribute("style", "display: block;"); 
  addTaskButton.textContent = "+ Add Tasks";

  mainContent.appendChild(taskList);
  mainContent.appendChild(addTaskButton);
}

function displayTasks(tasks) {
  const taskList = document.getElementById("task-list");

  for (let i = 0; i < tasks.length; i++) {
    const taskItem = document.createElement("li");
    taskItem.classList.add("task-item");
    taskItem.style.backgroundImage = getRandomGradient();
    taskList.appendChild(taskItem);

    const checkboxWrapper = document.createElement("div");
    checkboxWrapper.classList.add("task-checkbox-wrapper");
    taskItem.appendChild(checkboxWrapper);

    const checkboxLabel = document.createElement("label");
    checkboxLabel.classList.add('custom-checkbox-label');
    checkboxWrapper.appendChild(checkboxLabel);

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('task-checkbox');
    checkbox.id = `${tasks[i].id}`;
    checkbox.checked = tasks[i].completeStatus;
    checkboxLabel.appendChild(checkbox);

    const customCheckboxDisplay = document.createElement('span');
    customCheckboxDisplay.classList.add('custom-checkbox-display');
    checkboxLabel.appendChild(customCheckboxDisplay);

    const taskBody = document.createElement("div");
    taskBody.classList.add("task-body");
    taskItem.appendChild(taskBody);

    const taskDetails = document.createElement("div");
    taskDetails.classList.add("task-details");
    taskBody.appendChild(taskDetails);

    const firstPara = document.createElement("p");
    firstPara.classList.add("first-para");
    taskDetails.appendChild(firstPara);

    const titleSpan = document.createElement("span");
    titleSpan.textContent = `${tasks[i].title}`;
    firstPara.appendChild(titleSpan);

    const descriptionSpan = document.createElement("span");

    const secondPara = document.createElement("p");
    secondPara.classList.add("second-para");
    taskDetails.appendChild(secondPara);
  }
}

export { renderProjects, listAndHeading, displayTasks };