export default class Crud {
    static tasks = [];

    constructor(description, completed = false, index = Crud.tasks.length) {
      this.description = description;
      this.completed = completed;
      this.index = index;
    }

    static setLocal() {
      localStorage.setItem('tasks', JSON.stringify(Crud.tasks));
    }

    addTasks() {
      // check if array is empty
      if (Crud.tasks.length === 0) {
        // set index to 1
        this.index = 1;
        Crud.tasks.push(this);
      } else if (Crud.tasks.length > 0) {
        // set index to last index + 1
        this.index = Crud.tasks[Crud.tasks.length - 1].index + 1;
        Crud.tasks.push(this);
      }
      // remove repeated tasks
      Crud.tasks = Crud.tasks.filter((task, index, self) => index === self.findIndex((t) => (
        t.description === task.description
      )));

      Crud.setLocal();
      return Crud.tasks;
    }

    // delete task
    static deleteTask(index) {
      // delete from an array and update the index in the array
      Crud.tasks.splice(index - 1, 1);
      // eslint-disable-next-line no-return-assign
      Crud.tasks.forEach((task, i) => task.index = i + 1);
      Crud.setLocal();
    }

    static getLocal() {
      // get local storage
      const tasks = JSON.parse(localStorage.getItem('tasks'));
      if (tasks) {
        Crud.tasks = tasks;
      }
    }

    // delete all tasks
    static deleteAllTasks() {
      Crud.tasks = [];
      Crud.setLocal();
    }
}
