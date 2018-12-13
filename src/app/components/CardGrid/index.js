import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ImgSlider from './../ImgSlider';

const Wrapper = styled.div`
  width: calc(25% - 42px);
  padding: 30px 20px;
`;

const Container = styled.div`
  width: 100%;
  box-shadow: 0px 0px 6px #00000030;
  border-radius: 3px;
  overflow: hidden;
`;

const Title = styled.a`
  display: block;
  width: 100%;
  white-space: nowrap; 
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 2px;
  font-size: 13px;
  &:active, &:visited, &:focus, &{
    text-decoration: none;
    color: #FD003E;
  }
`;

const Desc = styled.div`
  padding: 3px;
`;

const Info1 = styled.div`
  display:flex;
  margin: 10px 0;
  &>div{
    width: 33%;
    color: #737373;
    font-size: 13px;
    text-align: center;
    position: relative;
  }

  &>div:after{
    content: '';
    position: absolute;
    width: 1px;
    background: #d3d3d3;
    height: 80%;
    top: 10%;
    right: -1px;
  }

  &>div:last-child:after{
    display:none;
  }

  &>div>span:last-child{
    font-size: 10px;
    color: #a3a3a3;
  }
`;

const Info2 = styled.div`
  display:flex;
  margin-top: 5px;
  &>div{
    width: 33%;
    color: #737373;
    font-size: 13px;
    text-align: center;
    position: relative;
  }
  &>div>i{
    color: #FD003E;
  }
  &>div>span{
    font-size: 10px;
  }
`;

class CardGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getAvailableFrom = (time) => new Date(time) <= new Date() ? 'Immediately' : new Date(time).toDateString();

  getLeaseType = (type) => {
    switch (type) {
      case 'FAMILY': return 'Family';
      case 'BACHELOR': return 'Bachelor';
      case 'ANYONE': return 'Anyone';
      default: return type;
    }
  }

  getParking = (parking) => {
    switch (parking) {
      case 'NONE': return 'None';
      case 'BOTH': return 'Both';
      case 'TWO_WHEELER': return '2 Wheeler';
      case 'FOUR_WHEELER': return '4 Wheeler';
      default: return parking;
    }
  }

  render() {
    const details = this.props.details;
    return (
      <Wrapper>
        <Container>
          <ImgSlider
            // list={['http://via.placeholder.com/100x300', 'http://via.placeholder.com/300x200', 'https://images.nobroker.in/static/img/resale/1bhk.jpg']}
            list={details.photos.map(photo => `https://images.nobroker.in/images/${details.id}/${photo.imagesMap.medium}`)}
          />
          <Desc>
            <Title href="#" title="1 BHK in HSR Layout, 1st Sector">{details.title}</Title>
            <Info1>
              <div>{details.propertySize} sqft <br /> <span>Area</span> </div>
              <div><i className="fa fa-inr" /> {details.deposit} <br /> <span>Deposit</span> </div>
              <div><i className="fa fa-inr" /> {details.rent} <br /> <span>Rent</span> </div>
            </Info1>
            <Info2>
              <div><i className="fa fa-car" /><br /><span>{this.getParking(details.parking)}</span></div>
              <div><i className="fa fa-birthday-cake" /><br /><span>{details.propertyAge} yrs</span></div>
              <div><i className="fa fa-calendar-plus-o" /><br /><span>{this.getAvailableFrom(details.availableFrom)}</span></div>{/*Imidiately*/}
              <div><i className="fa fa-user" /><br /><span>{this.getLeaseType(details.leaseType)}</span></div>
            </Info2>
          </Desc>
        </Container>
      </Wrapper>
    );
  }
}

CardGrid.propTypes = {
  details: PropTypes.object.isRequired,
};

export default CardGrid;
