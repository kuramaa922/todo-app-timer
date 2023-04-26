import React from 'react';
import propTypes from 'prop-types';
import './TasksFilter.css';

const TasksFilter = ({ filterBtn, filter }) => {
  const btnNames = [
    { name: 'All', id: 1 },
    { name: 'Active', id: 2 },
    { name: 'Completed', id: 3 },
  ];
  let buttons = btnNames.map((el) => {
    const { id, name } = el;
    const isActive = filter === name;
    let selected = isActive ? 'selected' : null;
    return (
      <li key={id}>
        <button type="button" className={selected} onClick={() => filterBtn(name)}>
          {name}
        </button>
      </li>
    );
  });

  return <ul className="filters">{buttons}</ul>;
};

TasksFilter.propTypes = {
  filter: propTypes.string.isRequired,
  filterBtn: propTypes.func,
};

export default TasksFilter;
