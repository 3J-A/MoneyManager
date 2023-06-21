import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import { pageStyle } from './pageStyles';
import { PageIDs } from '../utilities/ids';
import { Budget } from '../../api/budget/Budget';

/* Component for layout out a Profile Card. */
const MakeCard = ({ budget }) => (
  <Col>
    <Card className="h-100" style={{ width: '50' }}>
      <Card.Header>
        <Card.Title>{budget.category} </Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Text>
          ${budget.amount}
        </Card.Text>
        <Link to={`/edit/${budget._id}`}>Edit</Link>
      </Card.Body>
    </Card>
  </Col>
);

MakeCard.propTypes = {
  budget: PropTypes.shape({
    category: PropTypes.string,
    amount: PropTypes.number,
    _id: PropTypes.string,
  }).isRequired,
};

/* Renders the Profile Collection as a set of Cards. */
const Budgets = () => {

  const { ready, budget } = useTracker(() => {
    // Ensure that minimongo is populated with all collections prior to running render().
    const sub = Meteor.subscribe(Budget.userPublicationName);
    const budgetItems = Budget.collection.find({}).fetch();
    return {
      budget: budgetItems,
      ready: sub.ready(),
    };
  }, []);
  return ready ? (
    <Container id={PageIDs.profilesPage} style={pageStyle}>
      <h1>Monthly Budgets</h1>
      <Button variant="outline-success" href="/addbudget">Add Budget</Button>{' '}
      <Row xs={3} md={2} lg={3} className="g-2">
        {/* eslint-disable-next-line no-shadow */}
        {budget.map((budget) => <MakeCard key={budget._id} budget={budget} />)}
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default Budgets;
