import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ImgSlider from './../ImgSlider';
import Hr from './../../components/Hr';


const Wrapper = styled.div`
  width: 90%;
  margin: auto
  display: flex;
  flex-wrap:wrap;
  box-shadow: 0px 0px 5px #00000040;
  border-radius: 4px;
  overflow: hidden;

  transition: .4s;
`;


const Col1 = styled.div`
  width: 500px;
  height: 400px;
`;

const Col2 = styled.div`
  width: calc(100% - 524px);
  height: 380px;
  padding: 10px;
  position: relative;
  &:after{
    content: '';
    position: absolute;
    width: 98%;
    background: #d3d3d3;
    height: 1px;
    bottom: -1px;
    left: 1%;
  }
`;

const Title = styled.a`
  display: block;
  width: 100%;
  white-space: nowrap; 
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 2px;
  font-size: 18px;
  &:active, &:visited, &:focus, &{
    text-decoration: none;
    color: #FD003E;
  }
`;

const InfoTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  color: #838383;
  & td{
    padding: 20px 0px 20px 20px;
    border-bottom: 1px solid #f3f3f3;
  }
  & td:last-child>div>div:after{
    display:none;
  }
  & tr:last-child>td{
    border: none;
  }
`;

const InfoChip = styled.div`
  display: flex;
  justify-content: space-between;
  &>i{
    font-size: 35px;
    line-height: 60px;
  }

  &>div{
    position: relative;
    width: calc(100% - 60px);
    padding: 10px 0px;
  }

  &>div:after{
    content: '';
    position: absolute;
    width: 1px;
    background: #f3f3f3;
    height: 80%;
    top: 10%;
    right: -1px;
  }

  &>div>span{
    line-height: 24px;    
  }
  &>div>span:first-child{
    font-size: 17px;
  }
  &>div>span:last-child{
    font-size: 13px;
    color: #d3d3d3;   
  }
`;

const Footer = styled.div`
  width: 100%;
  padding: 20px 0px;
  display: flex;
  // justify-content: space-between;


  display:flex;
  // margin: 10px 0;
  &>div{
    // background: pink;
    width: 33%;
    color: #FD003E;
    font-size: 20px;
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
    font-size: 13px;
    color: #a3a3a3;
  }

`;


class CardSlider extends React.Component {
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
      <Wrapper style={{ ...this.props.style }}>
        <Col1>
          <ImgSlider
            style={{ height: '400px' }}
            list={details.photos.map(photo => `https://images.nobroker.in/images/${details.id}/${photo.imagesMap.medium}`)}
          />
        </Col1>
        <Col2>
          <Title href="#">{details.title}</Title>
          <Hr />
          <br />
          <InfoTable>
            <tbody>
              <tr>
                <td>
                  <InfoChip>
                    <i className="fa fa-bed" />
                    <div><span>{details.typeDesc.split(' ')[0]} Bedroom</span> <br /> <span>No. of Bedroom</span></div>
                  </InfoChip>
                </td>
                <td>
                  <InfoChip>
                    <i className="fa fa-calendar" />
                    <div><span>{this.getAvailableFrom(details.availableFrom)}</span> <br /> <span>Possession</span></div>
                  </InfoChip>
                </td>
              </tr>
              <tr>
                <td>
                  <InfoChip>
                    <i className="fa fa-users" />
                    <div><span>{this.getLeaseType(details.leaseType)}</span> <br /> <span>Tenants</span></div>
                  </InfoChip>
                </td>
                <td>
                  <InfoChip>
                    <i className="fa fa-car" />
                    <div><span>{this.getParking(details.parking)}</span> <br /> <span>Parking</span></div>
                  </InfoChip>
                </td>
              </tr>
              <tr>
                <td>
                  <InfoChip>
                    <i className="fa fa-birthday-cake" />
                    <div><span>{details.propertyAge} Years</span> <br /> <span>Age of Property</span></div>
                  </InfoChip>
                </td>
              </tr>
            </tbody>
          </InfoTable>
        </Col2>
        <Footer>
          <div>{details.propertySize} sqft <br /> <span>Area</span> </div>
          <div><i className="fa fa-inr" /> {details.deposit} <br /> <span>Deposit</span> </div>
          <div><i className="fa fa-inr" /> {details.rent} <br /> <span>Rent</span> </div>
        </Footer>
      </Wrapper>
    );
  }
}

CardSlider.propTypes = {
  style: PropTypes.object,
  details: PropTypes.object.isRequired,
};

export default CardSlider;
