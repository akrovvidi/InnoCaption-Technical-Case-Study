import React from 'react';

function ProductList({ products, addToCart }) {
  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product.id} className="product-item">
          {/* Rendering only the first image in the thumbnail */}
          <img src={product.images[0]} alt={product.title} />
          {/* Render other product information */}
          <h3>{product.title}</h3>
          <p>{product.description}</p>
          <p>${product.price}</p>
          <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
