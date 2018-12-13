import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import ViewToggle from './../../components/ViewToggle';
import SortToggle from './../../components/SortToggle';
import Hr from './../../components/Hr';
import GridView from './../GridView';
import SliderView from './../SliderView';
import FilterList from './../FilterList';

import { updateFilter } from './../FilterList/actions';
import { sortProperties } from './../GridView/actions';

const Wrapper = styled.div`
  padding: 10px;
  display: flex;
`;

const Col = styled.div`
  padding: 10px;
`;

const Col1 = styled(Col) `
  width: 230px;
  min-height: 100vh;
  border-right: 1px solid grey;
`;

const Col2 = styled(Col) `
  width: calc(100% - 231px);
`;



class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sliderView: false,
    };
  }

  onChange = (sliderView) => this.setState({ sliderView })

  onSortChange = (sortDescending) => {
    this.props.updateFilter({ sortDescending });
    this.props.sortProperties({ sortDescending });
  }

  render() {
    // console.log('state::', this.state);
    return (
      <Wrapper>
        <Col1>
          <FilterList />
        </Col1>

        <Col2>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ paddingTop: '10px', fontSize: '12px' }}>Sort: &nbsp;&nbsp;<SortToggle onChange={this.onSortChange} text="Rent" ascending /></div>
            <ViewToggle onChange={this.onChange} />
          </div>
          <Hr />

          {this.state.sliderView ? <SliderView /> : <GridView />}

        </Col2>
      </Wrapper>
    );
  }
}

HomePage.propTypes = {};

GridView.propTypes = {
  properties: PropTypes.object.isRequired,
};


const mapStateToProps = state => ({
  filters: state.Filters,
});

const mapDispatchToProps = dispatch => ({
  updateFilter: (payload) => dispatch(updateFilter(payload)),
  sortProperties: (payload) => dispatch(sortProperties(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
