import { NavLink } from "react-router-dom";
import { Card, Button, Container} from "react-bootstrap";
import Form from "react-bootstrap/Form";
const Login = () => {
  return (
    <Container fluid="sm" className="mt-4">
          <h1 className="text-center">Login</h1>
          <Card className="mt-4 mb-4 card-wrapper">
            <Form>
              <Form.Group>
                <Form.Label htmlFor="email">
                  Email Address <i className="text-danger">*</i>
                </Form.Label>
                <Form.Control id="email" name="email" />
                <Form.Control.Feedback></Form.Control.Feedback>
                <Form.Text>Hint: mihir@admin.com</Form.Text>
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="password">
                  Password <i className="text-danger">*</i>
                </Form.Label>
                <Form.Control id="password" name="password" />
                <Form.Control.Feedback></Form.Control.Feedback>
                <Form.Text>Hint: 123456</Form.Text>
              </Form.Group>
              <Form.Group>
                <Button color="primary" type="submit">
                  Login
                  <i className="fa fa-arrow-right ms-2" />
                </Button>
              </Form.Group>
            </Form>
            <div className="text-dark">
              Don't have an account? <NavLink to="/register">Sign up</NavLink>
            </div>
          </Card>
    </Container>
  );
};

export default Login;
