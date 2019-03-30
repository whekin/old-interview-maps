import React, { Component } from 'react';
import { withRouter } from 'react-router';

class SideBar extends Component {
  state = {
    name: "",
    lat: this.props.coords.lat,
    lng: this.props.coords.lng
  }

  componentWillReceiveProps(props) {
    this.setState({
      lat: props.coords.lat,
      lng: props.coords.lng
    });
  }

  closeBar = e => {
    this.props.history.push("/");
  }

  handleSubmit = e => {
    e.preventDefault();
    const { name, lat, lng } = this.state;

    Meteor.call('markers.create', { name, coords: { lat, lng } });
    this.closeBar();
  }

  handleChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    }, () => {
      this.props.onMarkerPosChange(this.state);
    });
  }

  render() {
    const { zoom } = this.props;
    const step = (5 / Math.pow(2, zoom)).toFixed(6);

    return (
      <div className="SideBar">
        <div onClick={this.closeBar} className="btn-close">×</div>
        <center>
          <h3>Add new Marker</h3>
        </center>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="name"
            onChange={this.handleChange}
            value={this.state.name}
            placeholder="Name"
            autoComplete="off" />
          <input
            type="number"
            name="lat"
            onChange={this.handleChange}
            value={this.state.lat}
            placeholder="Latitude"
            step={step} />
          <input
            type="number"
            name="lng"
            onChange={this.handleChange}
            value={this.state.lng}
            placeholder="Longitude"
            step={step} />
          <button className="btn" type="submit">Add the marker</button>
        </form>
      </div>
    );
  }
}

export default withRouter(SideBar);
