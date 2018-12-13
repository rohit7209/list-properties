import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from './../Button';

const Icon = styled.i`
  font-size: 15px;
  margin-left: 10px;
`;

const Toggle = styled(Button) `
  font-size: 12px;
  margin: auto 5px;
  background: ${props => typeof props.active === 'undefined' ? '#ffffff' : '#fd003e'};
  color: ${props => typeof props.active === 'undefined' ? '#fd003e' : '#ffffff'};
`;

class SortToggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ascending: this.props.ascending,
    };
  }

  onClick = () => {
    this.setState({ ascending: !this.state.ascending }, () => this.props.onChange({ [this.props.id]: this.state.ascending }));
  }

  render() {
    return (
      <Toggle sm onClick={this.onClick} active={this.props.active}>
        {this.props.text}
        {typeof this.props.active === 'undefined' ? null : <Icon className={`fa fa-caret-${this.state.ascending ? 'up' : 'down'}`} />}
      </Toggle>
    );
  }
}

SortToggle.propTypes = {
  text: PropTypes.string.isRequired,
  ascending: PropTypes.bool,
  active: PropTypes.any,
};

export default SortToggle;
