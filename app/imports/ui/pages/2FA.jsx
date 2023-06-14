import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Buffer } from 'buffer';
import { Accounts } from 'meteor/accounts-base';
import { Button } from 'react-bootstrap';

const TwoFA = () => {

  const reportError = (error, callback) => {
    if (callback) {
      callback(error);
    } else {
      throw error;
    }
  };

  Accounts.has2faEnabled = callback => {
    Accounts.connection.call('has2faEnabled', callback);
  };

  Accounts.generate2faActivationQrCode = (appName, callback) => {
    if (!appName) {
      throw new Meteor.Error(
        500,
        'An app name is necessary when calling the function generate2faActivationQrCode',
      );
    }

    if (!callback) {
      throw new Meteor.Error(
        500,
        'A callback is necessary when calling the function generate2faActivationQrCode so a QR code can be provided',
      );
    }

    Accounts.connection.call('generate2faActivationQrCode', appName, callback);
  };

  const [qrCode, setQrCode] = useState(null);

  return (
    <Button
      onClick={() => {
        Accounts.generate2faActivationQrCode('MoneyManager', (err, result) => {
          if (err) {
            console.error('Error getting QR code', err);
            return;
          }
          const { svg, secret, uri } = result;
          /*
            the svg can be converted to base64, then be used like:
             <img
                width="200"
                src={`data:image/svg+xml;base64,${qrCode}`}
             />
          */
          setQrCode(Buffer.from(svg).toString('base64'));
        });
      }}
    >
      Generate a new code
    </Button>
  );
};

export default TwoFA;
