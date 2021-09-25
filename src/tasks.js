import './style.css';

const refresh = document.querySelector('.refresh');
const ul = document.querySelector('.tasks');
const deleteAll = document.querySelector('.delete-all');
export default class Tasks {
    static tasks = [];

    constructor(description, completed = false, index = Tasks.tasks.length) {
      this.description = description;
      this.completed = completed;
      this.index = index;
    }

    statusChanges(li) {
      if (this.completed === true) {
        li.classList.add('completed');
        this.completed = true;
      } else {
        li.classList.remove('completed');
        this.completed = false;
      }
    }

    static setLocal() {
      localStorage.setItem('tasks', JSON.stringify(Tasks.tasks));
    }

    static showTasks() {
      ul.innerHTML = '';
      Tasks.tasks.forEach((task) => {
        const li = document.createElement('li');
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.checked = task.completed;
        if (task.completed === true) {
          li.classList.add('completed');
        } else {
          li.classList.remove('completed');
        }
        input.addEventListener('change', () => {
          task.completed = input.checked;
          new Tasks().statusChanges(li);
          if (task.completed === true) {
            li.classList.add('completed');
          }
          Tasks.setLocal();
        });
        li.appendChild(input);

        const description = document.createElement('p');
        description.innerText = task.description;
        li.appendChild(description);

        const more = document.createElement('span');
        more.classList.add('material-icons');
        more.innerText = 'more_vert';
        li.appendChild(more);

        li.classList.add('d-flex', 'justify-content-between', 'border-m', 'align-items-center', 'text-center', 'descr');

        li.addEventListener('click', () => {
          // edit task off selected id
          li.classList.add('bg-col');
          description.classList.add('desc');
          Tasks.editTask(task.index);

          // remove class edit
          more.innerText = 'delete';
          more.addEventListener('click', () => {
            // delete selected item from dom
            ul.removeChild(li);
            Tasks.deleteTask(task.index);
            Tasks.setLocal();
          });
        });
        ul.appendChild(li);
      });
    }

    static getLocal() {
      // get local storage
      const tasks = JSON.parse(localStorage.getItem('tasks'));
      if (tasks) {
        Tasks.tasks = tasks;
      }
      Tasks.showTasks();
    }

    addTasks() {
      // check if array is empty
      if (Tasks.tasks.length === 0) {
        // set index to 1
        this.index = 1;
        Tasks.tasks.push(this);
      } else if (Tasks.tasks.length > 0) {
        // set index to last index + 1
        this.index = Tasks.tasks[Tasks.tasks.length - 1].index + 1;
        Tasks.tasks.push(this);
      }
      // remove repeated tasks
      Tasks.tasks = Tasks.tasks.filter((task, index, self) => index === self.findIndex((t) => (
        t.description === task.description
      )));
      Tasks.setLocal();
      // add Tasks to dom
      Tasks.showTasks();
    }

    // delete task
    static deleteTask(index) {
      // delete from an array and update the index in the array
      Tasks.tasks.splice(index - 1, 1);
      // eslint-disable-next-line no-return-assign
      Tasks.tasks.forEach((task, i) => task.index = i + 1);
      Tasks.setLocal();
      Tasks.showTasks();
    }

    static editTask(index) {
      // const li = document.querySelector(`li:nth-child(${index})`);
      const description = document.querySelectorAll('p');
      description.forEach((desc) => {
        desc.setAttribute('contenteditable', 'true');
        desc.addEventListener('blur', () => {
          desc.setAttribute('contenteditable', 'false');
          Tasks.tasks[index - 1].description = desc.innerText;
          Tasks.setLocal();
          Tasks.showTasks();
        });
        desc.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') {
            desc.setAttribute('contenteditable', 'false');
            Tasks.tasks[index - 1].description = desc.innerText;
            Tasks.setLocal();
            Tasks.showTasks();
          }
        });
      });
    }

    // delete all tasks
    static deleteAllTasks() {
      Tasks.tasks = [];
      Tasks.setLocal();
    }

    static deleteCompleted() {
      const domStay = document.querySelectorAll('.completed');
      const stay = Tasks.tasks.filter((task) => task.completed === false);
      Tasks.tasks = stay;
      domStay.forEach((domEl) => {
        domEl.remove();
      });
      this.setLocal();
    }
}
const liC = document.createElement('li');
const p = document.createElement('h5');
p.innerText = 'Clear all completed';
liC.appendChild(p);
liC.classList.add('d-flex', 'justify-content-around', 'bg', 'cursor');
liC.addEventListener('click', () => {
  Tasks.deleteCompleted();
});
deleteAll.appendChild(liC);

refresh.addEventListener('click', () => {
  Tasks.deleteAllTasks();
  ul.innerHTML = '';
});