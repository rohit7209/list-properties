import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 50px;
  width: 100%;
  background: #FD003E;
`;


class Footer extends React.Component {
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

Footer.propTypes = {};

export default Footer;
