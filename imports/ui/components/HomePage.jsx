import React, { Component } from 'react';
import 'leaflet/dist/leaflet.css';
import { Map as LeafletMap, Marker, Popup, TileLayer } from 'react-leaflet';

class HomePage extends Component {
  state = {
    lat: 47.227088,
    lng: 39.714387,
    zoom: 13
  }

  render() {
    const position = [this.state.lat, this.state.lng];

    return (
      <LeafletMap
        center={position}
        zoom={this.state.zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} >
          <Popup>
            Milk&Cartoons
          </Popup>
        </Marker>
      </LeafletMap>
    );
  }
}

export default HomePage;
