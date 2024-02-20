import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, ButtonGroup, Card, Col, Form, Row } from "react-bootstrap";
import { getUserById, userFormValidation, updateUser, createUser } from "../../Services/user-service";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const defaultUser = {
  address: "",
  age: 28,
  email: "",
  firstName: "",
  gender: "male",
  lastName: "",
  note: "",
  status: "active",
};

const genders = {
  male: "Male",
  female: "Female",
  others: "Others",
};

export const statuses = {
  active: "Active",
  inactive: "Inactive",
};

const UserForm = ({ id }) => {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const isEdit = !!id;
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
    defaultValues: defaultUser,
    resolver: yupResolver(userFormValidation()),
  });

  const formValues = watch();
  console.log('formValues',formValues)

  useEffect(() => {
    if (isEdit) {
      const user = getUserById(id);
      console.log('user',user)
      Object.keys(user).forEach(key => {
        setValue(key, user[key]);
      });
    }
  }, [isEdit, id, setValue]);

  const handleFormSubmit = (values) => {
    setLoading(true);
    if (isEdit) {
      updateUser(id, values);
    } else {
      createUser(values);
    }
      navigate("/users");
  };

  const handleRandomData = () => {
    
  };

  const handleButtonClick = (button,key) =>{
    setValue(button, key);
    console.log(button,key,formValues)
  }

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
            <Form.Control.Feedback type="invalid">
              {errors?.email?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Gender </Form.Label>
            <div>
              <ButtonGroup>
                {Object.keys(genders).map((value) => (
                    
                  <Button
                    active={formValues.gender === value}
                    color="secondary"
                    key={value}
                    onClick={() => handleButtonClick("gender", value)}
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
                    onClick={() => handleButtonClick("status",key)}
                    type="button"
                    active={formValues.status === key}
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

export default UserForm;
