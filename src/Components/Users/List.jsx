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
  generateRandomUsers,
  getAllUsers,
  deleteUserById,
  paginateTable,
  getFilteredListData,
} from "../../Services/user-service";
import { Link, useNavigate } from "react-router-dom";
import PaginationContainer from "../Shared/PaginationContainer";
import { statuses } from "./UserForm";
import UserBreadcrumb from "../Users/UserBreadcrumb";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, deleteUser, bulkCreateUsers, deleteAllUsers } from '../../actions/userActions';


const debounce = (func, delay) => {
  let debounceTimer;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
};

const List = () => {
  const [columnSearch, setColumnSearch] = useState({});
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [showAll, setShowAll] = useState(false);
  const [sortColumn, setsortColumn] = useState("");
  const [sortBy, setsortBy] = useState("ASC");
  const [globalSearch, setGlobalSearch] = useState("");
  const [listData, setListData] = useState([]);
  const [count, setCount] = useState(0);
  const [totalFilteredEntries, setTotalFilteredEntries] = useState(0);

  // const all = getAllUsers();
  const dispatch = useDispatch();
  const { usersList, loading, error } = useSelector((state) => state.usersList);
  // console.log('usersList', usersList);

 
  useEffect(() => {
    // setTimeout(() => {
      dispatch(fetchUsers());
    // }, 1000);
  }, [dispatch]);
  

  useEffect(() => {
    
    if (!loading && usersList && usersList.length > 0) {
      const filterAndUpdateList = () => {
        const filteredData = getFilteredListData({
          columnSearch,
          data: usersList,
          globalSearch,
          sortColumn,
          sortBy,
        });
        setTotalFilteredEntries(filteredData.length);
  
        const paginatedData = paginateTable(
          filteredData,
          perPage === "all" ? filteredData.length : perPage,
          currentPage
        );
  
        setListData(paginatedData);
      };
  
      // Debounce the filtering function to delay execution
      const debouncedFiltering = debounce(filterAndUpdateList, 300);
      debouncedFiltering();
    } else {
      // Handle the case when data is still loading or usersList is empty
      setListData([]);
      setTotalFilteredEntries(0);
    }
  }, [
    columnSearch,
    currentPage,
    globalSearch,
    perPage,
    sortColumn,
    sortBy,
    count,
    loading,
    usersList, // Include usersList and loading in the dependency array
  ]);

  const showEntries = {
    10: "10",
    25: "25",
    50: "50",
    100: "100",
    all: users.length,
  };

  // const getUserListData = () => {
  //   return paginateTable(filterData, showAll ? filterData.length : perPage, currentPage);
  // };

  // const userListData = getUserListData();

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const fetchData = async () => {
    const usersData = await getAllUsers();
    setUsers(usersData);
  };


  const handleDeleteUser = async (id) => {
    // await deleteUserById(id);
    // fetchData();
    dispatch(deleteUser(id));
    setCount((prevCount) => prevCount + 1);
  };

  // const handleAddRandomUser = async () => {
  //   const randomUsers = generateRandomUsers(100);
  //   await bulkCreateUsers(randomUsers);
  //   fetchData(); // Re-fetch the updated list of users
  //   setCount((prevCount) => prevCount + 1); // Trigger list update
  // };

  const handleAddRandomUser = () => {
    const randomUsers = generateRandomUsers(100); // this function generates an array of user objects
    console.log('randomUsers',randomUsers);
    dispatch(bulkCreateUsers(randomUsers)).then(() => {
      // After bulk creation is successful, fetch the updated users list
      dispatch(fetchUsers());
    })
    .catch((error) => {
      console.error("Failed to create users in bulk:", error);
      // Handle any errors, e.g., showing an error message to the user
    });
  };

  // const handleDeleteAllUsers = async () => {
  //   await deleteAllUsers();
  //   fetchData(); // Re-fetch the updated list of users, which should now be empty
  //   setCount((prevCount) => prevCount + 1); // Trigger list update
  // };

  const handleDeleteAllUsers = () => {
    if (window.confirm('Are you sure you want to delete all users?')) {
      dispatch(deleteAllUsers());
    }
  };

  const getPaginationDetails = () => {
    if (!showAll) {
      const total = totalFilteredEntries; // Use total filtered entries
      const from = total > 0 ? (currentPage - 1) * perPage + 1 : 0;
      const to = currentPage * perPage;
      return `Showing ${from} to ${
        to > total ? total : to
      } of ${total} entries`;
    }
    // Use totalFilteredEntries to show the total number of entries when displaying all
    return `Showing all (${totalFilteredEntries}) entries`;
  };

  let navigate = useNavigate();

  const handleActionButton = (action, id) => navigate(`/users/${action}/${id}`);

  const handleEntriesChange = (ev) => {
    setShowAll(ev.target.value === "all");
    setPerPage(ev.target.value || "all");
    setCurrentPage(1);
  };

  const headerTitles = {
    id: "ID",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    createdAt: "Created At",
    status: "Status",
  };

  const showFilterControls = (headerTitles) =>
    Object.keys(headerTitles).map((key) => (
      <th key={key}>
        {key === "status" ? (
          <Form.Control
            name={key}
            as="select"
            onChange={(ev) => {
              updateColumnSearch(key, ev);
            }}
          >
            <option value="">All</option>
            {Object.keys(statuses).map((statusKey) => (
              <option key={statusKey} value={statusKey}>
                {statuses[statusKey]}
              </option>
            ))}
          </Form.Control>
        ) : (
          showSearchInput(key)
        )}
      </th>
    ));

  const updateColumnSearch = (key, ev) => {
    const columnFilter = {
      ...columnSearch,
      [key]: ev.target.value || "",
    };
    setColumnSearch(columnFilter);
    setCurrentPage(1);
  };

  const handleResetFilter = () => {
    setCurrentPage(1);
    setPerPage(10);
    setColumnSearch({});
    setGlobalSearch("");
  };

  const handleSort = (columnName) => {
    // If the current sortColumn is the same as columnName, toggle the sortBy direction
    if (sortColumn === columnName) {
      setsortBy(sortBy === "ASC" ? "DESC" : "ASC");
    } else {
      // If a new column is being sorted, default to ascending order
      setsortColumn(columnName);
      setsortBy("ASC");
    }
  };

  const handleGlobalSearch = (value) => {
    const updatedSearch = value;
    setGlobalSearch(updatedSearch);
    setCurrentPage(1);
  };

  const getFilterDetails = () => {
    const usersData = getAllUsers();
    const {
      email = "",
      firstName = "",
      id = "",
      lastName = "",
      status = "",
    } = columnSearch || {};

    return firstName || lastName || email || id || status || globalSearch
      ? `(filtered from ${usersData.length} total entries)`
      : "";
  };

  const showSort = (key) => {
    if (key === sortColumn) {
      return sortBy === "ASC" ? <span>&darr;</span> : <span>&uarr;</span>;
    } else {
      return null;
    }
  };

  const showSearchInput = (key) => (
    <Form.Control
      name={key}
      type="search"
      onChange={(ev) => updateColumnSearch(key, ev)}
      value={columnSearch?.[key] || ""}
    />
  );

  const showHeaders = () =>
    Object.keys(headerTitles).map((key) => (
      <th key={key} onClick={() => handleSort(key)}>
        <div
          className="d-flex text-items-center justify-content-between align-items-center"
          role="button"
        >
          {headerTitles[key]} {showSort(key)}
        </div>
      </th>
    ));

  return (
    <>
      <UserBreadcrumb value="List" />
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
          <Button className="d-block me-2" onClick={handleResetFilter}>
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
              <Form.Select
                aria-label="Show"
                value={perPage || "10"}
                onChange={(e) => handleEntriesChange(e)}
              >
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
              onChange={(ev) => {
                handleGlobalSearch(ev.target.value);
              }}
              value={globalSearch}
            />
          </Col>
        </Row>
        <Table bordered hover responsive className="users-table">
          <thead>
            <tr>{showHeaders()}</tr>
            <tr>
              {showFilterControls(headerTitles)}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {listData.map((user) => (
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
            {getPaginationDetails()} {getFilterDetails()}
          </span>
          <PaginationContainer
            activePage={currentPage}
            itemsCountPerPage={Number(showAll ? totalFilteredEntries : perPage)}
            onChange={(val) => setCurrentPage(val)}
            totalItemsCount={totalFilteredEntries}
          />
        </div>
      </Card>
    </>
  );
};

export default List;
