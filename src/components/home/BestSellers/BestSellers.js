import React from "react";
import Heading from "../Products/Heading";
import Product from "../Products/Product";

const BestSellers = ({ products }) => {
  return (
    <div className="w-full pb-20">
      <Heading heading="Our Bestsellers" />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-4 gap-10">
        {products.map((product) => (
          <Product
            key={product._id} 
            _id={product._id}
            img={`http://127.0.0.1:8000${product.img}`} 
            productName={product.productName}
            price={product.price}
            color={product.color}
            badge={product.badge}
            des={product.des}
          />
        ))}
      </div>
    </div>
  );
};

export default BestSellers;
