import React, { useState, useEffect } from 'react';
import './Products.css';

function Products() {
    const [product, setProduct] = useState([]);
    const [error, setError] = useState(null);
    const expressURL = 'http://localhost:5000/api/products';

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(expressURL);
                const jsonData = await response.json();
                setProduct(jsonData.products);
            } catch (error) {
                setError(error);
            }
        };
        fetchProducts();
    }, []);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="grid-container">
          {product.map((item, index) => (
            <div key={index}>
              <h2>{item.title}</h2>
              <p>${item.price}</p>
              <a href={item.description} target="_blank">{item.description}</a>
            </div>
          ))}
        </div>
      );
}

export default Products;