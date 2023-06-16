import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Encapsulates state and variable values for this collection. */
class BudgetCollection {
  constructor() {
    // The name of this collection.
    this.name = 'BudgetCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      category: {
        type: String,
        allowedValues: ['Bill', 'Rent', 'Subscription', 'Groceries', 'MISC'],
        optional: false,
      },
      amount: { type: Number, optional: false },
      owner: {
        type: String,
      },
    }, { tracker: Tracker });
    // Ensure collection documents obey schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

export const Budget = new BudgetCollection();
