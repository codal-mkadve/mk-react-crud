import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

const NotFound = () => (
  <Container>
    <Row>
      <Col
        md={{
          size: 6,
        }}
        sm="12"
      >
        <h1 className="text-center">Error 404</h1>
        <Card body className="mt-4 mb-4">
          <div>Not Found</div>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default NotFound;
