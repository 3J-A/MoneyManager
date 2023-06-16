import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/** Encapsulates state and variable values for this collection. */
class IncomeCollection {
  constructor() {
    // The name of this collection.
    this.name = 'IncomeCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      name: { type: String, optional: false },
      category: { type: String, allowedValues: ['Work', 'Allowance', 'Tax Return', 'MISC'] },
      amount: { type: Number, optional: false },
      monthly: {
        type: Boolean,
        defaultValue: false,
        optional: true,
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

export const Income = new IncomeCollection();
