import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../Components/Auth/Login";
import Dashboard from "../Components/Dashboard/Dashboard";
import AuthLayout from "../Layouts/AuthLayout";
import NoAuthLayout from "../Layouts/NoAuthLayout";
import List from "../Components/Users/List";
import UsersAdd from "../Components/Users/Add";
import Details from "../Components/Users/Details";
import Edit from "../Components/Users/Edit";
import UserRedirect from "../Components/Shared/UserRedirect";
import NotFound from "../Components/Shared/NotFound";

const Routings = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<List />} />
          <Route path="/users/add" element={<UsersAdd />} />
          <Route path="/users/detail/:id" element={<Details />} />
          <Route path="/users/edit/:id" element={<Edit />} />
        </Route>
        <Route element={<NoAuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>
          <Route path="/" element={<UserRedirect />} />
          <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routings;
