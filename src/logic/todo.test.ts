import {
  generateID,
  validateTodo,
  TodoItem,
  generateColor,
  formatTodo,
} from "./todo";

describe("test generate random id", () => {
  it("generated id is >0", () => {
    const result: string = generateID();
    expect(result.length).toBeGreaterThan(0);
  });
  it("generated id is not equal to another generated one", () => {
    const id1: string = generateID();
    const id2: string = generateID();
    expect(id1).not.toEqual(id2);
    expect(id1).not.toBe(id2);
  });
});

describe("validateTodo", () => {
  test("should return true if the value valid", () => {
    const todo: TodoItem = new TodoItem();
    todo.value = "Ich fahre heim";
    const todos: TodoItem[] = [];
    expect(validateTodo(todo, todos)).toBeTruthy();
  });

  test("should return false if the value is longer than 255 characters", () => {
    const todo: TodoItem = new TodoItem();
    todo.value = "a".repeat(256);
    expect(validateTodo(todo, [])).toBeFalsy();
  });

  test("should return false if the value is empty", () => {
    const todo: TodoItem = new TodoItem();
    todo.value = "";
    expect(validateTodo(todo, [])).toBeFalsy();
  });

  test("should return false if the todo is already in the todos array (case insensitive)", () => {
    const todo1: TodoItem = new TodoItem();
    todo1.value = "foo";
    const todo2: TodoItem = new TodoItem();
    todo2.value = "FOO";
    const todos: TodoItem[] = [todo1];
    expect(validateTodo(todo2, todos)).toBeFalsy();
  });
});

describe("formatTodo", () => {
  test("should capitalize the first letter of the todo", () => {
    const todo: TodoItem = new TodoItem();
    todo.value = "foo";
    const formattedTodo: TodoItem = formatTodo(todo);
    expect(formattedTodo.value).toEqual("Foo");
  });
});

describe("generateColor", () => {
  test("generated color is not equal to another generated color", () => {
    const color1: string = generateColor();
    const color2: string = generateColor();
    expect(color1).not.toEqual(color2);
  });
  test("should generate an rgb color with the format rgb(r,g,b) and between 50 and 150", () => {
    const color = generateColor();
    const regex =
      /^rgb\([5-9][0-9],|1[0-4][0-9],|150,\)\([5-9][0-9],|1[0-4][0-9],|150,\)\([5-9][0-9],|1[0-4][0-9],|150,\)$/;
    expect(regex.test(color)).toBe(true);
  });
});
