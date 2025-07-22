// index.js

import "./styles.css";
import { projectsForTodo } from "./app-logic.js";
import {
  renderProjects,
  displayTasks,
  counterUncheckedTasks,
} from "./app-ui.js";

function main() {
  const projectsModule = projectsForTodo();

  const stateVariable = { currentView: "active-project" };
  let projectItemIdForRenameListener = null;

  const addTask = document.querySelector(".add-task-btn");

  const projectsListContainer = document.querySelector("ul#projects-list");
  const tasksListContainer = document.querySelector("ul#task-list");
  const taskHeading = document.querySelector(".tasks-heading");

  function refreshUI() {
    const allProjects = projectsModule.projects();
    const activeProject = projectsModule.getActiveProject();

    const numberToday = document.querySelector(".number.today");
    const numberSchedule = document.querySelector(".number.schedule");
    const numberOverdue = document.querySelector(".number.overdue");
    const numberAll = document.querySelector(".number.all");

    // this variable and below if condition is to activate the active' class
    // on clicked .project-item when on mobile mode
    let activeIdToRender = null;
    if (stateVariable.currentView === "active-project" && activeProject) {
      activeIdToRender = activeProject.uniqueId;
    }

    if (projectsListContainer) {
      renderProjects(allProjects, activeIdToRender);
    }

    if (stateVariable.currentView === "active-project") {
      if (tasksListContainer && activeProject) {
        displayTasks(activeProject["todos"]);
      }
      addTask.setAttribute("style", "display:block");
    } else {
      addTask.setAttribute("style", "display:none");
    }

    if (stateVariable.currentView === "today-tasks") {
      displayTasks(projectsModule.getTodayTasks());
    }
    if (stateVariable.currentView === "schedule-tasks") {
      displayTasks(projectsModule.getScheduledTasks());
    }
    if (stateVariable.currentView === "overdue-tasks") {
      displayTasks(projectsModule.getOverdueTasks());
    }
    if (stateVariable.currentView === "all-tasks") {
      displayTasks(projectsModule.getAllTasks());
    }
    projectsModule.getAllTasks();

    numberToday.textContent = counterUncheckedTasks(
      projectsModule.getTodayTasks(),
    );
    numberSchedule.textContent = counterUncheckedTasks(
      projectsModule.getScheduledTasks(),
    );
    numberOverdue.textContent = counterUncheckedTasks(
      projectsModule.getOverdueTasks(),
    );
    numberAll.textContent = counterUncheckedTasks(projectsModule.getAllTasks());
  }

  if (projectsModule.projects().length === 0) {
    projectsModule.createProject("Education");
    projectsModule.switchProject(projectsModule.projects()[0].uniqueId);
    projectsModule.putToDoIntoProject(
      "Read javascript",
      "Read factory functions in detail",
      "2025-03-25",
      "normal",
    );
    projectsModule.putToDoIntoProject(
      "SOLID principles",
      "Watch some videos and read articles",
      null,
      "high",
    );
    projectsModule.putToDoIntoProject(
      "DOM in detail",
      "Read documentation of advanced DOM manipulation techniques",
      "2025-12-10",
      "low",
    );

    projectsModule.createProject("Exercise");
    projectsModule.switchProject(projectsModule.projects()[1].uniqueId);
    projectsModule.putToDoIntoProject(
      "Chest day",
      "Benchpress, dumbell press and push-ups",
      "2025-07-07",
      "high",
    );
    projectsModule.putToDoIntoProject(
      "Walk",
      "Walk for 45 minutes and then sprint in last 5 minutes",
      null,
      "normal",
    );
    projectsModule.putToDoIntoProject(
      "Wings day",
      "Dumbell pullover, deadlift, bent over row",
      "2025-12-30",
      "low",
    );

    projectsModule.createProject("Maintenance");
    projectsModule.switchProject(projectsModule.projects()[2].uniqueId);
    projectsModule.putToDoIntoProject(
      "Door lock",
      "Front door lock need to be replaced",
      "2025-03-03",
      "low",
    );
    projectsModule.putToDoIntoProject(
      "Clean floor",
      "With vaccum cleaner",
      null,
      "high",
    );
    projectsModule.putToDoIntoProject(
      "PC ssd",
      "With 2TB Nvme ssd 4th generation",
      "2025-12-15",
      "normal",
    );

    projectsModule.switchProject(projectsModule.projects()[0].uniqueId);
  }

  const renameProjectDialog = document.querySelector("#modifyProjectDialog");
  const renameProjectInput = document.querySelector("#modifyProjectTitleInput");
  const confirmRenameProject = document.querySelector("#submitDialogButton");
  const cancelRenameProject = document.querySelector("#closeDialogButton");

  if (projectsListContainer) {
    projectsListContainer.addEventListener("click", (event) => {
      const projectItem = event.target.closest(".project-item");
      projectItemIdForRenameListener = projectItem.dataset.id;

      if (event.target.classList.contains("project-menu-svg")) {
        event.stopPropagation();
        const alreadyExistingPopup = document.querySelector(".pop-up");
        if (alreadyExistingPopup) {
          alreadyExistingPopup.remove();
        }
        const popUpDiv = document.createElement("div");
        popUpDiv.classList.add("pop-up");
        const menuSvgPosition = event.target.getBoundingClientRect();
        const svgTopDistance = menuSvgPosition.top + window.scrollY - 20;
        const svgLeftDistance = menuSvgPosition.right + window.scrollX + 15;
        popUpDiv.style.top = `${svgTopDistance}px`;
        popUpDiv.style.left = `${svgLeftDistance}px`;

        const renameProject = document.createElement("p");
        renameProject.classList.add("rename-project-button");
        renameProject.textContent = "Rename";

        const deleteProject = document.createElement("p");
        deleteProject.textContent = "Delete";

        popUpDiv.appendChild(renameProject);
        popUpDiv.appendChild(deleteProject);

        document.body.appendChild(popUpDiv);

        const clickAnywhereElse = () => {
          if (!popUpDiv.contains(event.target)) {
            popUpDiv.remove();
          }
        };
        window.addEventListener("click", () => {
          clickAnywhereElse();
          window.removeEventListener("click", clickAnywhereElse);
        });

        deleteProject.addEventListener("click", () => {
          projectsModule.deleteProject(projectItem.dataset.id);
          refreshUI();
        });
        if (renameProject) {
          renameProject.addEventListener("click", () => {
            const clickedProject = projectsModule
              .projects()
              .find((project) => project.uniqueId === projectItem.dataset.id);
            renameProjectInput.value = clickedProject.id;

            renameProjectDialog.showModal();
          });
        }
      } else {
        stateVariable.currentView = "active-project";
        projectsModule.switchProject(projectItem.dataset.id);
        taskHeading.textContent = projectsModule.getActiveProject().id;
        refreshUI();
      }
    });
  }

  cancelRenameProject.addEventListener("click", () => {
    renameProjectDialog.close();
  });

  confirmRenameProject.addEventListener("click", () => {
    projectsModule.renameProject(
      projectItemIdForRenameListener,
      renameProjectInput.value,
    );
    refreshUI();
    renameProjectDialog.close();
  });

  const addProject = document.querySelector("div.add-project");
  const dialogAddProject = document.querySelector("dialog#project-dialog");
  const submitAddProject = document.querySelector("button#add-project-btn");
  const cancelAddProject = document.querySelector("button#cancel-project-btn");
  const inputAddProject = document.querySelector("input#projectTitle");

  if (addProject) {
    addProject.addEventListener("click", () => {
      inputAddProject.value = "";
      dialogAddProject.showModal();
    });

    cancelAddProject.addEventListener("click", () => {
      dialogAddProject.close();
    });

    submitAddProject.addEventListener("click", (event) => {
      event.preventDefault();
      stateVariable.currentView = "active-project";
      projectsModule.createProject(inputAddProject.value);
      const lastCreatedProject =
        projectsModule.projects()[projectsModule.projects().length - 1];
      projectsModule.switchProject(lastCreatedProject.uniqueId);
      taskHeading.textContent = projectsModule.getActiveProject().id;
      refreshUI();
      dialogAddProject.close();
    });
  }

  const dialogAddTask = document.querySelector("dialog#todo-dialog");
  const submitAddTask = document.querySelector("button#add-task-button");
  const cancelAddTask = document.querySelector("button#cancel-task-btn");

  const inputTaskTitle = document.querySelector("input#task-title-input");
  const inputDescripTitle = document.querySelector(
    "textarea#task-descrip-input",
  );
  const inputTaskDate = document.querySelector("input#task-date-input");
  const inputTaskPriority = document.querySelector("select#priority-input");

  if (addTask) {
    addTask.addEventListener("click", () => {
      inputTaskTitle.value = "";
      inputDescripTitle.value = "";
      inputTaskDate.value = "";
      dialogAddTask.showModal();
    });

    cancelAddTask.addEventListener("click", () => {
      dialogAddTask.close();
    });

    submitAddTask.addEventListener("click", (event) => {
      event.preventDefault();
      const inputDate = inputTaskDate.value;
      let dueDate = null;

      if (inputDate) {
        const [inputYear, inputMonth, inputDay] = inputDate.split("-");
        dueDate = new Date(inputYear, inputMonth - 1, inputDay);
      }

      projectsModule.putToDoIntoProject(
        inputTaskTitle.value,
        inputDescripTitle.value,
        dueDate,
        inputTaskPriority.value,
      );
      stateVariable.currentView = "active-project";
      refreshUI();
      dialogAddTask.close();
    });
  }

  const editTask = document.querySelector("ul#task-list");
  const dialogEditTask = document.querySelector("dialog#modifyTodoDialog");
  const submitEditTask = document.querySelector("button#submit-editTask-btn");
  const deleteTask = document.querySelector("button#deleteTaskButton");

  const inputEditTaskTitle = document.querySelector(
    "input#editTask-title-input",
  );
  const inputEditTaskDescrip = document.querySelector(
    "textarea#editTask-descrip-input",
  );
  const inputEditTaskDate = document.querySelector("input#editTask-date-input");
  const inputEditTaskPriority = document.querySelector(
    "select#editPriority-input",
  );

  if (editTask) {
    editTask.addEventListener("click", (event) => {
      const taskItem = event.target.closest(".task-body");

      if (taskItem) {
        deleteTask.dataset.id = taskItem.dataset.id;
        submitEditTask.dataset.id = taskItem.dataset.id;

        let clickedTask = "";

        for (let i = 0; i < projectsModule.projects().length; i++) {
          clickedTask = projectsModule
            .projects()
            [i]["todos"].find((task) => task.id === taskItem.dataset.id);
          if (clickedTask) {
            break;
          }
        }

        inputEditTaskTitle.value = clickedTask.title;
        inputEditTaskDescrip.value = clickedTask.description;
        inputEditTaskDate.value = clickedTask.dueDate;
        inputEditTaskPriority.value = clickedTask.priority;

        dialogEditTask.showModal();
      }
      if (event.target.classList.contains("custom-checkbox-display")) {
        projectsModule.toggleCompleteStatus(event.target.dataset.id);
        refreshUI();
      }
    });

    deleteTask.addEventListener("click", (event) => {
      projectsModule.removeToDoFromProject(event.target.dataset.id);
      refreshUI();
      dialogEditTask.close();
    });

    submitEditTask.addEventListener("click", (event) => {
      const inputDate = inputEditTaskDate.value;
      let dueDate = null;

      if (inputDate) {
        const [inputYear, inputMonth, inputDay] = inputDate.split("-");
        dueDate = new Date(inputYear, inputMonth - 1, inputDay);
      } else {
        const clickedTask = projectsModule.getTaskById(event.target.dataset.id);
        dueDate = clickedTask.dueDate;
      }

      const updateObject = {
        title: inputEditTaskTitle.value,
        description: inputEditTaskDescrip.value,
        dueDate: dueDate,
        priority: inputEditTaskPriority.value,
      };
      projectsModule.editToDo(event.target.dataset.id, updateObject);
      refreshUI();
      dialogEditTask.close();
    });
  }

  const filteredTasksContainer = document.querySelector("div.task.test");

  if (filteredTasksContainer) {
    filteredTasksContainer.addEventListener("click", (event) => {
      const filterToday = event.target.closest(".sidebar-item.today");
      if (filterToday) {
        stateVariable.currentView = "today-tasks";
        taskHeading.textContent = "Today";
        refreshUI();
      }
      const filterSchedule = event.target.closest(".sidebar-item.schedule");
      if (filterSchedule) {
        stateVariable.currentView = "schedule-tasks";
        taskHeading.textContent = "Scheduled";
        refreshUI();
      }
      const filterOverdue = event.target.closest(".sidebar-item.overdue");
      if (filterOverdue) {
        stateVariable.currentView = "overdue-tasks";
        taskHeading.textContent = "Overdue";
        refreshUI();
      }
      const filterAll = event.target.closest(".sidebar-item.all");
      if (filterAll) {
        stateVariable.currentView = "all-tasks";
        taskHeading.textContent = "All";
        refreshUI();
      }
    });
  }

  const toggelButton = document.getElementById("hamburger");
  const sidebar = document.getElementById("sidebar-container");

  toggelButton.addEventListener("click", () => {
    sidebar.classList.toggle("close");
  });

  const mainContentArea = document.getElementById("main-content");
  mainContentArea.addEventListener(
    "click",
    (event) => {
      if (!sidebar.classList.contains("close") && window.innerWidth < 768) {
        sidebar.classList.add("close");
        event.stopPropagation();
      }
    },
    { capture: true },
  );

  taskHeading.textContent = projectsModule.getActiveProject().id;
  refreshUI();
}
main();
