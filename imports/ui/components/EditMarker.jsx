import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Meteor } from 'meteor/meteor';

class EditMarker extends Component {
  state = {
    name: this.props.editMarker.name
  }

  closeBar = e => {
    this.props.history.push("/");
  }

  handleChange = e => {
    this.setState({
      name: e.target.value
    });
  }

  handleDelete = e => {
    Meteor.call("markers.delete", this.props.editMarker._id);
    this.closeBar();
  }

  handleSave = e => {
    Meteor.call(
      "markers.update",
      this.props.editMarker._id,
      { name: this.state.name });
    this.closeBar();
  }

  render() {
    return (
      <div className="EditMarker">
        <div onClick={this.closeBar} className="btn-close">×</div>
        <center>
          <h3>Edit The Marker</h3>
        </center>
        <form>
          <input
            name="rename"
            type="text"
            onChange={this.handleChange}
            value={this.state.name}
            placeholder="New name" />
          <center>
            <button
              name="save"
              className="btn"
              onClick={this.handleSave}>Save new name</button>
            <br />
            <button
              name="delete"
              className="btn"
              onClick={this.handleDelete}>Delete the Marker</button>
          </center>
        </form>
      </div>
    );
  }
}

export default withRouter(EditMarker);
