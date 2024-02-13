import { Link } from "react-router-dom";
import { Card, Button, Table } from "react-bootstrap";

const userData = [
  { label: "First Name", value: "Mihir" },
  { label: "Last Name", value: "Kadve" },
  { label: "Email", value: "mihirkadve@gmail.com" },
  { label: "Gender", value: "M" },
  { label: "Age", value: "27" },
  { label: "Address", value: "Ahmedabad, India" },
  { label: "Note", value: "Note" },
  { label: "Created At", value: "created" },
  { label: "Updated At", value: "updated" },
  { label: "Status", value: "Active" },
];

function Details() {
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
      <Link className="text-decoration-none" to="/users">
        <Button>
          <i className="fa fa-arrow-left fa-xs me-2" />
          Back to List
        </Button>
      </Link>
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
                    to="/users/edit/1"
                  >
                    <Button outline>
                      <i className="fa fa-pencil fa-xs me-2" />
                      Edit
                    </Button>
                  </Link>
                  <Link className="text-decoration-none me-2">
                    <Button color="danger" outline size="sm" type="button">
                      <i className="fa fa-trash" />

                      <span className="ms-2">Delete</span>
                    </Button>
                  </Link>
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
