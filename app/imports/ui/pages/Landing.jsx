import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Col, Container, Image, Row, Button } from 'react-bootstrap';
import { PageIDs } from '../utilities/ids';

/* A simple static component to render some text for the landing page. */
const Landing = () => {
  const { loggedIn, loggedOut } = useTracker(() => ({
    loggedIn: !!Meteor.user(),
    loggedOut: !Meteor.user(),
  }), []);
  return (
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
                MoneyManager makes it easy to set up a budget that automatically monitors your spending by category. Our expense tracker helps keep you on track toward your financial goals.
              </h5>
              <Container fluid className="text-center mt-4 py-5 px-0">
                {(loggedOut) ? (
                  [
                    <a href="/signup" className="rounded-pill text-decoration-none">
                      <Button variant="primary" size="lg" className="rounded-pill"><h5 style={{ padding: '10px 35px 5px 35px ' }}>Sign up now</h5></Button>
                    </a>,
                  ]
                ) : ''}
                {(loggedIn) ? (
                  [
                    <a href="/home" className="rounded-pill text-decoration-none">
                      <Button variant="primary" size="lg" className="rounded-pill"><h5 style={{ padding: '10px 35px 5px 35px ' }}>Get started</h5></Button>
                    </a>,
                  ]
                ) : ''}
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
              <Image src="/images/mobile_2.png" className="px-1" width={240} />
            </Col>
            <Col xs={6} className="my-auto">
              <h1 style={{ fontSize: '36pt' }}>
                We prioritize your
              </h1>
              <h1 style={{ paddingBottom: '20px', fontSize: '36pt' }}>
                security.
              </h1>
              <h5>
                We employ industry best practices to protect your data. Information stored on MoneyManager is protected against risks and potential data loss.
              </h5>
              <Container fluid className="text-center mt-4 py-5 px-0">
                {(loggedOut) ? (
                  [
                    <a href="/signup" className="rounded-pill text-decoration-none">
                      <Button variant="primary" size="lg" className="rounded-pill"><h5 style={{ padding: '10px 35px 5px 35px ' }}>Sign up now</h5></Button>
                    </a>,
                  ]
                ) : ''}
                {(loggedIn) ? (
                  [
                    <a href="/home" className="rounded-pill text-decoration-none">
                      <Button variant="primary" size="lg" className="rounded-pill"><h5 style={{ padding: '10px 35px 5px 35px ' }}>Get started</h5></Button>
                    </a>,
                  ]
                ) : ''}
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
                We take privacy
              </h1>
              <h1 style={{ paddingBottom: '20px', color: 'white', fontSize: '36pt' }}>
                seriously.
              </h1>
              <h5>
                We believe that privacy is a fundamental human right. MoneyManager protects your privacy through responsible data practices.
              </h5>
              <Container fluid className="text-center mt-4 py-5 px-0">
                {(loggedOut) ? (
                  [
                    <a href="/signup" className="rounded-pill text-decoration-none">
                      <Button variant="primary" size="lg" className="rounded-pill"><h5 style={{ padding: '10px 35px 5px 35px ' }}>Sign up now</h5></Button>
                    </a>,
                  ]
                ) : ''}
                {(loggedIn) ? (
                  [
                    <a href="/home" className="rounded-pill text-decoration-none">
                      <Button variant="primary" size="lg" className="rounded-pill"><h5 style={{ padding: '10px 35px 5px 35px ' }}>Get started</h5></Button>
                    </a>,
                  ]
                ) : ''}
              </Container>
            </Col>
            <Col xs={6} className="text-center my-auto px-1">
              <Image src="/images/mobile_3.png" className="px-1" width={240} />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};
export default Landing;
