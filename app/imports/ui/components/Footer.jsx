import React from 'react';
import { Col, Container } from 'react-bootstrap';

/* The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer className="footer mt-auto py-3" style={{ backgroundColor: '#07673e' }}>
    <Container>
      <Col className="text-center" style={{ color: 'white' }}>
        ICS 427 Project
        {' '}
        <br />
        University of Hawaii
        <br />
        Honolulu, HI 96822
        {' '}
        <br />
        <a style={{ color: 'white' }} href="https://github.com/3J-A">https://github.com/3J-A</a>
      </Col>
    </Container>
  </footer>
);

export default Footer;
