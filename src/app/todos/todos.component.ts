import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss',
})
export class TodosComponent implements OnInit {
  public todos: TodoInterface[] = [];
  public newTodoText: string | null = null;
  filter: string = 'all';

  ngOnInit(): void {
    // this.getTodosFromLocalStrorge();
  }

  getTodosFromLocalStrorge() {
    const todosNew = localStorage.getItem('todos');
    try {
      this.todos = JSON.parse(todosNew as string);
    } catch {
      this.todos = [];
    }
  }

  setTodosToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  createTodo(): void {
    if (this.newTodoText !== null && this.newTodoText !== '') {
      this.todos.push({
        id: this.todos.length + 1,
        title: this.newTodoText,
        created: new Date().toLocaleString(),
        completed: false,
      });
      this.newTodoText = null;
      this.setTodosToLocalStorage();
      // console.log(this.todos);
    }
  }

  deleteTodo(key: number): void {
    let index = this.todos.findIndex((t) => t?.id === key);
    if (index > -1) {
      this.todos.splice(index, 1);
      this.setTodosToLocalStorage();
    }
  }

  markTodoDone(key: number): void {
    let index = this.todos.findIndex((t) => t?.id === key);
    if (index > -1) {
      this.todos[index].completed = true;
      this.setTodosToLocalStorage();
    }
  }

  clearCompletedTodos(): void {
    this.todos = this.todos?.length
      ? this.todos.filter((t) => !t?.completed)
      : [];
    this.setTodosToLocalStorage();
  }

  getRemainingTodos(): number {
    return this.todos.filter((t) => !t.completed).length || 0;
  }

  getFilteredTodos() {
    switch (this.filter) {
      case 'all':
        return this.todos;
      case 'active':
        return this.todos.filter((t) => !t?.completed);
      case 'completed':
        return this.todos.filter((t) => t?.completed);
      default:
        return this.todos;
    }
  }

  log(ev: KeyboardEvent) {
    if (ev.key === 'Enter') {
      this.createTodo();
    }
  }
}

export interface TodoInterface {
  id: number;
  title: string;
  created: string;
  completed: boolean;
}
