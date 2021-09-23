import './style.css';

export default class Tasks {
  constructor(description, completed, index) {
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
}