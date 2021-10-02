import Crud from '../src/crud';
import 'jest-localstorage-mock';

const crud = new Crud();
const task = Crud.tasks;

describe('Crud', () => {
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
});