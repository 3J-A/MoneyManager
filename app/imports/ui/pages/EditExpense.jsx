import React from 'react';
import swal from 'sweetalert';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, BoolField, ErrorsField, HiddenField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useParams } from 'react-router';
import LoadingSpinner from '../components/LoadingSpinner';
import { Expenses } from '../../api/expenses/Expenses';

const bridge = new SimpleSchema2Bridge(Expenses.schema);

/* Renders the EditContact page for editing a single document. */
const EditExpense = () => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { _id } = useParams();
  // console.log('EditContact', _id);
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { doc, ready } = useTracker(() => {
    // Get access to Contact documents.
    const subscription = Meteor.subscribe(Expenses.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the document
    const document = Expenses.collection.findOne(_id);
    return {
      doc: document,
      ready: rdy,
    };
  }, [_id]);
  // console.log('EditContact', doc, ready);
  // On successful submit, insert the data.
  const submit = (data) => {
    const { name, category, amount, monthly, weekly, date } = data;
    Expenses.collection.update(_id, { $set: { name, category, amount, monthly, weekly, date } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Item updated successfully', 'success')));
  };

  return ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2 className="py-4">Edit Expense</h2></Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
            <Card>
              <Card.Body>
                <Row>
                  <Col><TextField name="name" /></Col>
                  <Col><SelectField
                    name="category"
                    showInlineError
                    placeholder="Select One"
                  />
                  </Col>
                </Row>
                <Row>
                  <Col><TextField name="amount" /></Col>
                </Row>
                <Row>
                  <Col><BoolField name="monthly" /></Col>
                  <Col><BoolField name="weekly" /></Col>
                </Row>
                <SubmitField value="Submit" />
                <ErrorsField />
                <HiddenField name="date" value={new Date()} />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default EditExpense;
