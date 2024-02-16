import { NavLink } from "react-router-dom";
import { Card, Row, Col, Container } from "react-bootstrap";

const Register = () => (
  <Container fluid="sm" className="mt-4">
    <Row>
      <Col
        md={{
          size: 6,
        }}
        sm="12"
      >
        Register

        <Card body className="mt-4 mb-4">
          <div>Coming Soon...</div>
        </Card>
        <div className="text-dark mt-4 mb-4">
          <i className="fa fa-arrow-left fa-xs" />{" "}
          <NavLink to="/login">Back to Login</NavLink>
        </div>
      </Col>
    </Row>
  </Container>
);

export default Register;
