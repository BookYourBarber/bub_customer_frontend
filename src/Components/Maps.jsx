import React, { Component } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Col, Container, Row, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faPhone, faClock } from '@fortawesome/free-solid-svg-icons';
import { Link} from "react-router-dom";

class Maps extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userLocation: {
        lat: 0,
        lng: 0
      },
      map: null,
      barbers: [],
      selectedBarber: null
    }
    this.nameRef = React.createRef()
    this.locationRef = React.createRef()
    this.phoneRef = React.createRef()
    this.hoursRef = React.createRef()
    
  }
  
libraries = ["places"]

containerStyle = {
  width: '100%',
  height: '600px'
};

  center = {
    lat: -3.745,
    lng: -38.523
  };
  
  getBarberInformation(id){
    // eslint-disable-next-line no-undef
    const service = new google.maps.places.PlacesService(this.state.map);
    const request = {
      placeId: id,
      fields: ['name', 'rating', 'formatted_phone_number', 'geometry', 'formatted_address', 'icon', 'address_component', 'photo', 'place_id', 'vicinity', 'opening_hours', 'website']
    };
    
    service.getDetails(request, (place, status) => {
      // eslint-disable-next-line no-undef
      if (status === google.maps.places.PlacesServiceStatus.OK){
        // Update the inner text of the DOM elements
        this.nameRef.current.innerText = place.name;
        this.locationRef.current.innerText = place.vicinity;
        this.phoneRef.current.innerText = place.formatted_phone_number;
        this.hoursRef.current.innerText = place.opening_hours.weekday_text.join("\n");
      }
    });

    return null;
  }
  
  addBarbersToState(barbers) {
    barbers = barbers.filter(b => {return b.business_status==="OPERATIONAL"})
    console.log(barbers)
    this.setState({barbers: [...this.state.barbers, ...barbers]})
  }
  

  onMapLoad(map) {
    // Get user's current location and update state
    navigator?.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      this.setState({
        userLocation: {
          lat: latitude,
          lng: longitude,
        },
        map: map

      }, () => {
        map.panTo(this.state.userLocation)

        // eslint-disable-next-line no-undef
        let service = new google.maps.places.PlacesService(map)
        let options = {
          location: this.state.userLocation,
          radius: 5000,
          types: ["hair_care"]
        }
  
        service.nearbySearch(options, (results, status, pagination)=> {
          // eslint-disable-next-line no-undef
          if(status !== google.maps.places.PlacesServiceStatus.OK){
            return
          }

          this.addBarbersToState(results)

          if(pagination.hasNextPage)
            pagination.nextPage()
        })
      })
    });

  }

  selectBarber(barberId) {
    if(!barberId){
      return;
    }

    this.getBarberInformation(barberId)
    console.log(barberId)
    this.setState({
      selectedBarber: barberId
    })
    console.log("dasdasds")
    
  }
  
  render() {
    return (
      <LoadScript
      googleMapsApiKey={process.env.REACT_APP_API_KEY}
      libraries={this.libraries}
        >
        <Container>
          <Row>
            <Col>  
              <GoogleMap
              mapContainerStyle={this.containerStyle}
              center={this.center}
              zoom={14}
              onLoad={map => this.onMapLoad(map)}
              >
                <Marker
                  position={this.state.userLocation}
                  icon={{
                    url: `/imgs/home.png`
                  }}
                />
                {this.state.barbers.map(barber => (
                  <Marker position={barber.geometry.location} title={barber.name} onClick={ ()=> this.selectBarber(barber.place_id)} ></Marker>
                ))}
              </GoogleMap>
            </Col>
            <Col>
              <h1 id='name' ref={this.nameRef} >  </h1>
              <p id='location' ref={this.locationRef}><FontAwesomeIcon icon={faLocationDot} /> </p>
              <p id='phone' ref={this.phoneRef}><FontAwesomeIcon icon={faPhone} /> </p>
              <p id='hours' ref={this.hoursRef}><FontAwesomeIcon icon={faClock}/></p>
              {this.state.selectedBarber ?(
                <Link to={`/appointment/${this.state.selectedBarber}`}>
                  <Button variant="outline-dark">Make an appointment</Button>
                  </Link>
               ) : null} 
            </Col>
          </Row>
        </Container>
      </LoadScript>
    )
  }
}

export default Maps