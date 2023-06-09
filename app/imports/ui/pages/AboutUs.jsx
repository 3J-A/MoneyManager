import React from 'react';
import { Col, Container, Image, Row, Button } from 'react-bootstrap';
import { PageIDs } from '../utilities/ids';

/* A simple static component to render some text for the landing page. */
const AboutUs = () => (
  <div id={PageIDs.landingPage}>
    <div className="landing-green-background">
      <Container>
        <Row md={1} lg={2}>
          <Col xs={6} className="my-auto">
            <h1 style={{ color: 'white', fontSize: '36pt' }}>
              Managing money,
            </h1>
            <h1 style={{ paddingBottom: '20px', color: 'white', fontSize: '36pt' }}>
              made simple
            </h1>
            <h5>
              MoneyManager makes it easy to set up a budget that automatically monitors your spending by category. Our spend trackers and alerts help keep you on track toward your financial goals.
            </h5>
            <Container fluid className="text-center mt-4 py-5 px-0">
              <a href="/signup" className="rounded-pill text-decoration-none">
                <Button variant="primary" size="lg" className="rounded-pill"><h5 style={{ padding: '10px 35px 5px 35px ' }}>Sign up now</h5></Button>
              </a>
            </Container>
          </Col>
          <Col xs={6} className="text-center my-auto px-1">
            <Image src="/images/mobile_1.png" className="px-1" width={240} />
          </Col>
        </Row>
      </Container>
    </div>
    <div className="landing-white-background">
      <Container>
        <Row md={1} lg={2}>
          <Col xs={6} className="text-center my-auto pb-5 px-1">
            <Image src="/images/mobile_1.png" className="px-1" width={240} />
          </Col>
          <Col xs={6} className="my-auto">
            <h1 style={{ fontSize: '36pt' }}>
              Managing money,
            </h1>
            <h1 style={{ paddingBottom: '20px', fontSize: '36pt' }}>
              made simple
            </h1>
            <h5>
              MoneyManager makes it easy to set up a budget that automatically monitors your spending by category. Our spend trackers and alerts help keep you on track toward your financial goals.
            </h5>
            <Container fluid className="text-center mt-4 py-5 px-0">
              <a href="/signup" className="rounded-pill text-decoration-none">
                <Button variant="primary" size="lg" className="rounded-pill"><h5 style={{ padding: '10px 35px 5px 35px ' }}>Sign up now</h5></Button>
              </a>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
    <div className="landing-green-background">
      <Container>
        <Row md={1} lg={2}>
          <Col xs={6} className="my-auto">
            <h1 style={{ color: 'white', fontSize: '36pt' }}>
              Managing money,
            </h1>
            <h1 style={{ paddingBottom: '20px', color: 'white', fontSize: '36pt' }}>
              made simple
            </h1>
            <h5>
              MoneyManager makes it easy to set up a budget that automatically monitors your spending by category. Our spend trackers and alerts help keep you on track toward your financial goals.
            </h5>
            <Container fluid className="text-center mt-4 py-5 px-0">
              <a href="/signup" className="rounded-pill text-decoration-none">
                <Button variant="primary" size="lg" className="rounded-pill"><h5 style={{ padding: '10px 35px 5px 35px ' }}>Sign up now</h5></Button>
              </a>
            </Container>
          </Col>
          <Col xs={6} className="text-center my-auto px-1">
            <Image src="/images/mobile_1.png" className="px-1" width={240} />
          </Col>
        </Row>
      </Container>
    </div>
  </div>
);

export default AboutUs;
