import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import { getCart } from "./cartHelpers";
import Card from "./Card";
import Checkout from "./Checkout";

import Copyright from "./Copyright";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);

  useEffect(() => {
    setItems(getCart());
  }, [run]);

  const showItems = (items) => {
    return (
      <div>
        <h2>Your cart has {`${items.length}`} items</h2>
        <hr />
        {items.map((product, i) => (
          <Card
            key={i}
            product={product}
            showAddToCartButton={false}
            cartUpdate={true}
            showRemoveProductButton={true}
            setRun={setRun}
            run={run}
          />
        ))}
      </div>
    );
  };

  const noItemsMessage = () => (
    <h2>
      Your List is empty. <br /> <Link to="/shop">Continue adding</Link>
    </h2>
  );

  return (
    <Layout
      title="My List"
      description="Manage your List items. Add remove checkout or continue adding to your List."
      className="container-fluid"
    >
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-4">
          {items.length > 0 ? showItems(items) : noItemsMessage()}
        </div>
        <div className="col-md-4">
          <h2 className="mb-4">Your List summary</h2>
          <hr />
          <Checkout products={items} setRun={setRun} run={run} />
        </div>
        <div className="col-md-2"></div>
      </div>
      <Copyright />
    </Layout>
  );
};

export default Cart;
