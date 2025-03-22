
//variáveis
const inputTask = document.querySelector(".input-task");
const btnAddTask = document.querySelector(".btn-add-task");
const fullTaskList = document.querySelector(".list-task");
const informationCompletedItem = document.querySelector('.completed-itens-title')
const informationIncompletedItem = document.querySelector('.incompleted-itens-title')

//inicializador da lista de tarefas
let taskList = []; 

informationIncompletedItem.textContent = 0
informationCompletedItem.textContent = 0

//adicionar nova tarefa
function addNewTask() {
  
  const errorMessage = document.querySelector('.error');

  if (inputTask.value == "") {
    errorMessage.innerHTML = "Atenção: O campo não pode estar vazio.";
  } else {
    errorMessage.innerHTML = "";
    taskList.push({
      task: inputTask.value,
      completed: false,    
    });
    
    inputTask.value = "";
    showTasks();
    
  }
}

//função para a barra de progresso
function updateProgressBar() {
  const totalTasks = taskList.length;  
  let completedTaskList = taskList.filter(item => item.completed);
  const completedTasks = completedTaskList.length;
  let progressPercentage = 0;

  if (totalTasks !== 0) {
    progressPercentage = (completedTasks / totalTasks) * 100;
  }

  const progressBar = document.querySelector(".progress");
  progressBar.style.width = progressPercentage + "%";

  const progressDescription = document.querySelector(".progress-description");
  if (totalTasks === 0) {
    progressBar.style.width = "100%";
    progressDescription.innerHTML = `Você ainda não adicionou nenhuma tarefa.`;
  } else {
    progressDescription.innerHTML = `Você já realizou <strong>${Math.floor(progressPercentage)}%</strong> das tarefas.`;
  }

  informationCompletedItem.textContent = completedTaskList.length;
  informationIncompletedItem.textContent = taskList.length - completedTaskList.length;
}



//mostrar a lista de tarefas na tela
function showTasks() {

  let newItem = "";
  taskList.forEach((item, index) => {
    newItem += `
        <li class="task-item ${item.completed && "done"}">
            <i class="fa-solid fa-circle-check fa-lg" style="color: #1a103d;" alt="ícone de check - tarefa realizada" onclick="completeItem(${index})"></i> 
            <p class=" ${item.completed && "done-text"}">${item.task}</p>
            <i class="fa-solid fa-trash fa-lg" style="color: #1a103d;" alt="ícone de lixeira - excluir a tarefa" onclick="deleteItem(${index})"></i> 
        </li>
        `;
  });

  fullTaskList.innerHTML = newItem;

  updateProgressBar()

  localStorage.setItem("lista de tarefas", JSON.stringify(taskList));
}

//item concluído
function completeItem(index) {
  taskList[index].completed = !taskList[index].completed;
  showTasks();
}

//deletar item
function deleteItem(index) {
  taskList.splice(index, 1);
  showTasks();
}


//pegar os dados do LocalStorage para os itens não sumirem ao atualizar a página
function reloadPage() {
  const tasksLocalStorage = localStorage.getItem("lista de tarefas");
  if (tasksLocalStorage) {
    taskList = JSON.parse(tasksLocalStorage);
  }
  showTasks();
}

reloadPage();

//eventos da página - ao clicar no botão de adicionar ou ao apertar Enter
btnAddTask.addEventListener("click", addNewTask);
inputTask.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addNewTask();
  }
});


