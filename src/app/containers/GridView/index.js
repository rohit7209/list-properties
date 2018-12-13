import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { requestNextProperties } from './actions';
import styled from 'styled-components';
import CardGrid from './../../components/CardGrid';
import Loader from './../../components/Loader';

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  // text-align: center;
  justify-content: center;
`;

class GridView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // ideally currentPage's default value should be 1. since API doesn't provide pagination it is set to -1000
      currentPage: -1000, // 1,
      countPerPage: 25,
      totalCount: 0,
      loading: false,
      list: [],
    };
  }

  componentDidMount = () => {
    window.addEventListener('scroll', this.onScrollHandler);
    this.props.requestNextProperties({
      sort: this.props.filters.sort,
    });
  }

  onScrollHandler = () => {
    // console.log('eee::', document.body.offsetHeight - window.scrollY - window.innerHeight);
    if (document.body.offsetHeight - window.scrollY - window.innerHeight < 50) {
      if (this.state.currentPage * this.state.countPerPage < this.state.totalCount) {
        this.props.requestNextProperties({
          pageNumber: this.state.currentPage,
          count: this.state.countPerPage,
          sort: this.props.filters.sort,
        });
        this.setState({ currentPage: this.state.currentPage + 1 });
      }
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.properties !== nextProps.properties) {
      this.setState({
        loading: nextProps.properties.requesting,
        totalCount: nextProps.properties.total_count,
      });
      if (this.props.properties.list !== nextProps.properties.list) this.filterPropertyList(nextProps);
    }
    if (this.props.filters !== nextProps.filters) this.filterPropertyList(nextProps)
  }

  filterPropertyList = (props = this.props) => {
    const { rent, area, withPhotos } = props.filters;
    this.setState({
      list: props.properties.list.filter(property => (rent > 0 ? property.rent <= rent : true) && (area > 0 ? property.propertySize <= area : true) && (withPhotos ? property.photos.length > 0 : true)),
    });
  }


  render() {
    return (
      <Wrapper>
        {this.state.list.map((property, key) => <CardGrid key={property.id + key} details={property} />)}
        <br />
        {this.state.loading ? <Loader /> : null}
      </Wrapper>
    );
  }
}

GridView.propTypes = {
  properties: PropTypes.object.isRequired,
  requestNextProperties: PropTypes.func.isRequired,
};


const mapStateToProps = state => ({
  properties: state.GridView,
  filters: state.Filters,
});

const mapDispatchToProps = dispatch => ({
  requestNextProperties: (payload) => dispatch(requestNextProperties(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GridView);
