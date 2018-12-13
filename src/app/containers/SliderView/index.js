import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { requestNextProperties } from './../GridView/actions';
import CardSlider from './../../components/CardSlider';
import Loader from './../../components/Loader';

const Wrapper = styled.div`
  min-height: 520px;
  padding: 10px;
  position: relative;
  overflow: hidden;
`;

const SlideBtn = styled.button`
  position: absolute;
  top: calc(50% - 60px);
  left: ${props => props.left ? '10px' : 'unset'};
  right: ${props => props.right ? '10px' : 'unset'};
  z-index: 100;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 80px;
  outline: none;
`;

const Loader1 = styled(Loader) `
  position: absolute;
  top: calc(50% - 20px);
  z-index: 100;
`;

const Info = styled.div`
  color: #FD003E;
  font-size: 15px;
  margin: 0px auto 20px -10px;
`;

class SliderView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // flags to manage translating cards to left/right
      translate: false,
      hideTranslated: false,

      // flags for infinite loading
      currentPage: -1000, // 1,
      countPerPage: 25,
      totalCount: 0,
      loading: false,

      // current property
      currentPropertyIndex: 0,
      currentProperty: null,
      list: [],
    };
  }

  componentWillMount() {
    this.props.requestNextProperties({
      sort: this.props.filters.sort,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.properties.list !== nextProps.properties.list || this.props.filters !== nextProps.filters) {
      this.filterPropertyList(nextProps);
    }
  }


  filterPropertyList = (props = this.props) => {
    const { rent, area, withPhotos } = props.filters;
    // console.log(rent, area, withPhotos);
    const list = props.properties.list.filter(property => (rent > 0 ? property.rent <= rent : true) && (area > 0 ? property.propertySize <= area : true) && (withPhotos ? property.photos.length > 0 : true));
    const currentPropertyIndex = list[this.state.currentPropertyIndex] ? this.state.currentPropertyIndex : 0;
    this.setState({
      list,
      currentProperty: list[currentPropertyIndex],
      currentPropertyIndex,
      loading: props.properties.requesting,
      totalCount: props.properties.total_count,
    });
  }

  slideCard = (translate) => {
    // console.log('slded right');
    this.setState({ translate });
    this.handleTranslate(translate);
  }

  handleTranslate = (translateType) => {
    setTimeout(() => {
      this.setState({
        hideTranslated: true,
      });
    }, 400);

    setTimeout(() => {
      let currentPropertyIndex = eval(this.state.currentPropertyIndex + translateType + 1);
      currentPropertyIndex = currentPropertyIndex < 1 ? 0 : currentPropertyIndex
      // console.log('inde::', currentPropertyIndex);

      if (!this.state.list[currentPropertyIndex]) {
        this.props.requestNextProperties({
          pageNumber: this.state.currentPage,
          count: this.state.countPerPage,
          sort: this.props.filters.sort,
        });
        this.setState({
          currentPage: this.state.currentPage + 1,
          currentPropertyIndex,
          hideTranslated: false,
          translate: false,
        });
      } else this.setState({
        currentPropertyIndex,
        currentProperty: this.state.list[currentPropertyIndex],
        hideTranslated: false,
        translate: false,
      });
    }, 500);
  }

  render() {
    const style = {};
    if (this.state.translate) style.transform = `translateX(${this.state.translate === '+' ? '-' : '+'}115%)`;

    return (
      <Wrapper>
        <Info>showing {this.state.currentPropertyIndex + 1} of {this.state.list.length}</Info>
        {!this.state.currentProperty || this.state.hideTranslated ? <Loader1 /> : <CardSlider style={{ ...style }} details={this.state.currentProperty} />}

        {this.state.currentProperty ? [
          <SlideBtn left onClick={() => this.slideCard('-')}><i className="fa fa-angle-left" /></SlideBtn>,
          <SlideBtn right onClick={() => this.slideCard('+')}><i className="fa fa-angle-right" /></SlideBtn>,
        ] : null}
      </Wrapper>
    );
  }
}

SliderView.propTypes = {};


const mapStateToProps = state => ({
  properties: state.GridView,
  filters: state.Filters,
});

const mapDispatchToProps = dispatch => ({
  requestNextProperties: (payload) => dispatch(requestNextProperties(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SliderView);

        /* <div style={{ flex: '1', display: 'flex', overflow: 'auto' }}>
          <div style={{ minHeight: 'min-content', display: 'flex', position: 'relative' }}>
            <CardSlider />
            <CardSlider />
          </div>
        </div> */
