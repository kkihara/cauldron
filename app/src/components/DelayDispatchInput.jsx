// @flow

import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

type Props = {
  id: string,
  type: ?string,
  className: string,
  initialValue: string,
  placeholder: string,
  dispatchFn: (string) => void,
  timeoutLength: number,
}

type State = {
  value: string,
}

export default class DelayDispatchInput extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      value: props.initialValue,
    };
    this.handleChange = this.handleChange.bind(this);
    this.timeout = null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.initialValue != this.props.initialValue) {
      this.setState({
        value: this.props.initialValue,
      });
    }
  }

  handleChange(event: Event) {
    const { dispatchFn, timeoutLength } = this.props;
    const value = event.target.value;
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(function() {
      dispatchFn(value);
    }, timeoutLength);
    this.setState({ value });
  }

  render() {
    const { id, type, placeholder, className } = this.props;
    const { value } = this.state;
    return (
      <div>
        <input
          id={ id }
          className={ className }
          type={ type || 'text' }
          value={ value }
          placeholder={ placeholder }
          onChange={ this.handleChange } />
      </div>
    );
  }
};
