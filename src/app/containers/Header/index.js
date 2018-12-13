import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  background: #FD003E;
  display:flex;
  border-bottom: 1px solid #FD003E;
`;

const Content = styled.div`
  width: 100%;
  text-align: right;
  line-height: 100%;
  padding: 30px;
  font-weight: bold;
  font-size: 14px;
  &>span{
    float: left;
    color: white;
  }
  &>a, &>a:visited, &>a:active, &>a:focus{
    text-decoration: none;
    color: white;
    margin: auto 20px;
  }
`;


class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Wrapper>
        <div style={{ background: 'white', padding: '10px 25px' }}><img src="https://assets.nobroker.in/static/img/logos/nb_logo_trans_2.png" /></div>
        <Content>
          <span>Assignment</span>
          <a href="http://rohitsharma.xyz" target="_blank">Profile</a>
          <a href="https://www.linkedin.com/in/rohit7209/" target="_blank">LinkedIn</a>
          <a href="https://github.com/rohit7209" target="_blank">Github</a>
        </Content>
      </Wrapper>
    );
  }
}

Header.propTypes = {};

export default Header;
