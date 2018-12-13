import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Img = styled.div`
  width: 100%;
  height: 200px;
  background: url(${props => props.src});
  background-color: black;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  cursor: pointer;

  position: relative;

  -webkit-transition: .4s;
  transition: .4s;
`;

const ImageInfo = styled.div`
  position: absolute;
  font-size: 11px;
  color: #f3f3f3;
  background: rgba(0,0,0,0.2);
  bottom: 0px;
  width: calc(100% - 14px);
  padding: 7px;
`;

const ClickToView = styled.div`
  position: absolute;
  font-size: 11px;
  color: #f3f3f3;
  background: rgba(0,0,0,0.2);
  top: calc(50% - 25px);
  left: calc(50% - 25px);
  width: 50px;
  height: 50px;
  font-size: 15px;
  text-align:center;
  line-height: 50px;
  border-radius: 50%;
`;



class ImgSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      currentImage: this.props.list[0] || 'https://images.nobroker.in/static/img/resale/1bhk.jpg',
      currentIndex: 0,
    };
  }

  changeImage = () => {
    let currentIndex = this.props.list[this.state.currentIndex + 1] ? this.state.currentIndex + 1 : 0;
    this.setState({
      clicked: true,
      currentImage: this.props.list[currentIndex] || 'https://images.nobroker.in/static/img/resale/1bhk.jpg',
      currentIndex,
    })
  }

  render() {
    return (
      <Img src={this.state.currentImage} onClick={this.changeImage} style={{ ...this.props.style }}>
        {this.props.list.length > 0 ? [
          !this.state.clicked ? <ClickToView><i className="fa fa-hand-pointer-o" /></ClickToView> : null,
          <ImageInfo>{this.state.currentIndex + 1} of {this.props.list.length} Photos</ImageInfo>,
        ] : null}
      </Img>
    );
  }
}

ImgSlider.propTypes = {
  list: PropTypes.array.isRequired,
  style: PropTypes.object,
};

ImgSlider.defaultProps = {
  list: [],
  style: {},
}

export default ImgSlider;
