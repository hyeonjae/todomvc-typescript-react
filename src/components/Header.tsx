import * as React from 'react';
import './TodoApp.css';

import TodoItem from './TodoItem';

interface TodoHeaderProps {
  addTodos: (item: TodoItem) => void;
}

interface TodoHeaderState {
}

class TodoHeader extends React.Component<TodoHeaderProps, TodoHeaderState> {
  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onKeyDown={(event) => this.onKeyDown(event)}
          autoFocus={true}
        />
      </header>
    );
  }

  private onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.keyCode === 13) {
      let todo = event.currentTarget.value.trim();
      if (todo.length > 0) {
        this.props.addTodos(new TodoItem(todo));
        event.currentTarget.value = '';
      }
    }
  }
}

export default TodoHeader;