import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  padding: 10px;
  text-align: center;
  color: #FD003E;
`;

const Loader = (props) => {
  return (
    <Wrapper className={props.className} style={{ ...props.style }}>
      <i className="fa fa-circle-o-notch fa-spin fa-lg" />
    </Wrapper>
  );
};

Loader.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
};

Loader.defaultProps = {
  style: {},
  className: '',
};

export default Loader;
