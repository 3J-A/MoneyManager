import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Expenses } from '../../api/expenses/Expenses';
import { Budget } from '../../api/budget/Budget';

/**
 * In Bowfolios, insecure mode is enabled, so it is possible to update the server's Mongo database by making
 * changes to the client MiniMongo DB.
 *
 * However, updating the database via client-side calls can be inconvenient for two reasons:
 *   1. If we want to update multiple collections, we need to use nested callbacks in order to trap errors, leading to
 *      the dreaded "callback hell".
 *   2. For update and removal, we can only provide a docID as the selector on the client-side, making bulk deletes
 *      hard to do via nested callbacks.
 *
 * A simple solution to this is to use Meteor Methods (https://guide.meteor.com/methods.html). By defining and
 * calling a Meteor Method, we can specify code to be run on the server-side but invoked by clients. We don't need
 * to use callbacks, because any errors are thrown and sent back to the client. Also, the restrictions on the selectors
 * are removed for server-side code.
 *
 * Meteor Methods are commonly introduced as the necessary approach to updating the DB once the insecure package is
 * removed, and that is definitely true, but Bowfolios illustrates that they can simplify your code significantly
 * even when prototyping. It turns out that we can remove insecure mode if we want, as we use Meteor methods to update
 * the database.
 *
 * Note that it would be even better if each method was wrapped in a transaction so that the database would be rolled
 * back if any of the intermediate updates failed. Left as an exercise to the reader.
 */

const updateAccountMethod = 'Account.update';

Meteor.methods({
  'Account.update'({ name }) {
    Meteor.users.update({ _id: Meteor.userId() }, { $set: { 'profile.name': name } });
  },
});

/**
 * The server-side Profiles.update Meteor Method is called by the client-side Home page after pushing the update button.
 * Its purpose is to update the Profiles, ProfilesInterests, and ProfilesProjects collections to reflect the
 * updated situation specified by the user.
 */

const addExpenseMethod = 'Expense.add';

Meteor.methods({
  'Expense.add'({ name, category, amount, monthly, weekly, date }) {
    const owner = Meteor.user().username;
    Expenses.collection.insert({ name, category, amount, monthly, weekly, date, owner });
  },
});

const addBudgetMethod = 'Budget.add';

Meteor.methods({
  'Budget.add'({ category, amount }) {
    const owner = Meteor.user().username;
    Budget.collection.insert({ category, amount, owner });
  },
});

const updateBudget = 'Budget.update';

Meteor.methods({
  'Budget.update'({ _id, category, amount }) {
    new SimpleSchema({
      _id: { type: String },
      category: {
        type: String,
        allowedValues: ['Household', 'Food', 'Shopping', 'Utilities', 'Transportation', 'Entertainment', 'Subscription', 'Pet', 'Miscellaneous'],
      },
      amount: { type: Number, optional: false },
    }).validate({ _id, category, amount });

    Budget.collection.update(_id, {
      $set: { category, amount },
    });
  },
});

const updateExpense = 'Expense.update';

Meteor.methods({
  'Expense.update'({ _id, name, category, amount, monthly, weekly, date }) {
    new SimpleSchema({
      _id: { type: String },
      name: { type: String, optional: false },
      category: {
        type: String,
        allowedValues: ['Household', 'Food', 'Shopping', 'Utilities', 'Transportation', 'Entertainment', 'Subscription', 'Pet', 'Miscellaneous'],
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
    }).validate({ _id, name, category, amount, monthly, weekly, date });

    Expenses.collection.update(_id, {
      $set: { name, category, amount, monthly, weekly, date },
    });
  },
});

export { updateAccountMethod, addExpenseMethod, addBudgetMethod, updateBudget, updateExpense };
