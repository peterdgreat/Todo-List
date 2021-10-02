import Crud from '../src/crud';
import 'jest-localstorage-mock';

const crud = new Crud();
const task = Crud.tasks;

describe('Crud add', () => {
  test('should be a function', () => {
    expect(Crud).toBeInstanceOf(Function);
  });

  test('should return an object', () => {
    expect(Crud).toBeInstanceOf(Object);
  });

  test('expect task empty at first', () => {
    expect(task).toEqual([]);
  });
  test('expect task add a single element', () => {
    expect(crud.addTasks()).toHaveLength(1);
  });
  test('expect index to increase by 1', () => {
    crud.addTasks();
    expect(crud.index).toBe(2);
  });
});

describe('Crud delete', () => {
  test('should be a function', () => {
    expect(Crud).toBeInstanceOf(Function);
  });

  test('expect  to remove a task from array', () => {
    expect(Crud.deleteTask()).toHaveLength(0);
  });
});