import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from './../Button';

const Icon = styled.i`
  font-size: 12px;
`;


class SortToggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ascending: this.props.ascending,
    };
  }

  onClick = () => {
    this.setState({ ascending: !this.state.ascending }, () => this.props.onChange(this.state.ascending));
  }

  render() {
    return (
      <Button sm alt onClick={this.onClick} style={{ padding: '0px' }}><Icon className={`fa fa-long-arrow-${this.state.ascending ? 'up' : 'down'}`} /> {this.props.text}</Button>
    );
  }
}

SortToggle.propTypes = {
  text: PropTypes.string.isRequired,
  ascending: PropTypes.bool,
};

export default SortToggle;
