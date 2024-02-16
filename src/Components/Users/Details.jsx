import React, { useState, useEffect } from "react";
import { Card, Button, Table } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { getUserById } from "../../Services/user-service";

function Details() {
  const [user, setUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUserById(id);
      setUser(userData);
    };

    fetchUser();
  }, [id]);

  if (!user) return <p>Loading...</p>;

  const userData = [
    { label: "First Name", value: user.firstName },
    { label: "Last Name", value: user.lastName },
    { label: "Email", value: user.email },
    { label: "Gender", value: user.gender },
    { label: "Age", value: user.age.toString() },
    { label: "Address", value: user.address },
    { label: "Note", value: user.note },
    { label: "Created At", value: new Date(user.createdAt).toLocaleString() },
    { label: "Updated At", value: new Date(user.updatedAt).toLocaleString() },
    { label: "Status", value: user.status },
  ];

  return (
    <>
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
                    <Button outline>
                      <i className="fa fa-pencil fa-xs me-2" />
                      Edit
                    </Button>
                  </Link>
                  <Button color="danger" outline size="sm" type="button">
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