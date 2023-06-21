import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Alert, Card, Col, Container, Row } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { ComponentIDs, PageIDs } from '../utilities/ids';

const Verify = () => {
  const [error, setError] = useState('');
  const [redirect, setRedirect] = useState(false);
  const schema = new SimpleSchema({
    email: String,
    password: String,
    PIN: { type: Number, label: 'PIN', optional: false },
    code: { type: Number, label: '2FA Code', optional: false },
  });
  const bridge = new SimpleSchema2Bridge(schema);
  // Handle Signin submission using Meteor's account mechanism.
  const submit = (doc) => {
    // const { email, password, code } = doc;
    const email = doc.email;
    const password = doc.password;
    const code = doc.code;
    Meteor.loginWithPasswordAnd2faCode(email, password, code, (err) => {
      if (err) {
        setError(err.reason);
      } else {
        setRedirect(true);
      }
    });
  };
  // if correct authentication, redirect to page instead of login screen
  if (redirect) {
    return (<Navigate to="/home" />);
  }
  return (
    <Container id={PageIDs.signInPage} className="py-3">
      <Row className="justify-content-center">
        <Col xs={9} md={7} lg={5}>
          <Col className="text-center py-3">
            <h2>Two-factor authentication</h2>
          </Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)}>
            <Card>
              <Card.Body>
                <TextField id={ComponentIDs.signInFormEmail} name="email" placeholder="E-mail address" />
                <TextField id={ComponentIDs.signInFormPassword} name="password" placeholder="Password" type="password" />
                <TextField id={ComponentIDs.signInFormPIN} name="PIN" placeholder="Personal PIN Number" type="password" />
                <TextField id={ComponentIDs.signInFormPIN} name="code" placeholder="6-digit 2FA code" type="password" />
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

export default Verify;
