import { Meteor } from 'meteor/meteor';
import { Budget } from '../../api/budget/Budget';
import { Expenses } from '../../api/expenses/Expenses';

Meteor.publish(Budget.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Budget.collection.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish(Expenses.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Expenses.collection.find({ owner: username });
  }
  return this.ready();
});

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
