import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as Icon from 'react-bootstrap-icons';
import LoadingSpinner from '../components/LoadingSpinner';
import { pageStyle } from './pageStyles';
import { ComponentIDs, PageIDs } from '../utilities/ids';
import { Expenses } from '../../api/expenses/Expenses';

/* Component for layout out an Expenses Card. */
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const MakeCard = ({ expense }) => (
  <Col>
    <Card className="mt-2" style={{ width: '40' }}>
      <Card.Header>
        <h4><strong>{expense.name}</strong></h4>
        <Card.Subtitle><span className="date">{expense.category}</span></Card.Subtitle>
      </Card.Header>
      <Card.Body>
        <Card.Text>
          <span style={{ fontSize: '30pt', color: '#C70039 ' }}>-${expense.amount}</span>
        </Card.Text>
        <Card.Text style={{ textAlign: 'right' }}>
          {`${months[expense.date.getMonth()]} ${expense.date.getDate()}, ${expense.date.getFullYear()} `}
          <Link id={ComponentIDs.editExpenseLink} to={`/editexpense/${expense._id}`}> <Icon.PencilSquare id="icon" /></Link>
        </Card.Text>
      </Card.Body>
    </Card>
  </Col>
);

MakeCard.propTypes = {
  expense: PropTypes.shape({
    name: PropTypes.string,
    category: PropTypes.string,
    amount: PropTypes.number,
    monthly: PropTypes.bool,
    weekly: PropTypes.bool,
    date: PropTypes.instanceOf(Date),
    _id: PropTypes.string,
  }).isRequired,
};

/* Renders the Expenses Collection as a set of Cards. */
const Expense = () => {

  const { ready, expense } = useTracker(() => {
    // Ensure that minimongo is populated with all collections prior to running render().
    const sub = Meteor.subscribe(Expenses.userPublicationName);
    const expenseItems = Expenses.collection.find({}).fetch();
    return {
      expense: expenseItems,
      ready: sub.ready(),
    };
  }, []);
  return ready ? (
    <Container id={PageIDs.expensePage} style={pageStyle}>
      <h1 className="my-3">Expense Overview</h1>
      <Container className="my-3 px-0">
        <Button id={ComponentIDs.addExpensesButton} variant="outline-danger" href="/addexpense">Add Expense</Button>{' '}
      </Container>
      <Row xs={1} md={1} lg={1} className="g-2">
        {/* eslint-disable-next-line no-shadow */}
        {expense.map((expense) => <MakeCard key={expense._id} expense={expense} />)}
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default Expense;
