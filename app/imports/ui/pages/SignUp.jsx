import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { Alert, Card, Col, Container, Row } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoField, AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';
/* import PinInput from 'react-pin-input'; */
import { ComponentIDs, PageIDs } from '../utilities/ids';

/*
 * SignUp component is similar to signin component, but we create a new user instead.
 */
const SignUp = () => {
  const [error, setError] = useState('');
  const [redirectToReferer, setRedirectToRef] = useState(false);

  const schema = new SimpleSchema({
    email: String,
    password: String,
    PIN: { type: Number, label: 'PIN', optional: false },
  });
  const bridge = new SimpleSchema2Bridge(schema);

  /* Handle SignUp submission. Create user account and a profile entry, then redirect to the home page. */
  const submit = (doc) => {
    const { email, password, PIN } = doc;

    Accounts.createUser({ username: email, email: email, password: password, profile: { name: '' }, PIN: PIN }, (err) => {
      if (err) {
        setError(err.reason);
      } else {
        setError('');
        setRedirectToRef(true);
      }
    });
  };

  // if correct authentication, redirect to from: page instead of signup screen
  if (redirectToReferer) {
    return (<Navigate to="/home" />);
  }
  return (
    <Container id={PageIDs.signUpPage} className="py-3">
      <Row className="justify-content-center">
        <Col xs={9} md={7} lg={5}>
          <Col className="text-center py-3">
            <h2>Register your account</h2>
          </Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)}>
            <Card>
              <Card.Body>
                <div>
                  <TextField id={ComponentIDs.signUpFormEmail} name="email" placeholder="E-mail address" />
                  <TextField id={ComponentIDs.signUpFormPassword} name="password" placeholder="Password" type="password" />
                  <p>PIN Number</p>
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
                    id={ComponentIDs.signUpFormPIN}
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
                {/* <  TextField id={ComponentIDs.signUpFormPIN} name="PIN" placeholder="4-Digit PIN Number" type="password" pattern="\d*" onKeyDown="if(this.value.length==4) return false;" /> */}
                <p>Note: Do not ever share your personal PIN number with anyone!</p>
                <ErrorsField />
                <SubmitField id={ComponentIDs.signUpFormSubmit} />
              </Card.Body>
            </Card>
          </AutoForm>
          <Alert variant="secondary" style={{ color: 'darkgreen' }}>
            Already have an account? Login
            {' '}
            <Link to="/signin">here</Link>
          </Alert>
          {error === '' ? (
            ''
          ) : (
            <Alert variant="danger">
              <Alert.Heading>Registration was not successful</Alert.Heading>
              {error}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
