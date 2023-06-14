import React, { useState } from 'react';
// import { Meteor } from 'meteor/meteor';
import { AutoForm, TextField, SubmitField } from 'uniforms-bootstrap5';
import { Buffer } from 'buffer';
import { Accounts } from 'meteor/accounts-base';
import { Container, Row, Col, Button, Card, Image } from 'react-bootstrap';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { pageStyle } from './pageStyles';

const formSchema = new SimpleSchema({
  code: { type: String, label: '2FA Code', optional: false },
});

const TwoFA = () => {

  const submit = () => {
    console.log('submit');
  };

  const bridge = new SimpleSchema2Bridge(formSchema);

  // const reportError = (error, callback) => {
  //   if (callback) {
  //     callback(error);
  //   } else {
  //     throw error;
  //   }
  // };
  //
  // Accounts.has2faEnabled = callback => {
  //   Accounts.connection.call('has2faEnabled', callback);
  // };
  //
  // Accounts.generate2faActivationQrCode = (appName, callback) => {
  //   if (!appName) {
  //     throw new Meteor.Error(
  //       500,
  //       'An app name is necessary when calling the function generate2faActivationQrCode',
  //     );
  //   }
  //
  //   if (!callback) {
  //     throw new Meteor.Error(
  //       500,
  //       'A callback is necessary when calling the function generate2faActivationQrCode so a QR code can be provided',
  //     );
  //   }
  //
  //   Accounts.connection.call('generate2faActivationQrCode', appName, callback);
  // };

  const [qrCode, setQrCode] = useState(null);
  const [qrSecret, setQRSecret] = useState(null);
  const [uriCode, setURICode] = useState(null);
  return (
    <Container className="justify-content-center" style={pageStyle}>
      <Row className="justify-content-center">
        <Col xs={9} md={7}>
          <Card className="mt-5">
            <Card.Body>
              <h4><strong>Activate 2FA</strong></h4>
              <hr />
              <Container className="px-4">
                <Container className="text-center">
                  {/* the svg can be converted to base64, then be used like: */}
                  <Image width="200" src={`data:image/svg+xml;base64,${qrCode}`} alt="QR code" />
                  <h5 className="my-2">{qrSecret}</h5>
                  {/* <h5>{uriCode}</h5> */}
                  <Container className="pt-3">
                    <Button
                      variant="primary"
                      className="mb-3"
                      onClick={() => {
                        Accounts.generate2faActivationQrCode('MoneyManager', (err, result) => {
                          if (err) {
                            console.error('...', err);
                            return;
                          }
                          const { svg, secret, uri } = result;
                          setQrCode(Buffer.from(svg).toString('base64'));
                          setQRSecret(secret);
                          setURICode(uri);
                        });
                      }}
                    >
                      Generate QR code
                    </Button>
                  </Container>
                </Container>
                <AutoForm
                  model={{}}
                  schema={bridge}
                  onSubmit={data => submit(data)}
                >
                  <TextField name="code" showInlineError placeholder="Enter 2FA code" />
                  <SubmitField value="Activate" />
                </AutoForm>
              </Container>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TwoFA;
