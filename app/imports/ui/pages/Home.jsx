import React from 'react';
import { AutoForm, TextField, SubmitField } from 'uniforms-bootstrap5';
import { Container, Col, Card, Row, Button, Table } from 'react-bootstrap';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Budget } from '../../api/budget/Budget';
import { Expenses } from '../../api/expenses/Expenses';
import { updateAccountMethod } from '../../startup/both/Methods';
import LoadingSpinner from '../components/LoadingSpinner';
import { pageStyle } from './pageStyles';
import { ComponentIDs, PageIDs } from '../utilities/ids';

/* Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
  name: { type: String, label: 'Name', optional: true },
  email: { type: String, label: 'Email', optional: true },
});

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

  const { ready } = useTracker(() => {
    // Ensure that minimongo is populated with all collections prior to running render().
    const sub1 = Meteor.subscribe(Budget.userPublicationName);
    const sub2 = Meteor.subscribe(Expenses.userPublicationName);
    return {
      ready: sub1.ready() && sub2.ready(),
    };
  }, []);

  // Create the form schema for uniforms. Need to determine all interests and projects for muliselect list.
  const bridge = new SimpleSchema2Bridge(formSchema);

  // Current month and year
  const months = ['Jan.', 'Feb.', 'March', 'April', 'May', 'June', 'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'];
  const date = new Date();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

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
                  <span style={{ fontSize: '40pt', color: '#48a27b' }}>$340.00</span>
                  <h5 className="mt-2 mb-4 ms-1"><strong>$60</strong> of <strong>$400</strong> spent</h5>
                  <a href="/monthly" className="text-decoration-none">
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
                  <h4 className="mt-3">Entertainment</h4>
                  <span style={{ fontSize: '27pt', color: '#48a27b' }}>$80.00</span>
                  <h5 className="mt-2 mb-4 ms-1"><strong>$20</strong> of <strong>$100</strong> spent</h5>
                  <hr />
                  <h4 className="mt-3">Grocery</h4>
                  <span style={{ fontSize: '27pt', color: '#48a27b' }}>$190.00</span>
                  <h5 className="mt-2 mb-4 ms-1"><strong>$10</strong> of <strong>$200</strong> spent</h5>
                  <hr />
                  <h4 className="mt-3">Pet</h4>
                  <span style={{ fontSize: '27pt', color: '#48a27b' }}>$70.00</span>
                  <h5 className="mt-2 mb-4 ms-1"><strong>$30</strong> of <strong>$100</strong> spent</h5>
                  <a href="/budget" className="text-decoration-none">
                    <Button variant="primary">Edit</Button>
                  </a>
                </Container>
              </Card.Body>
            </Card>
            <Card className="mt-5">
              <Card.Body>
                <h4><strong>Expenses</strong></h4>
                <hr />
                <Container className="px-4">
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>06-02-2023</td>
                        <td>Pet</td>
                        <td>Cat food</td>
                        <td>$30</td>
                      </tr>
                      <tr>
                        <td>06-04-2023</td>
                        <td>Grocery</td>
                        <td>Food</td>
                        <td>$10</td>
                      </tr>
                      <tr>
                        <td>06-05-2023</td>
                        <td>Entertainment</td>
                        <td>Movies</td>
                        <td>$20</td>
                      </tr>
                    </tbody>
                  </Table>
                  <a href="/expenses" className="text-decoration-none">
                    <Button variant="primary">Edit</Button>
                  </a>
                </Container>
              </Card.Body>
            </Card>
            <Card className="my-5">
              <Card.Body>
                <h4><strong>Security</strong></h4>
                <hr />
                <Container className="px-4 pb-3">
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
