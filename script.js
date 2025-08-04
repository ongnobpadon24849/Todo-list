const topicInput    = document.getElementById("todo-topic");
const taskInput     = document.getElementById("todo-task");
const addBtn        = document.getElementById("add-btn");
const todoList      = document.getElementById("todo-list");
const statusSelect  = document.getElementById("todo-status");
const dueDateInput  = document.getElementById("todo-duedate")
const statusDot     = document.getElementById("status-dot")

addBtn.addEventListener("click", () => {
  const topic = topicInput.value.trim();
  const task  = taskInput.value.trim();
  const date  = dueDateInput.value.trim();

  if (topic === "" || task === "" || date === "") {
    alert("Please fill in complete information.");
    return;
  }

  if (isRealDate(date) === false) {
    alert("Please enter a valid date in YYYY/MM/DD format.");
    return;
  }

  const card = document.createElement("div");
  card.classList.add("card");

  const card_content = document.createElement("div");
  card_content.classList.add("card-content");

  const card_content2 = document.createElement("div");
  card_content2.classList.add("card-content");

  const card_content3 = document.createElement("div");
  card_content3.classList.add("card-content");

  const card_content4 = document.createElement("div");
  card_content4.classList.add("card-content", "delete");

  const card_topic = document.createElement("div");
  card_topic.classList.add("card-topic");
  card_topic.textContent = topic;

  const card_task = document.createElement("div");
  card_task.classList.add("card-task");
  card_task.textContent = task;

  const card_date = document.createElement("div");
  card_date.classList.add("card-date");
  card_date.textContent = date;
  
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete-btn");

  const statusBtn = document.createElement("button");
  statusBtn.classList.add("status-btn");
  statusBtn.textContent = formatStatus(statusSelect.value);
  statusBtn.dataset.status = statusSelect.value;
  updateStatusBtnColor(statusBtn);

  statusBtn.addEventListener("click", () => {
  const current = statusBtn.dataset.status;
  const next = getNextStatus(current);
  statusBtn.dataset.status = next;
  statusBtn.textContent = formatStatus(next);
  updateStatusBtnColor(statusBtn);
});

  deleteBtn.addEventListener("click", () => {
    todoList.removeChild(card);
  });

  card_content.appendChild(card_topic);
  card_content.appendChild(statusBtn);

  card_content2.appendChild(card_date);

  card_content3.appendChild(card_task);

  card_content4.appendChild(deleteBtn)

  card.appendChild(card_content);
  card.appendChild(card_content2);
  card.appendChild(card_content3);
  card.appendChild(card_content4);
  todoList.appendChild(card);

  topicInput.value = "";
  taskInput.value = "";
  dueDateInput.value = "";
  clearDotColor();
});

statusSelect.addEventListener("change", () => {
  clearDotColor(true);
});

function isRealDate(dateString) {
  if (!/^\d{4}\/\d{2}\/\d{2}$/.test(dateString)) return false;

  const [year, month, day] = dateString.split('/').map(Number);
  const date = new Date(year, month - 1, day);

  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

function clearDotColor(on = false) {
  statusDot.classList.remove("status-not-started", "status-in-progress", "status-done");
  if (on === true){
    const value = statusSelect.value;
    statusDot.classList.add(`status-${value}`);
  }
}

function getNextStatus(current) {
  if (current === "not-started"){
    return "in-progress";
  }
  else if (current === "in-progress") {
    return "done";
  }else{
    return "not-started";
  }
}

function formatStatus(status) {
  if (status === "not-started"){
    return "Not Started";
  }
  else if (status === "in-progress") {
    return "In Progress";
  }
  else if (status === "done") {
    return "Done";
  }else{
    //Do nothing...
  }
}

function updateStatusBtnColor(button) {
  button.classList.remove("status-not-started", "status-in-progress", "status-done");
  button.classList.add(`status-${button.dataset.status}`);
}
