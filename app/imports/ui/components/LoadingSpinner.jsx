import React from 'react';
import { Container, Row, Spinner } from 'react-bootstrap';

const LoadingSpinner = () => (
  <Container>
    <Row className="justify-content-md-center py-3">
      <Spinner animation="border" />
      Getting data
    </Row>
  </Container>
);

export default LoadingSpinner;
