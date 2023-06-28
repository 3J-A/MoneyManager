import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import { Budget } from '../../api/budget/Budget';
import { Expenses } from '../../api/expenses/Expenses';

/* eslint-disable no-console */
const addBudget = (budget) => {
  console.log(`  Adding: ${budget.category} (${budget.owner})`);
  Budget.collection.insert(budget);
};

if (Budget.collection.find().count() === 0) {
  if (Meteor.settings.defaultBudget) {
    console.log('Creating default budget.');
    Meteor.settings.defaultBudget.forEach(budget => addBudget(budget));
  }
}

const addExpense = (expense) => {
  console.log(`  Adding: ${expense.name} (${expense.owner})`);
  Expenses.collection.insert(expense);
};

if (Expenses.collection.find().count() === 0) {
  if (Meteor.settings.defaultExpense) {
    console.log('Creating default expense.');
    Meteor.settings.defaultExpense.forEach(expense => addExpense(expense));
  }
}

/** Define a user in the Meteor accounts package. This enables login. Username is the email address. */
function createUser(email, role) {
  const userID = Accounts.createUser({ username: email, email, password: 'foo' });
  if (role === 'admin') {
    Roles.createRole(role, { unlessExists: true });
    Roles.addUsersToRoles(userID, 'admin');
  }
}

/** Initialize DB if it appears to be empty (i.e. no users defined.) */
if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.defaultAccounts) {
    console.log('Creating the default account(s)');
    Meteor.settings.defaultAccounts.forEach(({ email, role }) => createUser(email, role));
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
}
