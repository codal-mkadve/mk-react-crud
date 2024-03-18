import React, { useState, useEffect } from "react";
import { Card, Button, Table } from "react-bootstrap";
import { Link,Navigate, useParams, useNavigate } from "react-router-dom";
import { getUserById, deleteUserById } from "../../Services/user-service";
import UserBreadcrumb from "../Users/UserBreadcrumb";
import { isValidObject } from "../../Services/utils-service"
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserById } from '../../actions/userActions';

function Details() {


  const [user, setUser] = useState(null);
  const { id } = useParams();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { userDetail, loading, error } = useSelector((state) => state.usersList);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const userData = await getUserById(id);
  //     console.log('userData',userData);
  //     if (!isValidObject(userData)) {
  //       return <Navigate to="/users" replace />
  //     }
  //     setUser(userData);
  //   };
  //   fetchUser();
  // }, [id]);

  useEffect(() => {
    dispatch(fetchUserById(id));
  }, [dispatch, id]);

  const handleDeleteClick = (id) => {
    deleteUserById(id);
    navigate("/users");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!userDetail) return <Navigate to="/users" replace />;

  const userData = [
    { label: "First Name", value: userDetail.firstName },
    { label: "Last Name", value: userDetail.lastName },
    { label: "Email", value: userDetail.email },
    { label: "Gender", value: userDetail.gender },
    { label: "Age", value: userDetail.age.toString() },
    { label: "Address", value: userDetail.address },
    { label: "Note", value: userDetail.note },
    { label: "Created At", value: new Date(userDetail.createdAt).toLocaleString() },
    { label: "Updated At", value: new Date(userDetail.updatedAt).toLocaleString() },
    { label: "Status", value: userDetail.status },
  ];

  return (
    <>
      <UserBreadcrumb active="List" />
      <div className="d-flex justify-content-between align-items-center my-4">
        <h1 className="mb-0">User Details</h1>
        <div className="d-flex">
          <Link className="text-decoration-none" to="/users">
            <Button>
              <i className="fa fa-arrow-left fa-xs me-2" />
              Back to List
            </Button>
          </Link>
        </div>
      </div>
      <Card body>
        <Table bordered hover>
          <tbody>
            {userData.map((data, index) => (
              <tr key={index}>
                <th scope="row">{data.label}</th>
                <td>{data.value}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="2">
                <div className="d-flex">
                  <Link
                    className="text-decoration-none me-2"
                    to={`/users/edit/${id}`}
                  >
                    <Button>
                      <i className="fa fa-pencil fa-xs me-2" />
                      Edit
                    </Button>
                  </Link>
                  <Button
                    color="danger"
                    size="sm"
                    type="button"
                    onClick={() => handleDeleteClick(id)}
                  >
                    <i className="fa fa-trash" />
                    <span className="ms-2">Delete</span>
                  </Button>
                </div>
              </td>
            </tr>
          </tfoot>
        </Table>
      </Card>
    </>
  );
}

export default Details;
