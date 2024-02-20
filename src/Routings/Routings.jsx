import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../Components/Auth/Login";
import Dashboard from "../Components/Dashboard/Dashboard";
import AuthLayout from "../Layouts/AuthLayout";
import NoAuthLayout from "../Layouts/NoAuthLayout";
import List from "../Components/Users/List";
import UserAddEdit from "../Components/Users/UserAddEdit";
import Details from "../Components/Users/Details";
import UserRedirect from "../Components/Shared/UserRedirect";
import NotFound from "../Components/Shared/NotFound";
import Register from "../Components/Auth/Register";

const Routings = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<List />} />
          <Route path="/users/add" element={<UserAddEdit />} />
          <Route path="/users/edit/:id" element={<UserAddEdit />} />
          <Route path="/users/detail/:id" element={<Details />} />
        </Route>
        <Route element={<NoAuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
          <Route path="/" element={<UserRedirect />} />
          <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routings;
