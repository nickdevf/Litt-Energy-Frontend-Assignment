import React from 'react';
import {Product} from "../types/productType.js";

type CardProps = {
    product: Product;
}
const Card = ({product}:CardProps) => {
  return (
      <div className="flex flex-col h-[30rem] md:h-[25rem] justify-between bg-white shadow-lg rounded-md border border-gray-100 py-2">
          <div className="h-[60%]">
              <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full h-full object-contain"
              />
          </div>
          <div className="flex flex-col h-[35%] p-4">
              <div className="flex justify-between mb-2">
                  <div className="text-xl font-bold">{product.title}</div>
                  <div className="text-lg text-green-500">${product.price}</div>
              </div>
              <div className="text-gray-600">{product.description}</div>
          </div>
      </div>

  );
};

export default Card;
