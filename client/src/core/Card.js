import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ShowImage from "./ShowImage";
import moment from "moment";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CameraIcon from "@material-ui/icons/PhotoCamera";
import CardM from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import DeleteIcon from "@material-ui/icons/Delete";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";

import { addItem, updateItem, removeItem } from "./cartHelpers";

const Card = ({
  product,
  showViewProductButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  description = false,
  setRun = (f) => f, // default value of function
  run = undefined, // default value of undefined
}) => {
  let history = useHistory();
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const showViewButton = (showViewProductButton) => {
    return (
      showViewProductButton && (
        <Link href={`/product/${product._id}`} className="mr-2">
          <Button variant="contained" color="primary" className="p-2">
            View Recipe
          </Button>
        </Link>
      )
    );
  };

  const addToCart = () => {
    console.log("added");
    addItem(product, setRedirect(true));
    history.push("/cart");
  };
  const showAddToCartBtn = (showAddToCartButton) => {
    return (
      showAddToCartButton && (
        <Button
          onClick={addToCart}
          variant="outlined"
          color="secondary"
          className="p-2"
        >
          Add to List
        </Button>
      )
    );
  };

  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span className="badge badge-success badge-pill my-2">In Stock </span>
    ) : (
      <span className="badge badge-danger badge-pill">Out of Stock </span>
    );
  };

  const handleChange = (productId) => (event) => {
    setRun(!run); // run useEffect in parent Cart
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

  const showCartUpdateOptions = (cartUpdate) => {
    return (
      cartUpdate && (
        <div className="mt-2">
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Adjust Quantity</span>
            </div>
            <input
              type="number"
              className="form-control"
              value={count}
              onChange={handleChange(product._id)}
            />
          </div>
        </div>
      )
    );
  };

  const showRemoveButton = (showRemoveProductButton) => {
    return (
      showRemoveProductButton && (
        <Button
          onClick={() => {
            removeItem(product._id);
            setRun(!run); // run useEffect in parent Cart
          }}
          variant="contained"
          color="secondary"
          // className={classes.button}
          startIcon={<DeleteIcon />}
        >
          Remove Recipe
        </Button>
      )
    );
  };

  const showDescription = (description) => {
    return (
      description && (
        <p className="card-text">{product.description.substring(0, 1000)}</p>
      )
    );
  };

  return (
    <div className="card my-3">
      <ShowImage item={product} url="product" className="card-img-top" />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        {/* <p className="card-text">{product.description.substring(0, 200)}</p> */}
        {showDescription(description)}
        <p className="black-10">
          <b>Recipe Price: ₹ </b>
          {product.price}
        </p>
        <p className="black-9">
          <b>Category: </b>
          {product.category && product.category.name}{" "}
        </p>{" "}
        <p className="black-8">
          Added on {moment(product.createdAt).fromNow()}{" "}
        </p>
        {/* {showStock(product.quantity)} */}
        <br></br>
        <span>
          {showViewButton(showViewProductButton)}
          {showAddToCartBtn(showAddToCartButton)}
          {showRemoveButton(showRemoveProductButton)}
        </span>
        {showCartUpdateOptions(cartUpdate)}
      </div>
    </div>
  );
};

export default Card;
