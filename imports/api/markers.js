import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Markers = new Mongo.Collection('markers');

if (Meteor.isServer) {
  Meteor.publish('markers', () => {
    return Markers.find({ owner: { $eq: Meteor.userId() } });
  });
}

Meteor.methods({
  /**
   * Create a new marker
   * @param {object} data
   * @param {string} data.name
   * @param {object} data.coords
   * @param {number} data.coords.lat
   * @param {number} data.coords.lng
   */
  'markers.create'(data) {
    check(data, Object);

    if (!this.userId) {
      throw new Meteor.Error('not authorized');
    }

    return Markers.insert({
      ...data,
      owner: Meteor.userId()
    });
  },
  'markers.delete'(id) {
    check(id, String);

    if (!this.userId) {
      throw new Meteor.Error('not authorized');
    }

    return Markers.remove({
      _id: { $eq: id }
    });
  },
  'markers.update'(id, data) {
    if (!this.userId) {
      throw new Meteor.Error('not authorized');
    }

    return Markers.update(id, {
      $set: {
        name: data.name
      }
    });
  }
});
