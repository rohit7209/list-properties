import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Label = styled.div`
  position: relative;
  display: inline-block;
  width: 80px;
  height: 30px;
  border: 1px solid #FD003E;

  &>input{
    opacity: 0;
    width: 0;
    height: 0;
  }

  &>div{
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ffffff;
    -webkit-transition: .4s;
    transition: .4s;
    display: flex;
    padding: 5px 10px;
    justify-content: space-between;
  }

  &>div:before{
    position: absolute;
    content: '\f00a';
    font: normal normal normal 14px/1 FontAwesome;
    left: 0;
    top: 0;
    height: 20px;
    width: 20px;
    background: #FD003E;
    -webkit-transition: .4s;
    transition: .4s;
    padding: 5px 10px;
    color: #ffffff;
    font-size: 20px;
  }

  &>input:checked + div:before {
    -webkit-transform: translateX(40px);
    -ms-transform: translateX(40px);
    transform: translateX(40px);
    content: '\f1e7';
  }
`;

const Icon = styled.i`
  color: #FD003E;
  font-size: 20px;
`;

class ViewToggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: !!this.props.checked,
    };
  }

  onClick = () => {
    this.setState({ checked: !this.state.checked }, () => this.props.onChange(this.state.checked));
  }

  render() {
    return (
      <Label onClick={this.onClick}>
        <input type="checkbox" checked={this.state.checked} />
        <div>
          <Icon className="fa fa-th" />
          <Icon className="fa fa-slideshare" />
        </div>
      </Label>
    );
  }
}

ViewToggle.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

export default ViewToggle;
