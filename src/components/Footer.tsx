import * as React from 'react';
import './TodoApp.css';

import TodoItem, { TodoStatus, Filter } from './TodoItem';

interface TodoFooterProps {
  todos: TodoItem[];
  changeFilter: (filter: Filter) => void;
  clearCompleted: () => void;
}

interface TodoFooterState {
  filter: Filter;
}

class TodoFooter extends React.Component<TodoFooterProps, TodoFooterState> {
  constructor(props: TodoFooterProps) {
    super(props);
  }

  componentWillMount() {
    this.setState({
      filter: Filter.All
    });
  }

  render() {
    return (
      <footer className="footer" style={this.props.todos && this.props.todos.length > 0 ? {} : { display: 'none' }}>
        <span className="todo-count">
          <strong>{this.props.todos && this.props.todos.length}</strong>
          <span>{this.props.todos && this.props.todos.length > 1 ? ' items left' : ' item left'}</span>
        </span>
        <ul className="filters">
          <li>
            <button
              className={'filter-item ' + (this.isFilter(Filter.All) ? 'selected' : '')}
              defaultChecked={true}
              disabled={this.isFilter(Filter.All)}
              onClick={(event) => this.onFilterClick(event, Filter.All)}
            >
              All
            </button>
          </li>
          <li>
            <button
              className={'filter-item ' + (this.isFilter(Filter.Active) ? 'selected' : '')} 
              disabled={this.isFilter(Filter.Active)}
              onClick={(event) => this.onFilterClick(event, Filter.Active)}
            >
              Active
            </button>
          </li>
          <li>
            <button
              className={'filter-item ' + (this.isFilter(Filter.Completed) ? 'selected' : '')} 
              disabled={this.isFilter(Filter.Completed)}
              onClick={(event) => this.onFilterClick(event, Filter.Completed)}
            >
              Completed
            </button>
          </li>
        </ul>
        <button
          className="clear-completed"
          style={(this.hasCompletedTodos() ? {} : { display: 'none' })}
          onClick={(event) => this.onClearClick()}
        >
          Clear completed
        </button>
      </footer>
    );
  }

  isFilter(current: Filter) {
    return this.state.filter === current;
  }

  onFilterClick(event: React.MouseEvent<HTMLButtonElement>, current: Filter) {
    this.setState((prevState, props) => {
      return {
        filter: current
      };
    });
    this.props.changeFilter(current);
  }

  hasCompletedTodos() {
    return this.props.todos.some((value, index, array) => {
      return value.status === TodoStatus.Completed;
    });
  }

  onClearClick() {
    this.props.clearCompleted();
  }
}

export default TodoFooter;