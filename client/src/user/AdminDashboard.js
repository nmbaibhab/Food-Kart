import React from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const {
    user: { _id, name, email, role },
  } = isAuthenticated();

  const adminLinks = () => {
    return (
      <div className="card">
        <h4 className="card-header">Admin Links</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="nav-link" to="/create/category">
              Create category
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/create/product">
              Create Recipe
            </Link>
          </li>
          {/* <li className="list-group-item">
            <Link className="nav-link" to="/admin/orders">
              View Orders
            </Link>
          </li> */}
          <li className="list-group-item">
            <Link className="nav-link" to="/admin/products">
              Manage Recipes
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const adminInfo = () => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">User information</h3>
        <ul className="list-group">
          <li className="list-group-item">
            <b>Name: </b>
            {name}
          </li>
          <li className="list-group-item">
            <b>Email: </b>
            {email}
          </li>
          <li className="list-group-item">
            <b>User Id: </b>
            {_id}
          </li>
          <li className="list-group-item">
            {role === 1 ? "Admin" : "Registered user"}
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Layout
      title="Dashboard"
      description={`${name}`}
      className="container-fluid"
    >
      <div className="row">
        <div className="col-md-3">{adminLinks()}</div>
        <div className="col-md-9">{adminInfo()}</div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
