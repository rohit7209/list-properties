import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Slider from './../../components/Slider';
import Button from './../../components/Button';
import CheckBox from './../../components/CheckBox';
import Hr from './../../components/Hr';
import { reset, updateFilter } from './actions';


const Block = styled.div`
  margin: 20px auto 20px auto;
  &>span{
    font-size: 12px;
    line-height: 30px;
  }
`;


class FilterList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  updateRent = (rent) => this.props.updateFilter({ rent })
  updateArea = (area) => this.props.updateFilter({ area })
  updateWithPhotos = (withPhotos) => this.props.updateFilter({ withPhotos })

  render() {
    // console.log('props::', this.props);
    return (
      <div>
        <Button sm alt style={{ padding: '0px' }} onClick={this.props.reset}>Reset all</Button>
        <Hr />
        <CheckBox onChange={this.updateWithPhotos} defaultValue={this.props.filters.withPhotos} /> <span style={{ fontSize: '12px' }}>Show properties with photos</span>
        <Hr />
        <Block style={{ marginBottom: 0 }}>
          <span>Floor Area</span>
          <Slider
            min={0}
            max={10000}
            defaultValue={this.props.filters.area}
            onChange={this.updateArea}
            post="sqft"
          />
        </Block>
        <Block>
          <span>Rent</span>
          <Slider
            min={0}
            max={120000}
            defaultValue={this.props.filters.rent}
            onChange={this.updateRent}
            pre={<i className="fa fa-inr" />}
          />
        </Block>
        <Hr />

      </div>
    );
  }
}

FilterList.propTypes = {};

const mapStateToProps = state => ({
  filters: state.Filters,
});

const mapDispatchToProps = dispatch => ({
  reset: (payload) => dispatch(reset(payload)),
  updateFilter: (payload) => dispatch(updateFilter(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterList);
