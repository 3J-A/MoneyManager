import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import { pageStyle } from './pageStyles';
import { PageIDs } from '../utilities/ids';
import { Expenses } from '../../api/expenses/Expenses';

/* Component for layout out a Profile Card. */
const MakeCard = ({ expense }) => (
  <Col>
    <Card className="h-80" style={{ width: '40' }}>
      <Card.Header>
        <Card.Title>{expense.name} </Card.Title>
        <Card.Subtitle><span className="date">{expense.category}</span></Card.Subtitle>
      </Card.Header>
      <Card.Body>
        <Card.Text>
          -${expense.amount}
        </Card.Text>
        <Card.Text style={{ textAlign: 'right' }}>
          {`${expense.date}`}
        </Card.Text>
        <Link to={`/editexpense/${expense._id}`}>Edit</Link>
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

/* Renders the Profile Collection as a set of Cards. */
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
    <Container id={PageIDs.profilesPage} style={pageStyle}>
      <h1>Expense Overview</h1>
      <Button variant="outline-danger" href="/addexpense">Add Expense</Button>{' '}
      <Row xs={1} md={1} lg={1} className="g-2">
        {/* eslint-disable-next-line no-shadow */}
        {expense.map((expense) => <MakeCard key={expense._id} expense={expense} />)}
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default Expense;
