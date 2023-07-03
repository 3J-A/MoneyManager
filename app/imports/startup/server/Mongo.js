import { Meteor } from 'meteor/meteor';
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
