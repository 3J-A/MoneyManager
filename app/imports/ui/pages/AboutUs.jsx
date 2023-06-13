import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Col, Container, Image, Row, Button } from 'react-bootstrap';
import { PageIDs } from '../utilities/ids';

/* A simple static component to render some text for the landing page. */
const AboutUs = () => {
  const { loggedIn, loggedOut } = useTracker(() => ({
    loggedIn: !!Meteor.user(),
    loggedOut: !Meteor.user(),
  }), []);
  return (
    <div id={PageIDs.aboutUsPage}>
      <div className="aboutus-green-background">
        <Container>
          <Row md={1} lg={2}>
            <Col xs={6} className="my-auto">
              <h1 style={{ paddingBottom: '20px', color: 'white', fontSize: '36pt' }}>
                MoneyManager
              </h1>
              <h5>
                Money Manager is a web application that aids users in budgeting and financing their wallets. A personal
                budget tracker where you can manage and track your spendings and savings. This application takes in your
                monthly income and computes any expenses, bills, and subscriptions you may have to see how much you have
                left over. From there on, you may accumulate them into savings or pay off any loans or debt.
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
    </div>
  );
};

export default AboutUs;
