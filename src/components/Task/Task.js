import React from 'react';
import './Task.css';
import propTypes, { bool } from 'prop-types';
import classNames from 'classnames';
import { formatDistanceToNow } from 'date-fns';

export default class Task extends React.Component {
  static defaultProps = {
    complete: false,
    time: new Date(),
    onCompleted: () => {},
    onDeleted: () => {},
    timer: 0,
  };

  static propTypes = {
    complete: bool,
    onCompleted: propTypes.func,
    onDeleted: propTypes.func,
    time: propTypes.object,
    timer: propTypes.number,
  };

  state = {
    value: this.props.label,
    pause: true,
    timer: this.props.timer,
    created: null,
  };

  setTimeCreated = () => {
    this.setState({
      created: formatDistanceToNow(this.props.time, { includeSeconds: true }),
    });
  };
  timer = () => {
    this.interval = setInterval(() => {
      this.setTimeCreated();
      this.timerRun();
    }, 1000);
  };

  timerRun = () => {
    const { pause, timer } = this.state;

    if (!pause) this.setState({ timer: timer - 1 });
  };

  componentDidMount() {
    this.setTimeCreated();
    this.timer();
  }
  componentWillUnmount() {
    const { id, changeTimerValue } = this.props;
    const { timer } = this.state;

    clearInterval(this.interval);
    changeTimerValue(id, timer);
  }
  setTaskValue = (event) => {
    this.setState({ value: event.target.value });
  };

  setTimer = () => {
    const { timer } = this.state;

    if (timer < 0) return '00:00';
    return `${Math.floor(timer / 60)
      .toString()
      .padStart(2, '0')}:${Math.floor(timer % 60)
      .toString()
      .padStart(2, '0')}`;
  };

  startTimer = () => {
    this.setState({ pause: false });
  };

  pauseTimer = () => {
    this.setState({ pause: true });
  };

  render() {
    const { created } = this.state;
    const { label, complete, onCompleted, onDeleted, id } = this.props;

    return (
      <li className={classNames({ active: !complete, completed: complete })}>
        <div className="view">
          <input id={id} className="toggle" checked={complete} type="checkbox" onChange={onCompleted} />
          <label htmlFor={id}>
            <span className="title" onClick={onCompleted}>
              {label}
            </span>
            <div className="description">
              <button className="icon icon-play" onClick={this.startTimer}></button>
              <button className="icon icon-pause" onClick={this.pauseTimer}></button>
              <span className="timer">{this.setTimer()}</span>
            </div>
            <span className="created">created {created} ago</span>
          </label>
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
      </li>
    );
  }
}
