import React from "react";
import { Card, Button,ButtonGroup, Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

const UsersAdd = () => (
  <>
    <div className="d-flex justify-content-between align-items-center my-4">
      <h1 className="mb-0">Users</h1>
      <div className="d-flex">
        <Link className="text-decoration-none" to="/users">
          <Button>
            <i className="fa fa-arrow-left fa-xs me-2" />
            Back to List
          </Button>
        </Link>
      </div>
    </div>

    <Card>
      <Form>
        <Row>
          <Col md="6">
            <Form.Group>
              <Form.Label htmlFor="firstName">First Name </Form.Label>
              <Form.Control id="firstName" name="firstName" />
              <Form.Control.Feedback></Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md="6">
            <Form.Group>
              <Form.Label for="lastName">Last Name </Form.Label>
              <Form.Control id="lastName" name="lastName" />
              <Form.Control.Feedback></Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Form.Group>
          <Form.Label for="email">Email Address </Form.Label>
          <Form.Control id="email" name="email" />
          <Form.Control.Feedback>123</Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>Gender </Form.Label>
          <div>
            <ButtonGroup>
              <Button
                active="true"
                color="secondary"
                outline
                type="button"
              >Male</Button>
              <Button
                active="true"
                color="secondary"
                outline
                type="button"
              >Female</Button>
            </ButtonGroup>
          </div>
        </Form.Group>
        <Form.Group>
          <Form.Label for="address">Address</Form.Label>
          <Form.Control id="address" name="address" type="textarea" />
          <Form.Control.Feedback></Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label for="note">Note</Form.Label>
          <Form.Control
            id="note"
            name="note"
            type="textarea"
          />
          <Form.Control.Feedback></Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="pb-4">
          <Form.Label>Status </Form.Label>
          <div>
            <ButtonGroup>
              <Button
                color="secondary"
                outline
                type="button"
              >Active</Button>

               <Button
                color="secondary"
                outline
                type="button"
              >InActive</Button>
            </ButtonGroup>
          </div>
        </Form.Group>
        <Form.Group className="d-flex justify-content-between">
          <Button color="primary" type="submit" style={{ minWidth: 200 }}>
            Add
          </Button>
          <Button
            color="secondary"
            type="button"
            style={{ minWidth: 200, marginLeft: 10 }}
            outline
          >
            <i className="fa fa-random" style={{ marginRight: 10 }} />
            Random Data
          </Button>
        </Form.Group>
      </Form>
    </Card>
  </>
);

export default UsersAdd;
