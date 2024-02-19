import { useState, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, ButtonGroup, Card, Col, Form, Row } from "react-bootstrap";
import { getUserById, userFormValidation } from "../../Services/user-service";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const defaultUser = {
  address: "",
  age: 28,
  email: "",
  firstName: "",
  gender: "M",
  lastName: "",
  note: "",
  status: "active",
};

const genders = {
  M: "Male",
  F: "Female",
  O: "Others",
};

export const statuses = {
  active: "Active",
  inactive: "Inactive",
};

const UsersAdd = ({ id = "" }) => {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const isEdit = !!id;

  const handleFormSubmit = (values) => {
    // setValue("firstName", generateRandomUser().firstName);
    // setValue("lastName", generateRandomUser().lastName);
    // setValue("email", generateRandomUser().email);
    // setValue("address", generateRandomUser().address);
    // setValue("note", generateRandomUser().note);
    // setValue("gender", generateRandomUser().gender);
    // setValue("status", generateRandomUser().status);
    console.log("values", values);
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({
    defaultValues: defaultUser,
    resolver: yupResolver(userFormValidation()),
  });

  console.log("aaa", watch(),errors);

  const handleRandomData = () => {};

  const renderSubmit = () => {
    if (isLoading) {
      return (
        <i
          className="fa fa-circle-notch fa-spin"
          aria-hidden="true"
          style={{ height: 16, width: 16 }}
        />
      );
    }

    return isEdit ? "Update" : "Add";
  };

  return (
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

      <Card className="card-wrapper">
        <Form onSubmit={handleSubmit(handleFormSubmit)}>
          <Row>
            <Col md="6">
              <Form.Group>
                <Form.Label htmlFor="firstName">First Name </Form.Label>
                <Form.Control
                  id="firstName"
                  name="firstName"
                  isInvalid={!!errors?.firstName}
                  {...register("firstName")}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.firstName?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md="6">
              <Form.Group>
                <Form.Label htmlFor="lastName">Last Name </Form.Label>
                <Form.Control
                  id="lastName"
                  name="lastName"
                  isInvalid={!!errors?.lastName}
                  {...register("lastName")}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.lastName?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Form.Group>
            <Form.Label htmlFor="email">Email Address </Form.Label>
            <Form.Control
              id="email"
              name="email"
              isInvalid={!!errors?.email}
              {...register("email")}
            />
            <Form.Control.Feedback type="invalid">{errors?.email?.message}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Gender </Form.Label>
            <div>
              <ButtonGroup>
                {Object.keys(genders).map((value) => (
                  <Button
                    active={getValues("gender") === value}
                    color="secondary"
                    key={value}
                    onClick={() => setValue("gender", value)}
                    type="button"
                  >
                    {genders[value]}
                  </Button>
                ))}
              </ButtonGroup>
            </div>
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="address">Address</Form.Label>
            <Form.Control
              id="address"
              name="address"
              type="textarea"
              isInvalid={!!errors?.address}
              {...register("address")}
            />
            <Form.Control.Feedback>{errors?.address?.message}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="note">Note</Form.Label>
            <Form.Control
              id="note"
              name="note"
              type="textarea"
              isInvalid={!!errors?.note}
              {...register("note")}
            />
            <Form.Control.Feedback type="invalid">{errors?.note?.message}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="pb-4">
            <Form.Label>Status </Form.Label>
            <div>
              <ButtonGroup>
                {Object.keys(statuses).map((key) => (
                  <Button
                    key={key}
                    color="secondary"
                    onClick={() => setValue("status", key)}
                    type="button"
                    active={getValues("status") === key}
                  >
                    {statuses[key]}
                  </Button>
                ))}
              </ButtonGroup>
            </div>
          </Form.Group>
          <Form.Group className="d-flex justify-content-between">
            <Button
              color="primary"
              type="submit"
              disabled={isLoading}
              style={{ minWidth: 200 }}
            >
              {renderSubmit()}
            </Button>
            <Button
              color="secondary"
              type="button"
              style={{ minWidth: 200, marginLeft: 10 }}
              onClick={handleRandomData}
            >
              <i className="fa fa-random" style={{ marginRight: 10 }} />
              Random Data
            </Button>
          </Form.Group>
        </Form>
      </Card>
    </>
  );
};

export default UsersAdd;
