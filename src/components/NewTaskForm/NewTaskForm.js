import React from 'react';
import './NewTaskForm.css';
import propTypes from 'prop-types';

export default class NewTaskForm extends React.Component {
  static defaultProps = {
    onAdded: () => {},
  };

  static propTypes = {
    onAdded: propTypes.func,
  };

  state = {
    taskLabel: '',
    min: '',
    sec: '',
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { taskLabel, min, sec } = this.state;
    const timerSec = parseInt(min || 0) * 60 + parseInt(sec || 0);
    this.props.onAdded(taskLabel, timerSec);
    this.setState({
      taskLabel: '',
      min: '',
      sec: '',
    });
  };

  setValue = (e) => {
    this.setState({
      taskLabel: e.target.value,
    });
  };

  clamp = (value, min, max) => {
    if (value > max) return max;
    if (value < min) return min;
    return value;
  };

  setMinutes = (e) => {
    let value = e.target.value;

    if (value !== '') {
      e.target.value = this.clamp(+value, 0, 1440) || 0;
    }
    this.setState({
      min: e.target.value,
    });
  };

  setSeconds = (e) => {
    let value = e.target.value;

    if (value !== '') {
      e.target.value = this.clamp(+value, 0, 60) || 0;
    }
    this.setState({
      sec: e.target.value,
    });
  };

  render() {
    const { taskLabel, min, sec } = this.state;

    return (
      <header className="header">
        <h1>todos</h1>
        <form className="new-todo-form" onSubmit={this.onSubmit}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={this.setValue}
            value={taskLabel}
            size="50"
            autoFocus
            required
          />
          {/* eslint-disable-next-line */}
          <input
            className="new-todo-form__timer"
            type="number"
            onChange={this.setMinutes}
            value={min}
            placeholder="Min"
            min="0"
            max="60"
            autoFocus
          />
          {/* eslint-disable-next-line */}
          <input
            className="new-todo-form__timer"
            type="number"
            onChange={this.setSeconds}
            value={sec}
            placeholder="Sec"
            min="0"
            max="60"
            autoFocus
          />
          <input type="submit" style={{ display: 'none' }} />
        </form>
      </header>
    );
  }
}
