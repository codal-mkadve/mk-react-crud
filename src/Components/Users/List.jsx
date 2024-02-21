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
  deleteAllUsers,
  deleteUserById,
  paginateTable
} from "../../Services/user-service";
import { Link, useNavigate } from "react-router-dom";
import PaginationContainer from "../Shared/PaginationContainer";

function List() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [showAll, setShowAll] = useState(false);
  const showEntries = {10: "10", 25:  "25", 50: "50", 100: "100", all: users.length}

  const getUserListData = () => {
    return paginateTable(users, showAll ? users.length : perPage, currentPage);
  }

  const userListData = getUserListData();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const usersData = await getAllUsers();
    setUsers(usersData);
  };

  const handleAddRandomUser = () => {
    const randomUsers = generateRandomUsers(100);
    bulkCreateUsers(randomUsers);
    setUsers(randomUsers);
  };

  const handleDeleteUser = async (id) => {
    await deleteUserById(id);
    fetchData();
  };

  const handleDeleteAllUsers = async () => {
    await deleteAllUsers();
    fetchData();
  };

  const getPaginationDetails = () => {
    if (!showAll) {
      const total = users.length;
      const from =
        total > 0 ? (currentPage - 1) * perPage + 1 : 0;
      const to = currentPage * perPage;
      return `Showing ${from} to ${
        to > total ? total : to
      } of ${total} entries`;
    }
    return `Showing all (${users.length}) entries`;
  };


  let navigate = useNavigate();

  const handleActionButton = (action, id) => navigate(`/users/${action}/${id}`);

  const handleEntriesChange = (ev) => {
    setShowAll(ev.target.value === 'all');
    setPerPage(ev.target.value || 'all');
    setCurrentPage(1);
  }

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
          <Button
            color="danger"
            size="sm"
            type="button"
            onClick={handleDeleteAllUsers}
          >
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
              <Form.Select aria-label="Show" 
              value={perPage || "10"}
              onChange={(e) => handleEntriesChange(e)}>
                {Object.keys(showEntries).map((val) => (
                  <option key={val} value={val.toLowerCase()}>
                    {val}
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
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Created On</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {userListData.map((user) => (
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
                    <Button
                      color="dark"
                      type="button"
                      size="sm"
                      onClick={() => handleActionButton("detail", user.id)}
                    >
                      <i className="fa fa-eye" />
                    </Button>
                    <Button color="dark" type="button" size="sm">
                      <i
                        className="fa fa-pencil"
                        onClick={() => handleActionButton("edit", user.id)}
                      />
                    </Button>
                    <Button color="danger" size="sm" type="button">
                      <i
                        className="fa fa-trash"
                        onClick={() => handleDeleteUser(user.id)}
                      />
                    </Button>
                  </ButtonGroup>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="d-flex justify-content-between align-items-center">
          <span>
            {getPaginationDetails()}
          </span>
          <PaginationContainer
            activePage={currentPage}
            itemsCountPerPage={Number(showAll ? users.length :  perPage)}
            onChange={(val) => setCurrentPage(val)}
            totalItemsCount={users.length}
          />
        </div>
      </Card>
    </>
  );
}

export default List;
