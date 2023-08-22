import React, { useState, useEffect } from 'react';
import './Products.css';

function Products({ refresh }) {
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
    }, [refresh]);

    const handleDelete = async (productId) => {
      const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
          method: 'DELETE',
      });

      if (response.ok) {
          console.log('Product deleted successfully');
          setProduct(prevProducts => prevProducts.filter(item => item._id !== productId));
      } else {
          console.error('Error deleting product');
      }
  };

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="grid-container">
          {product.map(item => (
            <div key={item._id}>
              <h2>{item.title}</h2>
              <p>${item.price}</p>
              <a href={item.description} target="_blank">{item.description}</a>
              <button onClick={() => handleDelete(item._id)}>Delete</button>
            </div>
          ))}
        </div>
      );
}

export default Products;