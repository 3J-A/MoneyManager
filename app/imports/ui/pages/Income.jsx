import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import LoadingSpinner from '../components/LoadingSpinner';
import { pageStyle } from './pageStyles';
import { PageIDs } from '../utilities/ids';
import { Income } from '../../api/income/Income';

const MakeCard = ({ income }) => (
  <Col>
    <Card className="h-80" style={{ width: '40' }}>
      <Card.Header>
        <Card.Title>{income.name} </Card.Title>
        <Card.Subtitle><span className="date">{income.category}</span></Card.Subtitle>
      </Card.Header>
      <Card.Body>
        <Card.Text>
          +${income.amount}
        </Card.Text>
        <Card.Text style={{ textAlign: 'right' }}>
          {`${income.date}`}
        </Card.Text>
      </Card.Body>
    </Card>
  </Col>
);

MakeCard.propTypes = {
  income: PropTypes.shape({
    name: PropTypes.string,
    category: PropTypes.string,
    amount: PropTypes.number,
    monthly: PropTypes.bool,
    weekly: PropTypes.bool,
    date: PropTypes.instanceOf(Date),
  }).isRequired,
};

/* Renders the Profile Collection as a set of Cards. */
const Incomes = () => {

  const { ready, income } = useTracker(() => {
    // Ensure that minimongo is populated with all collections prior to running render().
    const sub = Meteor.subscribe(Income.userPublicationName);
    const incomeItems = Income.collection.find({}).fetch();
    return {
      income: incomeItems,
      ready: sub.ready(),
    };
  }, []);
  return ready ? (
    <Container id={PageIDs.profilesPage} style={pageStyle}>
      <h1>Budget Overview</h1>
      <Button variant="outline-success" href="/addbudget">Add Budget</Button>{' '}
      <Row xs={1} md={1} lg={1} className="g-2">
        {/* eslint-disable-next-line no-shadow */}
        {income.map((income, index) => <MakeCard key={index} income={income} />)}
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default Incomes;