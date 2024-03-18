import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Col, Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { getTotalCounts } from "../../Services/user-service";

const Dashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    // Fetch total user count when the component mounts
    fetchTotalCounts();
  }, []);

  const fetchTotalCounts = async () => {
    try {
      // Call the getTotalCounts API
      const totalCount = await getTotalCounts();
      // Update the state with the fetched count
      setTotalUsers(totalCount);
    } catch (error) {
      console.error("Error fetching total counts:", error);
    }
  };

  return (
    <Container className="container-wrapper">
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
                    <div className="display-5">{totalUsers}</div>
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
