import React from 'react';
import propTypes from 'prop-types';

import Task from '../Task';

import './TaskList.css';

export default function TaskList(props) {
  const { todos, onCompleted, onDeleted, changeTimerValue } = props;

  return (
    <section className="main">
      <ul className="todo-list">
        {todos.map((data) => {
          const { id, label, done, time, timer } = data;
          return (
            <Task
              id={id}
              key={id}
              label={label}
              complete={done}
              time={time}
              timer={timer}
              onCompleted={() => onCompleted(id)}
              onDeleted={() => onDeleted(id)}
              changeTimerValue={(idx, val) => changeTimerValue(idx, val)}
            />
          );
        })}
      </ul>
    </section>
  );
}

TaskList.defaultProps = {
  todos: [],
  onCompleted: () => {},
  onDeleted: () => {},
  changeTimerValue: () => {},
};

TaskList.propTypes = {
  todos: propTypes.arrayOf(propTypes.object),
  onCompleted: propTypes.func,
  onDeleted: propTypes.func,
  changeTimerValue: propTypes.func,
};
