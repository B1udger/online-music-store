import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
//wont break the code adding some commets upgrade for them, making it for a streak
const Cart = ({ match, location, history }) => {
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping');
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <div>
          Your cart is empty <Link to="/">Go Back</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="col-span-3">
            {cartItems.map((item) => (
              <div key={item.product} className="flex items-center justify-between p-4 bg-white rounded-lg shadow-lg mb-4">
                <div className="flex items-center">
                  <div className="mr-4">
                    <Link to={`/products/${item.product}`} className="text-blue-500 hover:text-blue-700">
                      {item.name}
                    </Link>
                  </div>
                  <div>${item.price}</div>
                  <div>
                    <select
                      value={item.qty}
                      onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                      className="ml-4 border border-gray-300 rounded"
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => removeFromCartHandler(item.product)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold">Order Summary</h3>
            <div className="flex justify-between mt-4">
              <div>Items:</div>
              <div>
                {cartItems.reduce((acc, item) => acc + item.qty, 0)}
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <div>Total:</div>
              <div>
                ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
              </div>
            </div>
            <button
              onClick={checkoutHandler}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-700 transition duration-300 w-full"
              disabled={cartItems.length === 0}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
