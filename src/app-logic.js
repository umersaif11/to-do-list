import { isToday, isFuture, isBefore, startOfToday } from "date-fns";

function toDoFunction() {
  const validateTitle = (title) =>
    (title = typeof title === "string" ? title : "no title");

  const validateDescription = (description) =>
    (description =
      typeof description === "string" ? description : "no description");

  const validateDate = (dueDate) =>
    (dueDate = dueDate ? new Date(dueDate) : new Date());

  const validatePriority = (priority) =>
    (priority = priority
      ? priority.toUpperCase() === "HIGH" ||
        priority.toUpperCase() === "NORMAL" ||
        priority.toUpperCase() === "LOW"
        ? priority
        : "Normal"
      : null);

  const toDoItem = (title, description, dueDate, priority) => {
    title = validateTitle(title);
    description = validateDescription(description);
    dueDate = validateDate(dueDate);
    priority = validatePriority(priority);

    let id = crypto.randomUUID();
    let completeStatus = false;

    return { id, completeStatus, title, description, dueDate, priority };
  };

  return {
    validateTitle,
    validateDescription,
    validateDate,
    validatePriority,
    toDoItem,
  };
}

function projectsForTodo() {
  const projectsArrayJSON = JSON.parse(
    localStorage.getItem("projectsArrayJSON"),
  );
  const toDo = toDoFunction();
  let projectsArray = projectsArrayJSON === null ? [] : projectsArrayJSON;

  //   const convertStringdatToObject = () => {
  //     projectsArray.forEach((project) => {
  //         project["todos"].forEach((task) => {
  //             task.dueDate = new Date(task.dueDate);
  //         })
  //     })
  //   };
  //   convertStringdatToObject();

  const projects = () => projectsArray;

  const createProject = (projectName = "Practice TOP") => {
    projectName = { id: `${projectName}`, uniqueId: crypto.randomUUID() };
    projectName["todos"] = [];
    projectsArray.push(projectName);
    localStorage.setItem("projectsArrayJSON", JSON.stringify(projectsArray));
  };

  let activeProjectId =
    projectsArray.length > 0 ? projectsArray[0].uniqueId : null;

  const switchProject = (projectUniqueId) => {
    activeProjectId = projectUniqueId;
  };

  const getActiveProject = () =>
    projectsArray.find((p) => p.uniqueId === activeProjectId);

  const renameProject = (projectId, newProjectName) => {
    for (let i = 0; i < projectsArray.length; i++) {
      if (projectsArray[i].uniqueId === projectId) {
        projectsArray[i].id = newProjectName;
      }
    }
    localStorage.setItem("projectsArrayJSON", JSON.stringify(projectsArray));
  };

  const deleteProject = (projectId) => {
    for (let i = 0; i < projectsArray.length; i++) {
      if (projectsArray[i].uniqueId === projectId) {
        projectsArray.splice(i, 1);
      }
    }
    localStorage.setItem("projectsArrayJSON", JSON.stringify(projectsArray));
  };

  const putToDoIntoProject = (title, description, dueDate, priority) => {
    for (let i = 0; i < projectsArray.length; i++) {
      if (projectsArray[i].uniqueId === getActiveProject().uniqueId) {
        projectsArray[i]["todos"].push(
          toDo.toDoItem(title, description, dueDate, priority),
        );
        localStorage.setItem(
          "projectsArrayJSON",
          JSON.stringify(projectsArray),
        );
      }
    }
  };

  const removeToDoFromProject = (itemIdtoRemove) => {
    for (let i = 0; i < projectsArray.length; i++) {
      for (let j = 0; j < projectsArray[i]["todos"].length; j++) {
        if (projectsArray[i]["todos"][j].id === itemIdtoRemove) {
          projectsArray[i]["todos"].splice(j, 1);
          localStorage.setItem(
            "projectsArrayJSON",
            JSON.stringify(projectsArray),
          );
        }
      }
    }
  };

  const editToDo = (editId, { title, description, dueDate, priority }) => {
    for (let i = 0; i < projectsArray.length; i++) {
      for (let j = 0; j < projectsArray[i]["todos"].length; j++) {
        if (projectsArray[i]["todos"][j].id === editId) {
          if (title) {
            title = toDo.validateTitle(title);
            projectsArray[i]["todos"][j].title = title;
          }
          if (description) {
            description = toDo.validateDescription(description);
            projectsArray[i]["todos"][j].description = description;
          }
          if (dueDate) {
            dueDate = toDo.validateDate(dueDate);
            projectsArray[i]["todos"][j].dueDate = dueDate;
          }
          if (priority) {
            priority = toDo.validatePriority(priority);
            projectsArray[i]["todos"][j].priority = priority;
          }
          localStorage.setItem(
            "projectsArrayJSON",
            JSON.stringify(projectsArray),
          );
        }
      }
    }
  };

  const getTaskById = (taskId) => {
    for (const project of projectsArray) {
      const task = project["todos"].find((t) => t.id === taskId);

      if (task) return task;
    }
    return null;
  };

  const toggleCompleteStatus = (itemId) => {
    for (let i = 0; i < projectsArray.length; i++) {
      for (let j = 0; j < projectsArray[i]["todos"].length; j++) {
        if (projectsArray[i]["todos"][j].id === itemId) {
          projectsArray[i]["todos"][j].completeStatus =
            !projectsArray[i]["todos"][j].completeStatus;
          localStorage.setItem(
            "projectsArrayJSON",
            JSON.stringify(projectsArray),
          );
        }
      }
    }
  };

  const getAllTasks = () => {
    const allTasks = [];
    for (let i = 0; i < projectsArray.length; i++) {
      for (let j = 0; j < projectsArray[i]["todos"].length; j++) {
        if (projectsArray[i]["todos"][j].completeStatus === false) {
          allTasks.push(projectsArray[i]["todos"][j]);
        }
      }
    }
    return allTasks;
  };

  const getTodayTasks = () => {
    const todayTasks = [];
    const allTasks = getAllTasks();
    for (let i = 0; i < allTasks.length; i++) {
      if (isToday(allTasks[i].dueDate)) {
        todayTasks.push(allTasks[i]);
      }
    }
    return todayTasks;
  };

  const getScheduledTasks = () => {
    const scheduledTasks = [];
    const allTasks = getAllTasks();
    for (let i = 0; i < allTasks.length; i++) {
      if (isFuture(allTasks[i].dueDate)) {
        scheduledTasks.push(allTasks[i]);
      }
    }
    return scheduledTasks;
  };

  const getOverdueTasks = () => {
    const overdueTasks = [];
    const allTasks = getAllTasks();
    for (let i = 0; i < allTasks.length; i++) {
      if (isBefore(allTasks[i].dueDate, startOfToday())) {
        overdueTasks.push(allTasks[i]);
      }
    }
    return overdueTasks;
  };

  return {
    projects,
    createProject,
    renameProject,
    deleteProject,
    getActiveProject,
    switchProject,
    putToDoIntoProject,
    removeToDoFromProject,
    editToDo,
    getTaskById,
    toggleCompleteStatus,
    getAllTasks,
    getTodayTasks,
    getScheduledTasks,
    getOverdueTasks,
  };
}
export { toDoFunction, projectsForTodo };
