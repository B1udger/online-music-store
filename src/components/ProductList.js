import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <div className="container mx-auto p-4">
      {loading ? (
        <h2 className="text-2xl">Loading...</h2>
      ) : error ? (
        <h2 className="text-2xl text-red-600">{error}</h2>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition duration-300">
              <h3 className="text-xl font-bold">{product.name}</h3>
              <p className="text-gray-700">${product.price}</p>
              <p className="text-gray-600">{product.description}</p>
              <Link to={`/products/${product.id}`} className="text-blue-500 hover:text-blue-700">View Details</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
