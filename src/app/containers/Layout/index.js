import React from 'react';
import PropTypes from 'prop-types';
import Header from './../Header';
import Footer from './../Footer';
import { createGlobalStyle } from 'styled-components';

const InjectGlobal = createGlobalStyle`
  body {
    margin: 0;
    font-family: sans-serif;
  }
`

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Header />
        {this.props.children}
        <InjectGlobal />
        <Footer />
      </div>
    );
  }
}

Layout.propTypes = {};

export default Layout;
