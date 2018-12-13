import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 100px;
  width: 100%;
  background: #FD003E;
`;

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Wrapper />
    );
  }
}

Header.propTypes = {};

export default Header;
