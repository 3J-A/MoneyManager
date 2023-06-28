import React from 'react';
import { AutoForm, TextField, SubmitField } from 'uniforms-bootstrap5';
import { Container, Col, Card, Row, Button } from 'react-bootstrap';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';
import PropTypes from 'prop-types';
import { Budget } from '../../api/budget/Budget';
import { Expenses } from '../../api/expenses/Expenses';
import { updateAccountMethod } from '../../startup/both/Methods';
import LoadingSpinner from '../components/LoadingSpinner';
import { pageStyle } from './pageStyles';
import { ComponentIDs, PageIDs } from '../utilities/ids';

// Months
const months = ['Jan.', 'Feb.', 'March', 'April', 'May', 'June', 'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'];

/* Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
  name: { type: String, label: 'Name', optional: true },
  email: { type: String, label: 'Email', optional: true },
});

// Make Budget
const MakeBudget = ({ budget, spent }) => (
  <Container className="px-0">
    <h4 className="mt-3">{budget.category}</h4>
    {((budget.amount - spent) >= 0) ? (
      [
        <span style={{ fontSize: '27pt', color: '#48a27b' }}>${budget.amount - spent}</span>,
      ]
    ) : (
      [
        <span style={{ fontSize: '27pt', color: '#FF4545' }}>-${-(budget.amount - spent)}</span>,
      ]
    )}
    <h5 className="mt-2 mb-4 ms-1"><strong>${spent}</strong> of <strong>${budget.amount}</strong> spent</h5>
    <hr />
  </Container>
);

MakeBudget.propTypes = {
  budget: PropTypes.shape({
    category: PropTypes.string,
    amount: PropTypes.number,
    _id: PropTypes.string,
  }).isRequired,
  spent: PropTypes.number.isRequired,
};

// Make Expense
const MakeExpense = ({ expense }) => (
  <Container className="my-2 px-0">
    <Row>
      <Col>
        <h5><strong>{expense.name}</strong></h5>
      </Col>
      <Col />
    </Row>
    <Row>
      <Col>
        <h6>{expense.category}</h6>
      </Col>
      <Col />
    </Row>
    <Row>
      <Col>
        <h6>-${expense.amount}</h6>
      </Col>
      <Col>
        <h6 className="text-end">{`${months[expense.date.getMonth()]} ${expense.date.getDate()}, ${expense.date.getFullYear()}` }</h6>
      </Col>
    </Row>
    <hr className="mt-1" />
  </Container>
);

MakeExpense.propTypes = {
  expense: PropTypes.shape({
    name: PropTypes.string,
    category: PropTypes.string,
    amount: PropTypes.number,
    monthly: PropTypes.bool,
    weekly: PropTypes.bool,
    date: PropTypes.instanceOf(Date),
  }).isRequired,
};

/* Renders the Home Page: what appears after the user logs in. */
const Home = () => {
  /* On submit, insert the data. */
  const submit = (data) => {
    Meteor.call(updateAccountMethod, data, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'You name was updated successfully.', 'success').then(function () {
          document.location.reload();
        });
      }
    });
  };

  const { expenses, budgets, ready } = useTracker(() => {
    // Ensure that minimongo is populated with all collections prior to running render().
    const sub1 = Meteor.subscribe(Budget.userPublicationName);
    const sub2 = Meteor.subscribe(Expenses.userPublicationName);
    const budgetItems = Budget.collection.find().fetch();
    const expenseItems = Expenses.collection.find().fetch();
    return {
      expenses: expenseItems,
      budgets: budgetItems,
      ready: sub1.ready() && sub2.ready(),
    };
  }, []);

  // Create the form schema for uniforms. Need to determine all interests and projects for muliselect list.
  const bridge = new SimpleSchema2Bridge(formSchema);
  // Current month and year
  const date = new Date();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  // Monthly budget
  const monthlyBudget = _.reduce(_.pluck(Budget.collection.find().fetch(), 'amount'), function (memo, num) { return memo + num; }, 0);
  const monthlyBudgetRounded = Number(`${Math.round(`${monthlyBudget}e2`)}e-2`);
  // Amount spent
  const amountSpent = _.reduce(_.pluck(Expenses.collection.find().fetch(), 'amount'), function (memo, num) { return memo + num; }, 0);
  const amountSpentRounded = Number(`${Math.round(`${amountSpent}e2`)}e-2`);

  // Now create the model with all the user information.
  return ready ? (
    <Container id={PageIDs.homePage} className="justify-content-center" style={pageStyle}>
      <Row className="justify-content-center">
        <Col xs={9} md={7}>
          <Col className="justify-content-center text-center py-3">
            {(Meteor.user().profile.name === '') ? (
              [
                <h2>Welcome!</h2>,
              ]
            ) : (
              [
                <h2>Welcome {Meteor.user().profile.name}!</h2>,
              ]
            )}
          </Col>
          <AutoForm
            model={{
              name: Meteor.user().profile.name,
              email: Meteor.user().username,
            }}
            schema={bridge}
            onSubmit={data => submit(data)}
          >
            <Card>
              <Card.Body>
                <h4><strong>Your Profile</strong></h4>
                <hr />
                <Container className="justify-content-center px-4">
                  <Row>
                    <Col><TextField id={ComponentIDs.homeFormName} name="name" showInlineError placeholder="Your name" /></Col>
                  </Row>
                  <Row>
                    <Col><TextField name="email" showInlineError placeholder="email" disabled value={Meteor.user().username} /></Col>
                  </Row>
                  <SubmitField id={ComponentIDs.homeFormSubmit} value="Update" />
                </Container>
              </Card.Body>
            </Card>
            <Card className="mt-5">
              <Card.Body>
                <h4><strong>Monthly Budget</strong></h4>
                <hr />
                <Container className="px-4">
                  <h4 className="mt-3">{`${month} ${year}`}</h4>
                  {((monthlyBudgetRounded - amountSpentRounded) >= 0) ? (
                    [
                      <span style={{ fontSize: '40pt', color: '#48a27b' }}>${monthlyBudgetRounded - amountSpentRounded}</span>,
                    ]
                  ) : (
                    [
                      <span style={{ fontSize: '40pt', color: '#FF4545' }}>-${-(monthlyBudgetRounded - amountSpentRounded)}</span>,
                    ]
                  )}
                  <h5 className="mt-2 mb-4 ms-1"><strong>${amountSpentRounded}</strong> of <strong>${monthlyBudgetRounded}</strong> spent</h5>
                  <a href="/budget" className="text-decoration-none">
                    <Button variant="primary">Edit</Button>
                  </a>
                </Container>
              </Card.Body>
            </Card>
            <Card className="mt-5">
              <Card.Body>
                <h4><strong>Budgets by Categories</strong></h4>
                <hr />
                <Container className="px-4">
                  {budgets.map((budget) => (
                    <MakeBudget
                      key={budget._id}
                      budget={budget}
                      spent={
                        _.reduce(_.pluck(_.groupBy(Expenses.collection.find().fetch(), 'category')[budget.category], 'amount'), function (memo, num) { return memo + num; }, 0)
                      }
                    />
                  ))}
                  {(Budget.collection.find().count() === 0) ? (
                    [
                      <a href="/budget" className="text-decoration-none">
                        <Button variant="primary">Add</Button>
                      </a>,
                    ]
                  ) : (
                    [
                      <a href="/budget" className="text-decoration-none">
                        <Button variant="primary">Edit</Button>
                      </a>,
                    ]
                  )}
                </Container>
              </Card.Body>
            </Card>
            <Card className="mt-5">
              <Card.Body>
                <h4><strong>Expenses</strong></h4>
                <hr />
                <Container className="px-4">
                  {expenses.map((expense) => <MakeExpense key={expense._id} expense={expense} />)}
                  <a href="/expenses" className="text-decoration-none">
                    <Button variant="primary">Add</Button>
                  </a>
                </Container>
              </Card.Body>
            </Card>
            <Card className="my-5">
              <Card.Body>
                <h4><strong>Security</strong></h4>
                <hr />
                <Container className="px-4">
                  <a href="/security" className="text-decoration-none">
                    <Button variant="primary">Password and 2FA</Button>
                  </a>
                </Container>
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default Home;
