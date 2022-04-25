import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { read, listRelated } from "./apiCore";
import Card from "./Card";

const Product = (props) => {
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [error, setError] = useState(false);

  const loadSingleProduct = (productId) => {
    read(productId).then((data) => {
      if (data.err) {
        setError(data.err);
      } else {
        setProduct(data);
        // fetch related products
        listRelated(data._id).then((data) => {
          if (data.err) {
            setError(data.err);
            console.log(error);
          } else {
            setRelatedProduct(data);
          }
        });
      }
    });
  };
  useEffect(() => {
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
  }, [props]);

  return (
    <Layout
      title={product && product.name}
      description={
        product && product.description && product.description.substring(0, 100)
      }
      className="container-fluid"
    >
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-4 col-sm-12">
          <h4>Recipe Details</h4>
          {product && product.description && (
            <Card
              product={product}
              showViewProductButton={false}
              description={true}
            />
          )}
        </div>

        {/* <div className="col-md-4">
          <h4>Related products</h4>
          {relatedProduct.map((p, i) => (
            <div className="mb-3" key={i}>
              <Card product={p} />
            </div>
          ))}
        </div> */}
        <div className="col-md-2"></div>
      </div>
    </Layout>
  );
};

export default Product;
