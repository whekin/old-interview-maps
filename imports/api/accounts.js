import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Meteor.methods({
  'accounts.create'(userData) {
    if (this.userId) {
      throw new Meteor.Error('authorized');
    }

    return !!Accounts.createUser(userData);
  }
});
