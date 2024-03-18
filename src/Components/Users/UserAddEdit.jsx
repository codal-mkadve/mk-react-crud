import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate, Navigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import UserBreadcrumb from "../Users/UserBreadcrumb";
import UserForm from "../Users/UserForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserById } from "../../actions/userActions";

const UserAddEdit = () => {
  let { id } = useParams();
  const isEdit = !!id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userValue, loading, error } = useSelector((state) => state.userValue || {});
  const [validUser, setValidUser] = useState(true);
  const [shouldRedirect, setShouldRedirect] = useState(false);


  // useEffect(() => {
  //   if (isEdit) {
  //     dispatch(fetchUserById(id))
  //       .then((response) => {
  //         // Assuming the response structure has a user object
  //         if (!response.payload || Object.keys(response.payload).length === 0) {
  //           setValidUser(false);
  //         }
  //       })
  //       .catch(() => {
  //         setValidUser(false);
  //       });
  //   }
  // }, [dispatch, id, isEdit]);

  // useEffect(() => {
  //   if (isEdit) {
  //     dispatch(fetchUserById(id))
  //       .then((response) => {
  //         if (!response.payload || Object.keys(response.payload).length === 0) {
  //           if (validUser !== false) setValidUser(false);
  //         }
  //       })        
  //       .catch(() => {
  //         setValidUser(false);
  //       });
  //   }
  // }, [dispatch, id, isEdit]);
  
  // useEffect(() => {
  //   if (isEdit && !validUser) {
  //     navigate("/users");
  //   }
  // }, [validUser, isEdit, navigate]);

  useEffect(() => {
    if (isEdit) {
      dispatch(fetchUserById(id))
        .then((response) => {
          console.log('response',response);
          if (!response.data || Object.keys(response.data).length === 0) {
            setShouldRedirect(true);
          }
        })
        .catch(() => {
          setShouldRedirect(true);
        });
    }
    console.log('USERADDEDIT', dispatch, id, isEdit);
  }, [dispatch, id, isEdit]);

  if (shouldRedirect) {
    return <Navigate to="/users" replace />;
  }
  return (
    <>
      <UserBreadcrumb value={isEdit ? "Edit" : "Add"} />
      <div className="d-flex justify-content-between align-items-center my-4">
        <h1 className="mb-0">{isEdit ? "Edit User" : "Add New User"}</h1>
        <div className="d-flex">
          <Link className="text-decoration-none" to="/users">
            <Button>
              <i className="fa fa-arrow-left fa-xs me-2" />
              Back to List
            </Button>
          </Link>
        </div>
      </div>
      <UserForm id={isEdit ? id : null} />
    </>
  );
};

export default UserAddEdit;
