import React from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import UserBreadcrumb from "../Users/UserBreadcrumb";
import UserForm from "../Users/UserForm";
import { getUserById } from "../../Services/user-service";

import { isValidObject } from "../../Services/utils-service";

const UserAddEdit = () => {
  let params = useParams();
  const isEdit = !!params.id;

  const user = getUserById(params.id);
 
  if (isEdit && !isValidObject(user)) {
    return <Navigate to="/users" replace />
  }


  return (
    <>
      <UserBreadcrumb value={isEdit ? "Edit" : "Add"} />
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
      <UserForm id={isEdit ? params.id : null} />
    </>
  );
};

export default UserAddEdit;
