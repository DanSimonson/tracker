import React from "react";

function Products({ prod, loading }) {
  //console.log("props: ", props);
  //console.log("prod: ", prod);
  //console.log("prod.data: ", prod.data);
  //console.log("loading: ", loading);
  return (
    <div>
      {typeof prod.data !== "undefined" && (
        <div>
          {prod.data.map((product) => (
            <ul key={product.id}>
              <li>{product.name}</li>
            </ul>
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;
