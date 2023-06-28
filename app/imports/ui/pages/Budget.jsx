import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as Icon from 'react-bootstrap-icons';
import LoadingSpinner from '../components/LoadingSpinner';
import { pageStyle } from './pageStyles';
import { PageIDs } from '../utilities/ids';
import { Budget } from '../../api/budget/Budget';

/* Component for layout out a Budget Card. */
const MakeCard = ({ budget }) => (
  <Col>
    <Card className="h-100" style={{ width: '50' }}>
      <Card.Header>
        <h4><strong>{budget.category}</strong></h4>
      </Card.Header>
      <Card.Body>
        <Card.Text>
          <span style={{ fontSize: '30pt', color: '#48a27b' }}>${budget.amount}</span>
        </Card.Text>
        <Card.Text style={{ textAlign: 'right' }}><Link to={`/editbudget/${budget._id}`}><Icon.PencilSquare id="icon" /></Link></Card.Text>
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

/* Renders the Budget Collection as a set of Cards. */
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
    <Container id={PageIDs.budgetPage} style={pageStyle}>
      <h1 className="my-3">Monthly Budgets</h1>
      <Container className="my-3 px-0">
        <Button variant="outline-success" href="/addbudget">Add Budget</Button>{' '}
      </Container>
      <Row xs={3} md={2} lg={3} className="g-2">
        {/* eslint-disable-next-line no-shadow */}
        {budget.map((budget) => <MakeCard key={budget._id} budget={budget} />)}
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default Budgets;
