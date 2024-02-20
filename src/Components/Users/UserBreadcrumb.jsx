import React from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../Shared/BreadCrumb";
import { BreadcrumbItem } from "react-bootstrap";

const UserBreadcrumb = ({ value = ""}) => {
  const BreadcrumbData = [
    {
      id: 1,
      item: (
        <BreadcrumbItem href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
          <Link to="/dashboard">Dashboard</Link>
        </BreadcrumbItem>
      ),
    },
    {
      id: 2,
      item: <Link to="/users">Users</Link>,
    },
    {
      id: 3,
      isActive: true,
      item: value,
    },
  ];
  return <Breadcrumb data={BreadcrumbData} />;
};

export default UserBreadcrumb;
