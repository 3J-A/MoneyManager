import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Alert, Card, Col, Container, Row } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, AutoField, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';
/* import PinInput from 'react-pin-input'; */
import { ComponentIDs, PageIDs } from '../utilities/ids';

/*
 * Signin page overrides the form’s submit event and call Meteor’s loginWithPassword().
 * Authentication errors modify the component’s state to be displayed
 */
const SignIn = () => {
  const [error, setError] = useState('');
  const [redirect, setRedirect] = useState(false);
  // const [redirect2FA, setRedirect2FA] = useState(false); //
  const schema = new SimpleSchema({
    email: String,
    password: String,
    PIN: { type: Number, label: 'PIN', optional: false },
  });
  const bridge = new SimpleSchema2Bridge(schema);
  // Handle Signin submission using Meteor's account mechanism.
  const submit = (doc) => {
    const { email, password, PIN } = doc;
    Meteor.loginWithPassword(email, password, PIN, (err) => {
      if (err) {
        // { if (err.error === 'no-2fa-code') { //
        // send user to a page or show a component where they can provide a 2FA code
        // swal('Error', '2FA code must be informed.', 'error').then(function () { //
        // setRedirect2FA(true); //
        // }); //
        // } else { //
        // setError(err.reason); //
        // } //
        setError(err.reason);
      } else {
        setError('');
        setRedirect(true);
      }
    });
  };
  // if correct authentication, redirect to page instead of login screen
  if (redirect) {
    return (<Navigate to="/home" />);
  }
  // if (redirect2FA) { //
  // return (<Navigate to="/verify" />); //
  // } //
  // Otherwise return to the Login form.
  return (
    <Container id={PageIDs.signInPage} className="py-3">
      <Row className="justify-content-center">
        <Col xs={9} md={7} lg={5}>
          <Col className="text-center py-3">
            <h2>Login to your account</h2>
          </Col>
          <Card>
            <Card.Body>
              <p className="mt-1 mb-0">Please login <a href="/verify">here</a> if you have 2FA enabled.</p>
            </Card.Body>
          </Card>
          <AutoForm schema={bridge} onSubmit={data => submit(data)}>
            <Card className="mt-4">
              <Card.Body>
                <div>
                  <TextField id={ComponentIDs.signInFormEmail} name="email" placeholder="E-mail address" />
                  <TextField id={ComponentIDs.signInFormPassword} name="password" placeholder="Password" type="password" />
                  {/* <p>PIN Number</p> */}
                  <AutoField
                    name="PIN"
                    id={ComponentIDs.signUpFormPIN}
                    placeholder="4-Digit PIN Number"
                    type="password"
                    pattern="\d*"
                    onKeyDown="if(this.value.length==4) return false;"
                    onInput={(e) => {
                      e.target.value = Math.max(0, parseInt(e.target.value, 10)).toString().slice(0, 4);
                    }}
                  />
                  { /* <PinInput
                    id={ComponentIDs.signInFormPIN}
                    name="PIN"
                    length={4}
                    focus
                    type="number"
                    inputMode="number"
                    style={{ padding: '10px' }}
                    inputStyle={{ borderColor: 'red' }}
                    inputFocusStyle={{ borderColor: 'blue' }}
                  /> */ }
                </div>
                { /* <TextField id={ComponentIDs.signInFormPIN} name="PIN" placeholder="4-Digit PIN Number" type="password" /> */ }
                <ErrorsField />
                <SubmitField id={ComponentIDs.signInFormSubmit} />
              </Card.Body>
            </Card>
          </AutoForm>
          <Alert className="mb-4" variant="secondary" style={{ color: 'darkgreen' }}>
            Don&#39;t have an account? Sign up
            {' '}
            <Link to="/signup" style={{ color: 'blue' }}>here</Link>
          </Alert>
          {error === '' ? (
            ''
          ) : (
            <Alert variant="danger">
              <Alert.Heading>Login was not successful</Alert.Heading>
              {error}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default SignIn;
