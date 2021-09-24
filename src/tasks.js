import './style.css';

// let id = 0;
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
      const ul = document.querySelector('.tasks');
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

        li.classList.add('d-flex', 'justify-content-between', 'border-m', 'align-items-center', 'text-center');
        li.addEventListener('click', () => {
          // edit task off selected id
          Tasks.editTask(task.index);

          // remove class edit
          more.innerText = 'delete';
          more.addEventListener('click', () => {
            // delete selected item from dom
            li.remove();
            Tasks.deleteTask(task.index);
            // task.index -= 1;

            // remove from dom

            // remove from local storage
            Tasks.setLocal();
          });
        });
        ul.appendChild(li);
      });
      const li = document.createElement('li');
      const p = document.createElement('p');
      p.innerText = 'Clear all completed';
      li.appendChild(p);
      li.classList.add('d-flex', 'justify-content-around', 'bg');
      ul.appendChild(li);
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
      // push to array in sorted order
      // Tasks.tasks.push(this);
      // sort array and push
      Tasks.tasks.sort((a, b) => {
        if (a.index > b.index) {
          return 1;
        }
        if (a.index < b.index) {
          return -1;
        }
        return 0;
      });
      // push from the last index deleted
      Tasks.tasks.push(this);
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
      // delete from an array in order
      if (index === 1 || this.tasks.length === 1) {
        Tasks.tasks.splice(0, 1);
      } else if (index === this.tasks.length) {
        Tasks.tasks.splice(this.tasks.length - 1, 1);
      } else {
        Tasks.tasks.splice(index, 1);
      }
      // set local
      Tasks.setLocal();
    }

    // change description to input text
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
      });
      // input.value = description.innerText;
      // check if description is empty or not

      // li.removeChild(description);
      // check if description is a child element of l
      // content editable = true

      // input.addEventListener('keyup', (e) => {
      //   if (e.keyCode === 13) {
      //     // li.replaceChild(description, input)

      //     description.innerText = this.task.description;
      //     Tasks.tasks[index].description = this.tasks.description;
      //     Tasks.setLocal();
      //     Tasks.showTasks();
      //   }
      // });
    }
}