import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/** Encapsulates state and variable values for this collection. */
class ExpensesCollection {
  constructor() {
    // The name of this collection.
    this.name = 'ExpensesCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      name: { type: String, optional: false },
      category: {
        type: String,
        allowedValues: ['Bill', 'Rent', 'Subscription', 'Groceries', 'MISC'],
      },
      amount: { type: Number, optional: false },
      monthly: {
        type: Boolean,
        defaultValue: false,
      },
      weekly: {
        type: Boolean,
        defaultValue: false,
        optional: true,
      },
      date: {
        type: Date,
      },
      owner: {
        type: String,
      },
    });
    // Ensure collection documents obey schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

export const Expenses = new ExpensesCollection();