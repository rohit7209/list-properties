import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Label = styled.div`
  position: relative;
  display: inline-block;
  width: 12px;
  height: 12px;
  font-size: 12px;
  padding: 1px;
  border: 2px solid #FD003E;
  border-radius: 3px;
  color: #ffffff;
  background: ${props => props.checked ? '#FD003E' : '#ffffff'};
  -webkit-transition: .4s;
  transition: .4s;
  cursor: pointer;
  margin: 30px auto;
`;


class CheckBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: this.props.defaultValue,
    };
  }

  onClick = () => {
    this.setState({ checked: !this.state.checked }, () => this.props.onChange(this.state.checked));
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.defaultValue !== nextProps.defaultValue) this.setState({ checked: nextProps.defaultValue });
  }

  render() {
    return (
      <Label onClick={this.onClick} checked={this.state.checked}>
        <i className={`fa fa-${this.state.checked ? 'check' : ''}`} />
      </Label>
    );
  }
}

CheckBox.propTypes = {
  defaultValue: PropTypes.bool,
};

CheckBox.defaultProps = {
  defaultValue: false,
}

export default CheckBox;
