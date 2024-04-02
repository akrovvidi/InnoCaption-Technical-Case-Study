import React, { useState } from 'react'; 
import axios from "axios";
import './App.css';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import SearchBar from './components/SearchBar.js';

function App() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false); 
  const [searchPerformed, setSearchPerformed] = useState(false);
  const fetchProducts = async (query) => {
    try {
      const response = await axios.get(`https://dummyjson.com/products/search?q=${query}`);
      return response.data.products;
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  };

  // Function to fetch products based on category
  const fetchProductsByCategory = async (category) => {
    try {
      const response = await axios.get(`https://dummyjson.com/products/category/${category}`);
      return response.data.products;
    } catch (error) {
      console.error('Error fetching products by category:', error);
      return [];
    }
  };

  // Function to add an item to the cart
  const addToCart = (product) => {
    const updatedCart = [...cartItems, product];
    setCartItems(updatedCart);
  };
  
  // Function to remove an item from the cart
  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter(item => item.id !== productId);
    setCartItems(updatedCart);
  };

  // Function to handle search query change
  const handleSearchChange = async (query, category) => {
    setLoading(true); 
    setSearchPerformed(true);

    let fetchedProducts = [];

    if (category) {
      fetchedProducts = await fetchProductsByCategory(category);
      fetchedProducts = await fetchProducts(query);
    }
    setProducts(fetchedProducts); 
    setLoading(false); // Set loading to false after fetching data
  };

  return (
    <div className="App">
      <header className="header">
        <div className="title">E-commerce Platform</div>
        <div className="icon-cart">
          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0h8m-8 0-1-4m9 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-9-4h10l2-7H3m2 7L3 4m0 0-.792-3H1"/>
          </svg>
          <span>{cartItems.length}</span>
        </div>
      </header>
      <SearchBar onSearchChange={handleSearchChange} />
      {/* Only render the cart and product list if a search has been performed */}
      {searchPerformed && (
        <div className="content">
          {loading ? ( // Render loading indicator if data is still loading
            <p>Loading...</p>
          ) : (
            // Render product list if data is loaded
            <>
              {products.length > 0 ? (
                <ProductList products={products} addToCart={addToCart} />
              ) : (
                <p>No products found.</p>
              )}
              <Cart cartItems={cartItems} removeFromCart={removeFromCart} />
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
