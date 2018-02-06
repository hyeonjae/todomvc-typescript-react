import * as React from 'react';
import './TodoApp.css';

import TodoItem, { Filter, TodoStatus } from './TodoItem';

interface TodoBodyProps {
  todos: TodoItem[];
  deleteTodo: (index: TodoItem) => void;
  toggleTodo: (index: TodoItem) => void;
  filter: Filter;
}

interface TodoBodyState {
}

class TodoBody extends React.Component<TodoBodyProps, TodoBodyState> {
  constructor(props: TodoBodyProps) {
    super(props);
  }

  shouldComponentUpdate(nextProps: TodoBodyProps, nextState: TodoBodyState): boolean {
    return true;
  }

  render() {
    return (
      <section className="main">
        <ul className="todo-list">
          {
            this.filteredTodos().map((item, index) => (
              <li key={index} className={(item.status === TodoStatus.Completed ? 'completed' : '')}>
                <div className="view">
                  <input 
                    type="checkbox" 
                    className="toggle"
                    value="on" 
                    checked={item.status === TodoStatus.Completed} 
                    onChange={(event) => this.toggle(item)}
                  />
                  <label>{item.contents}</label>
                  <button className="destroy" onClick={(event) => this.delete(item)} />
                </div>
              </li>
            ))
          }
        </ul>
      </section>
    );
  }

  private filteredTodos() {
    switch (this.props.filter) {
      case Filter.Active: {
        return this.props.todos.filter(todo => todo.status === TodoStatus.Active);
      }
      case Filter.Completed: {
        return this.props.todos.filter(todo => todo.status === TodoStatus.Completed);
      }
      case Filter.All: 
      default: {
        return this.props.todos;
      }
    }
  }

  private delete(target: TodoItem) {
    this.props.deleteTodo(target);
  }

  private toggle(target: TodoItem) {
    this.props.toggleTodo(target);
  }
}

export default TodoBody;