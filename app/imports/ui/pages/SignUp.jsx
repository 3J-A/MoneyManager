import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { Alert, Card, Col, Container, Row } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';
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
    PIN: Number,
  });
  const bridge = new SimpleSchema2Bridge(schema);

  /* Handle SignUp submission. Create user account and a profile entry, then redirect to the home page. */
  const submit = (doc) => {
    const { email, password, PIN } = doc;
    Accounts.createUser({ email, username: email, password, PIN }, (err) => {
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
        <Col xs={5}>
          <Col className="text-center py-3">
            <h2>Register your account</h2>
          </Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)}>
            <Card>
              <Card.Body>
                <TextField id={ComponentIDs.signUpFormEmail} name="email" placeholder="E-mail address" />
                <TextField id={ComponentIDs.signUpFormPassword} name="password" placeholder="Password" type="password" />
                <TextField id={ComponentIDs.signUpFormPIN} name="PIN" placeholder="PIN Number" type="password" pattern="[0-9]{4}" maxLength="4" />
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
