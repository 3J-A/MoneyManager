import React, { useState } from 'react';
import swal from 'sweetalert';
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

const Security = () => {
  // Check is if 2FA is enabled
  const [has2faEnabled, setHas2faEnabled] = useState(null);
  Accounts.has2faEnabled((err, result) => {
    if (err) {
      console.error('Error checking whether 2FA is enabled', err);
    } else {
      setHas2faEnabled(result);
    }
  });
  // Enable 2FA
  const enable2fa = (data) => {
    Accounts.enableUser2fa(data.code, (err) => {
      if (err) {
        console.error('Error activating user 2FA', err);
        swal('Error', 'Invalid 2FA code.', 'error');
      } else {
        swal('Success', '2FA enabled successfully.', 'success').then(function () {
          document.location.reload();
        });
      }
    });
  };
  const bridge = new SimpleSchema2Bridge(formSchema);
  const [qrCode, setQrCode] = useState(null);
  const [qrSecret, setQRSecret] = useState(null);
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
  return (
    <Container className="justify-content-center" style={pageStyle}>
      <Row className="justify-content-center">
        <Col xs={9} md={7}>
          <Col className="text-center py-3">
            <h2>Security Settings</h2>
          </Col>
          <Card className="mb-5">
            <Card.Body>
              <h4><strong>Change Password</strong></h4>
              <hr />
              <Container className="px-4">
                <a href="/security" className="text-decoration-none">
                  <Button variant="primary">Update password</Button>
                </a>
              </Container>
            </Card.Body>
          </Card>
          <Card className="my-5">
            <Card.Body>
              <h4><strong>Two-Factor Authentication</strong></h4>
              <hr />
              <Container className="px-4">
                {(has2faEnabled) ? (
                  [
                    <h5 className="my-4">Your two-factor authentication is enabled.</h5>,
                    <Button
                      variant="danger"
                      onClick={() => {
                        Accounts.disableUser2fa((err) => {
                          if (err) {
                            console.error('Error disabling 2FA', err);
                            swal('Error', err.message, 'error');
                            return;
                          }
                          swal('Success', '2FA disabled successfully. Please delete MoneyManager from your authenticator app.', 'success').then(function () {
                            document.location.reload();
                          });
                        });
                      }}
                    >
                      Disable
                    </Button>,
                  ]
                ) : (
                  [
                    <Container className="text-center">
                      <h5 className="mt-4">QR code</h5>
                      {/* converted svg to base64 */}
                      <div className="qrCode mt-2 mx-auto">
                        <Image width="200" src={`data:image/svg+xml;base64,${qrCode}`} alt="" />
                      </div>
                      <h5 className="mt-4">Secret code</h5>
                      <Container className="secretCode mx-auto">
                        <h5 className="mt-2">{qrSecret}</h5>
                      </Container>
                      <Container className="pt-3">
                        <Button
                          variant="dark"
                          className="mb-3"
                          onClick={() => {
                            Accounts.generate2faActivationQrCode('MoneyManager', (err, result) => {
                              if (err) {
                                console.error('Error generating 2FA activation QR code', err);
                                return;
                              }
                              const { svg, secret } = result;
                              setQrCode(Buffer.from(svg).toString('base64'));
                              setQRSecret(secret);
                            });
                          }}
                        >
                          Generate code
                        </Button>
                      </Container>
                    </Container>,
                    <hr />,
                    <AutoForm
                      model={{}}
                      schema={bridge}
                      onSubmit={data => enable2fa(data)}
                    >
                      <TextField name="code" showInlineError placeholder="6-digit 2FA code" />
                      <SubmitField value="Enable" />
                    </AutoForm>,
                  ]
                )}
              </Container>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Security;
