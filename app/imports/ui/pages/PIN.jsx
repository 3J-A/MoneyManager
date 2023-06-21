import React, { useCallback, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import PinInput from 'react-pin-input';
import { validateInput } from './API';

const PIN_LENGTH = 4;

const PIN = () => {
  const [pin, setPin] = useState(new Array(PIN_LENGTH));
  const [validationResult, setValidationResult] = useState(undefined);
  const [validationMessage, setValidationMessage] = useState(undefined);
  const [isValidating, setIsValidating] = useState(false);
  const onPinChanged = (pinEntry, index) => {
    const newPin = [...pin];
    newPin[index] = pinEntry;
    setPin(newPin);
  };
  const validatePin = useCallback(async () => {
    setIsValidating(true);
    try {
      const result = await validateInput(pin.join(''));
      console.log(result);
      setValidationResult(true);
      setValidationMessage(result);
    } catch (e) {
      console.log(e);
      setValidationMessage(e);
      setValidationResult(false);
      setPin(new Array(PIN_LENGTH));
    } finally {
      setIsValidating(false);
    }
  }, [pin]);
  useEffect(() => {
    const checkPin = async () => {
      if (!pin.includes(undefined)) {
        await validatePin();
      }
    };
    checkPin();
  }, [pin, validatePin]);
  return (React.createElement(
    'div',
    { className: 'PIN' },
    React.createElement(PinInput, { isValidating: isValidating, validationMessage: validationMessage, validationResult: validationResult, onPinChanged: onPinChanged, pin: pin, pinLength: PIN_LENGTH }),
    React.createElement(Button, { onClick: validatePin }, 'Validate'),
  ));
};
export default PIN;
