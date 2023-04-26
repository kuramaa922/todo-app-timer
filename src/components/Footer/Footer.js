import React from 'react';
import propTypes from 'prop-types';
import './Footer.css';

import TasksFilter from '../TasksFilter';

const Footer = ({ tasksLeft, clearCompleted, filterBtn, filter }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{tasksLeft} items left</span>
      <TasksFilter filterBtn={filterBtn} filter={filter} />
      <button className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  );
};

Footer.defaultProps = {
  clearCompleted: () => {},
  filterBtn: () => {},
  filter: 'All',
};

Footer.propTypes = {
  filterBtn: propTypes.func,
  clearCompleted: propTypes.func,
  filter: propTypes.string,
};

export default Footer;
