import iconImage from "./images/folder-file-svgrepo-com.svg";
import projectMenu from "./images/menu-dots-svgrepo-com.svg";
import { format } from "date-fns";

function counterUncheckedTasks(tasksArray) {
  let counter = 0;
  for (let i = 0; i < tasksArray.length; i++) {
    if (tasksArray[i].completeStatus === false) {
      counter++;
    }
  }
  return counter;
}

function renderProjects(projects, activeProjectID) {
  const projectsContainer = document.querySelector("ul#projects-list");
  projectsContainer.innerHTML = "";

  for (let i = 0; i < projects.length; i++) {
    const projectDiv = document.createElement("div");
    projectDiv.dataset.id = projects[i].uniqueId;
    projectDiv.className = "project-item";

    // for mobile mode
    if (projects[i].uniqueId === activeProjectID) {
      projectDiv.classList.add("active");
    }

    const iconImg = document.createElement("img");
    iconImg.setAttribute("src", iconImage);
    iconImg.setAttribute("height", 25);
    iconImg.setAttribute("width", 25);
    projectDiv.appendChild(iconImg);

    const nameProject = document.createElement("p");
    nameProject.textContent = `${projects[i].id}`;
    projectDiv.appendChild(nameProject);

    const numberOfItems = document.createElement("p");
    numberOfItems.textContent = `${counterUncheckedTasks(projects[i]["todos"])}`;
    numberOfItems.classList.add("num-of-project-items");
    projectDiv.appendChild(numberOfItems);

    const projectIcon = document.createElement("img");
    projectIcon.setAttribute("src", projectMenu);
    projectIcon.setAttribute("height", 25);
    projectIcon.setAttribute("width", 25);
    projectIcon.classList.add("project-menu-svg");
    projectDiv.appendChild(projectIcon);

    projectsContainer.appendChild(projectDiv);
  }
}

function getRandomGradient() {
  const angle = Math.floor(Math.random() * 360);
  const color1 = `hsl(${Math.floor(Math.random() * 200)}, 70%, 70%)`;
  const color2 = `hsl(${Math.floor(Math.random() * 200)}, 70%, 70%)`;
  return `linear-gradient(${angle}deg, ${color1}, ${color2})`;
}

function displayTasks(tasks) {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";

  for (let i = 0; i < tasks.length; i++) {
    const taskItem = document.createElement("li");
    taskItem.classList.add("task-item");
    if (tasks[i].completeStatus === true) {
      taskItem.classList.add("completed");
    }
    taskItem.style.backgroundImage = getRandomGradient();
    taskList.appendChild(taskItem);

    const checkboxWrapper = document.createElement("div");
    checkboxWrapper.classList.add("task-checkbox-wrapper");
    taskItem.appendChild(checkboxWrapper);

    const checkboxLabel = document.createElement("label");
    checkboxLabel.classList.add("custom-checkbox-label");
    checkboxWrapper.appendChild(checkboxLabel);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("task-checkbox");
    checkbox.id = `${tasks[i].id}`;
    checkbox.checked = tasks[i].completeStatus;
    checkboxLabel.appendChild(checkbox);

    const customCheckboxDisplay = document.createElement("span");
    customCheckboxDisplay.dataset.id = `${tasks[i].id}`;
    customCheckboxDisplay.classList.add("custom-checkbox-display");
    checkboxLabel.appendChild(customCheckboxDisplay);

    const taskBody = document.createElement("div");
    taskBody.classList.add("task-body");
    taskBody.dataset.id = `${tasks[i].id}`;
    taskItem.appendChild(taskBody);

    const taskDetails = document.createElement("div");
    taskDetails.classList.add("task-details");
    taskBody.appendChild(taskDetails);

    const firstPara = document.createElement("p");
    firstPara.classList.add("first-para");
    taskDetails.appendChild(firstPara);

    const titleSpan = document.createElement("span");
    titleSpan.classList.add("titleSpan");
    titleSpan.textContent = `${tasks[i].title}`;
    firstPara.appendChild(titleSpan);

    const descriptionSpan = document.createElement("span");
    descriptionSpan.classList.add("descriptionSpan");
    descriptionSpan.textContent = `${tasks[i].description}`;
    firstPara.appendChild(descriptionSpan);

    const secondPara = document.createElement("p");
    secondPara.classList.add("second-para");
    taskDetails.appendChild(secondPara);

    const prioritySpan = document.createElement("span");
    prioritySpan.textContent = `${tasks[i].priority}`;
    if (prioritySpan.textContent.toUpperCase() === "HIGH") {
      prioritySpan.setAttribute("style", "background-color: #FA8072");
    }
    if (prioritySpan.textContent.toUpperCase() === "LOW") {
      prioritySpan.setAttribute("style", "background-color: lightsteelblue;");
    }
    if (prioritySpan.textContent.toUpperCase() === "NORMAL") {
      prioritySpan.setAttribute("style", "background-color: #F0E68C;");
    }
    prioritySpan.classList.add("priority-pill");
    secondPara.appendChild(prioritySpan);

    const dateSpan = document.createElement("span");
    dateSpan.textContent = `${format(tasks[i].dueDate, "E, MMM d")}`;
    dateSpan.classList.add("date-pill");
    secondPara.appendChild(dateSpan);
  }
}

export { renderProjects, displayTasks, counterUncheckedTasks };
