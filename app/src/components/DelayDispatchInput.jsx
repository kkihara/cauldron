// @flow

import React, { Component } from 'react';

type Props = {
  dispatchFn: (string) => void,
  timeoutLength: number,
}

type State = {
  value: string,
}

export default class DelayDispatchInput extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = { value: '' };
    this.handleChange = this.handleChange.bind(this);
    this.timeout = null;
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
    const { value } = this.state;
    return (
      <div>
        <input
          type='text'
          value={ value }
          onChange={ this.handleChange } />
      </div>
    );
  }
};
