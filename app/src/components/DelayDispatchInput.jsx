// @flow

import React, { Component } from 'react';

type Props = {
  id: string,
  initialValue: string,
  placeholder: string,
  dispatchFn: (string) => void,
  timeoutLength: number,
}

type State = {
  id: string,
  value: string,
  placeholder: string,
}

export default class DelayDispatchInput extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      id: props.id,
      value: props.initialValue,
      placeholder: props.placeholder,
    };
    this.handleChange = this.handleChange.bind(this);
    this.timeout = null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.initialValue != this.props.initialValue) {
      this.setState({
        id: this.props.id,
        value: this.props.initialValue,
        placeholder: this.props.placeholder,
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
    const { id, value, placeholder } = this.state;
    return (
      <div>
        <input
          id={ id }
          type='text'
          value={ value }
          placeholder={ placeholder }
          onChange={ this.handleChange } />
      </div>
    );
  }
};
