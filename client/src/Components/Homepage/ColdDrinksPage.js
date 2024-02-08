import React, { useEffect, useState } from 'react';
import "./ColdDrinksPage.css"

const ColdDrinksPage = ({handleAddToCart}) => {
  const [drinks, setDrink] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState('All');

  useEffect(() => {
    fetch('/products')
    .then((response) => response.json())
    .then((data) => {
      const products = data.filter((item) => item.category == 'Cold Drinks')
      setDrink(products)
    })
  }, [])

  const filteredProducts = drinks
    .filter(product => selectedCategory === 'All' || product.category === selectedCategory)
    .filter(product => selectedPriceRange === 'All' || (selectedPriceRange === 'Low' && product.price < 1) || (selectedPriceRange === 'High' && product.price >= 1));

  return (
    <div className="container">
      <h1>Cold Drinks & Juices</h1>

      <div className="content">
        {/* Filter Card */}
        <div className="card filter-card">
          <div className="filter-section">
            <h2>Filters</h2>
            <div>
              <label>Category:</label>
              <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
                <option value="All">All</option>
                <option value="Cold Drinks">Cold Drinks</option>
                <option value="Juices">Juices</option>
              </select>
            </div>
            <div>
              <label>Price Range:</label>
              <select value={selectedPriceRange} onChange={e => setSelectedPriceRange(e.target.value)}>
                <option value="All">All</option>
                <option value="Low">Low</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Cards */}
        <div className="card-container">
          {filteredProducts.map(product => (
            <div key={product.id} className="card">
              <img src={product.imageurl} alt={product.name} />
              <label>{product.name}</label>
              <div className="card-details">
                <p>Category: {product.category}</p>
                <p>Price: Kshs.{product.price}</p>
                <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ColdDrinksPage;