import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails } from '../actions/productActions';
import { useParams } from 'react-router-dom';

const ProductDetail = ({ history }) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id]);

  const addToCartHandler = () => {
    history.push(`/cart/${id}?qty=1`);
  };

  return (
    <div className="container mx-auto p-4">
      {loading ? (
        <h2 className="text-2xl">Loading...</h2>
      ) : error ? (
        <h2 className="text-2xl text-red-600">{error}</h2>
      ) : (
        <div className="bg-white p-4 rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
          <h3 className="text-3xl font-bold">{product.name}</h3>
          <p className="text-xl text-gray-700">${product.price}</p>
          <p className="text-gray-600">{product.description}</p>
          <button onClick={addToCartHandler} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">
            Add to Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
