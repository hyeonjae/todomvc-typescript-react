import * as React from 'react';
import './TodoApp.css';

import TodoHeader from './Header';
import TodoBody from './Main';
import TodoFooter from './Footer';

import TodoItem, { Filter, TodoStatus } from './TodoItem';

interface AppProps {
}

interface AppState {
  todos: TodoItem[];
  filter: Filter;
}

class TodoApp extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.addTodos = this.addTodos.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.changeFilter = this.changeFilter.bind(this);
    this.toggleTodo = this.toggleTodo.bind(this);
    this.clearCompleted = this.clearCompleted.bind(this);
    this.state = {
      todos: [],
      filter: Filter.All
    };
  }

  shouldComponentUpdate(nextProps: AppProps, nextState: AppState): boolean {
    return true;
  }

  render() {
    return (
      <div className="App todoapp">
        <TodoHeader
          addTodos={this.addTodos}
        />
        <TodoBody
          todos={this.state.todos}
          deleteTodo={this.deleteTodo}
          toggleTodo={this.toggleTodo}
          filter={this.state.filter}
        />
        <TodoFooter
          todos={this.state.todos}
          changeFilter={this.changeFilter}
          clearCompleted={this.clearCompleted}
        />
      </div>
    );
  }

  private addTodos(item: TodoItem) {
    this.setState({
      todos: [...this.state.todos, item]
    });
  }

  private deleteTodo(target: TodoItem) {
    let index = this.state.todos.indexOf(target);
    this.state.todos.splice(index, 1);
    this.setState({
      todos: this.state.todos
    });
  }

  private toggleTodo(target: TodoItem) {
    let index = this.state.todos.indexOf(target);
    let status = this.state.todos[index].status;
    if (status === TodoStatus.Active) {
      this.state.todos[index].status = TodoStatus.Completed;
    } else if (status === TodoStatus.Completed) {
      this.state.todos[index].status = TodoStatus.Active;
    }
    this.setState((prevState, props) => {
      return {
        todos: this.state.todos
      };
    });
  }

  private changeFilter(current: Filter) {
    this.setState((prevState, props) => {
      return {
        filter: current
      };
    });
  }

  private clearCompleted() {
    this.setState((prevState, props) => {
      return {
        todos: this.state.todos.filter((value, index, array) => {
          return value.status !== TodoStatus.Completed;
        })
      };
    });
  }
}

export default TodoApp;
