import React from 'react';
import swal from 'sweetalert';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, NumField, SelectField, SubmitField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useParams } from 'react-router';
import LoadingSpinner from '../components/LoadingSpinner';
import { Budget } from '../../api/budget/Budget';
import { updateBudget } from '../../startup/both/Methods';
import { PageIDs } from '../utilities/ids';
import { pageStyle } from './pageStyles';

const bridge = new SimpleSchema2Bridge(Budget.schema);

/* Renders the EditBudget page for editing a single document. */
const EditBudget = () => {
  const { _id } = useParams();
  const { doc, ready } = useTracker(() => {
    // Get access to Budget documents.
    const subscription = Meteor.subscribe(Budget.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the document
    const document = Budget.collection.findOne(_id);
    return {
      doc: document,
      ready: rdy,
    };
  }, [_id]);
  // On successful submit, insert the data.
  const submit = (data, formRef) => {
    Meteor.call(updateBudget, data, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Item added successfully', 'success');
        formRef.reset();
      }
    });
  };

  return ready ? (
    <Container className="py-3" id={PageIDs.editBudgetPage} style={pageStyle}>
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2 className="py-4">Edit Budget</h2></Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
            <Card>
              <Card.Body>
                <Row>
                  <Col><SelectField
                    name="category"
                    showInlineError
                    placeholder="Select One"
                  />
                  </Col>
                </Row>
                <Row>
                  <Col><NumField name="amount" /></Col>
                </Row>
                <SubmitField value="Submit" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default EditBudget;
