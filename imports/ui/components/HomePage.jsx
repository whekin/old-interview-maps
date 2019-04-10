import React, { Component } from 'react';
import { Map as LeafletMap, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Route, withRouter, Redirect } from 'react-router';
import { Markers } from '../../api/markers';
import { withTracker } from 'meteor/react-meteor-data';
import SideBar from './SideBar';
import EditMarker from './EditMarker';
import { Meteor } from 'meteor/meteor';

class HomePage extends Component {
  state = {
    lat: 47.227088,
    lng: 39.714387,
    zoom: 13,
    marker: {
      lat: 47.227088,
      lng: 39.714387
    },
    editMarker: null
  }

  openSideBar = () => {
    this.props.history.push("/add");
  }

  handleDoubleClick = e => {
    this.setState({
      marker: {
        lat: e.latlng.lat.toFixed(6),
        lng: e.latlng.lng.toFixed(6)
      }
    });

    this.openSideBar();
  }

  handleMarkerPosChange = ({ lat, lng }) => {
    this.setState({
      marker: {
        lat,
        lng
      }
    });
  }

  handleZoom = e => {
    this.setState({
      zoom: e.sourceTarget._zoom
    });
  }

  updateMarkerPos = e => {
    this.setState({
      marker: {
        lat: e.target._latlng.lat.toFixed(6),
        lng: e.target._latlng.lng.toFixed(6)
      }
    });
  }

  render() {
    const position = [this.state.lat, this.state.lng];

    return (
      <div className="HomePage">
        <button onClick={this.openSideBar} className="btn">Add</button>
        <LeafletMap
          ondblclick={this.handleDoubleClick}
          doubleClickZoom={false}
          onzoomend={this.handleZoom}
          center={position}
          zoom={this.state.zoom}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Route path="/add" render={() =>
            <Marker
              draggable
              onDragend={this.updateMarkerPos}
              position={[this.state.marker.lat, this.state.marker.lng]}>
              <Popup>
                Current Marker
              </Popup>
            </Marker>
          } />
          {
            this.props.markers.map(marker => (
              <Marker
                key={marker._id}
                ondblclick={() => {
                  this.setState({
                    editMarker: marker
                  }, () => {
                    this.props.history.push(`/edit`);
                  });
                }}
                position={[marker.coords.lat, marker.coords.lng]}>
                {marker.name.length > 0 &&
                  <Popup>
                    {marker.name}
                  </Popup>
                }
              </Marker>
            ))
          }
        </LeafletMap>
        <Route path="/add" render={() =>
          <SideBar
            onMarkerPosChange={this.handleMarkerPosChange}
            coords={{
              lat: this.state.marker.lat,
              lng: this.state.marker.lng
            }}
            zoom={this.state.zoom} />
        } />
        <Route path="/edit" render={() => {
          if (this.state.editMarker) {
            return <EditMarker editMarker={this.state.editMarker} />;
          } else {
            return <Redirect to="/" />;
          }
        }} />
      </div>
    );
  }
}

const HomePageWithData = withTracker(() => {
  Meteor.subscribe('markers');

  return {
    markers: Markers.find({}).fetch()
  };
})(HomePage);

export default withRouter(HomePageWithData);
