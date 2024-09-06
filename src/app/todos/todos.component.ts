import { Component } from '@angular/core';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss',
})
export class TodosComponent {
  public todos: TodoInterface[] = [];
  public newTodoText: string | null = null;
  filter: string = 'all';

  createTodo(): void {
    if (this.newTodoText !== null && this.newTodoText !== '') {
      this.todos.push({
        id: this.todos.length + 1,
        title: this.newTodoText,
        created: new Date().toLocaleString(),
        completed: false,
      });
      this.newTodoText = null;
      console.log(this.todos);
    }
  }

  deleteTodo(key: number): void {
    let index = this.todos.findIndex((t) => t?.id === key);
    if (index > -1) {
      this.todos.splice(index, 1);
    }
  }

  markTodoDone(key: number): void {
    let index = this.todos.findIndex((t) => t?.id === key);
    if (index > -1) {
      this.todos[index].completed = true;
    }
  }

  clearCompletedTodos(): void {
    this.todos = this.todos?.length
      ? this.todos.filter((t) => !t?.completed)
      : [];
  }

  getRemainingTodos(): number {
    return this.todos.filter((t) => !t.completed).length;
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
