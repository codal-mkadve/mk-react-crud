import React from "react";
import { Link } from "react-router-dom";
import { Card, Col, Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";

const Dashboard = () => {
  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center my-4">
        <h1>Dashboard</h1>
      </div>
      <Card body>
        <Row>
          <Col md="4">
            <div className="card card-raised border-start border-dark border-4">
              <div className="card-body px-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <div className="me-2">
                    <div className="display-5">1</div>
                  </div>
                  <Link
                    className="text-dark d-flex align-items-center text-decoration-none"
                    to="/users"
                  >
                    <div className="card-text h3 mb-0">Users</div>
                    <i className="fa fa-users ms-3 fa-2x" />
                  </Link>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default Dashboard;
