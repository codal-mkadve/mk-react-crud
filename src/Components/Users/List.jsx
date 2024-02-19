import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  ButtonGroup,
  Col,
  Row,
  Form,
  Table,
} from "react-bootstrap";
import {
  bulkCreateUsers,
  generateRandomUsers,
  getAllUsers,
} from "../../Services/user-service";
import { Link, useNavigate } from "react-router-dom";
function List() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const usersData = await getAllUsers();
      setUsers(usersData);
    };

    fetchData();
  }, []);

  const handleAddRandomUser = () => {
    const randomUsers = generateRandomUsers(100);
    console.log("randomUsers", randomUsers);
    bulkCreateUsers(randomUsers);
    setUsers(randomUsers);
  };

  let navigate = useNavigate();
  const handleEditAction = (id) => navigate(`/users/edit/${id}`);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center my-4">
        <h1 className="mb-0">Users</h1>
        <div className="d-flex">
          <Link className="text-decoration-none" to="/users/add">
            <Button>
              <i className="fa fa-plus fa-xs me-2" />
              Add a User
            </Button>
          </Link>
          <Button className="d-block ms-2 me-2" onClick={handleAddRandomUser}>
            <i className="fa fa-xs me-2" />
            Add Random Users
          </Button>
          <Button className="d-block me-2">
            <i className="fa fa-filter fa-xs me-2" />
            Reset Filter
          </Button>
          <Button color="danger" size="sm" type="button">
            <i className="fa fa-trash" />
            <span className="ms-2">Delete All Users</span>
          </Button>
        </div>
      </div>

      <Card body>
        <Row className="mb-2">
          <Col
            md={{
              size: 3,
            }}
            className="d-flex flex-row align-items-center"
          >
            <Form.Label
              htmlFor="perPage"
              className="mb-0 d-flex align-items-center"
            >
              Show{" "}
              <Form.Select aria-label="Show">
                {["10", "25", "50", "100", "ALL"].map((d) => (
                  <option key={d} value={d.toLowerCase()}>
                    {d}
                  </option>
                ))}
              </Form.Select>
              entries
            </Form.Label>
          </Col>
          <Col
            md={{
              offset: 6,
              size: 3,
            }}
            className="d-flex flex-row align-items-center"
          >
            <Form.Label htmlFor="search" className="mb-0">
              <i className="fa fa-search" />
            </Form.Label>
            <Form.Control
              id="search"
              name="search"
              type="search"
              style={{ marginLeft: 10 }}
            />
          </Col>
        </Row>
        <Table bordered hover responsive className="users-table">
          <thead>
            <tr>
              <th>id</th>
              <th>firstName</th>
              <th>lastName</th>
              <th>email</th>
              <th>createdAt</th>
              <th>status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <th scope="row">
                  <Link to={`/users/detail/${user.id}`}>{user.id}</Link>
                </th>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.createdAt.toLocaleString()}</td>
                <td>{user.status}</td>
                <td>
                  <ButtonGroup>
                    <Button color="dark" type="button" size="sm">
                      <i className="fa fa-eye" />
                    </Button>
                    <Button color="dark" type="button" size="sm">
                      <i className="fa fa-pencil" onClick={() => handleEditAction(user.id)}/>
                    </Button>
                    <Button color="danger" size="sm" type="button">
                      <i className="fa fa-trash" />
                    </Button>
                  </ButtonGroup>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </>
  );
}

export default List;
