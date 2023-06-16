import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, BoolField, ErrorsField, SelectField, SubmitField, TextField, HiddenField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { addIncomeMethod } from '../../startup/both/Methods';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  name: { type: String, optional: false },
  category: { type: String, allowedValues: ['Work', 'Allowance', 'Tax Return', 'MISC'] },
  amount: { type: Number, optional: false },
  monthly: {
    type: Boolean,
    defaultValue: false,
    optional: true,
  },
  weekly: {
    type: Boolean,
    defaultValue: false,
    optional: true,
  },
  date: {
    type: Date,
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddContact page for adding a document. */
const AddIncome = () => {

  // On submit, insert the data.
  const submit = (data, formRef) => {
    Meteor.call(addIncomeMethod, data, (error) => {
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
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col className="text-center"><h2>Add Income</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
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
  );
};

export default AddIncome;