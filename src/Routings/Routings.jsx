import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../Components/Auth/Login";
import Dashboard from "../Components/Dashboard/Dashboard";
import AuthLayout from "../Layouts/AuthLayout";
import List from "../Components/Users/List";
import UsersAdd from "../Components/Users/Add";
import Details from "../Components/Users/Details";
import Edit from "../Components/Users/Edit";

const Routings = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/" exact element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/users" element={<List />} />
          <Route path="/users/add" element={<UsersAdd />} />
          <Route path="/users/detail/:id" element={<Details />} />
          <Route path="/users/edit/:id" element={<Edit />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routings;
