import React from 'react';

const Cart = ({ cartItems, removeFromCart }) => {
  return (
    <div className="cart">
      <h2 className="cart-title">Your Cart Items</h2>
      <div className="cart-items">
        {cartItems.map(item => (
          <div className="cart-item" key={item.id}>
            <img className="item-thumbnail" src={item.thumbnail} alt={item.title} />
            <div className="item-description">
              <h3 className="item-title">{item.title}</h3>
              <p className="item-price">Price: ${item.price}</p>
              <button className="remove-button" onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
