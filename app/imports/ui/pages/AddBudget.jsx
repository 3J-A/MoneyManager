import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, NumField, SelectField, SubmitField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { addBudgetMethod } from '../../startup/both/Methods';
import { PageIDs } from '../utilities/ids';
import { pageStyle } from './pageStyles';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  category: { type: String, allowedValues: ['Household', 'Food', 'Shopping', 'Utilities', 'Transportation', 'Entertainment', 'Subscription', 'Pet', 'Miscellaneous'], optional: false },
  amount: { type: Number, optional: false },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddBudget page for adding a document. */
const AddBudget = () => {

  // On submit, insert the data.
  const submit = (data, formRef) => {
    Meteor.call(addBudgetMethod, data, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Item added successfully', 'success');
        formRef.reset();
      }
    });
  };

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;
  return (
    <Container className="py-3" id={PageIDs.addBudgetPage} style={pageStyle}>
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col className="text-center"><h2 className="my-3">Create New Budget</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
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
  );
};

export default AddBudget;
