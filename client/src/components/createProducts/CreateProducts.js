import React, { useState } from 'react';
import './CreateProducts.css';

function CreateProducts({ onPostSuccess }) {
    const [postProducts, setPostProducts] = useState({title: "", description: "", price: ""});

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const response = await fetch("http://localhost:5000/api/products/", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postProducts),
        });
    
        if (response.ok) {
          console.log('Post created successfully');
          setPostProducts({ title: "", description: "", price: "" });
          onPostSuccess();
        } else {
          console.error('Error creating post');
        }
      };

    return (
        <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={postProducts.title}
            onChange={(e) => setPostProducts({ ...postProducts, title: e.target.value })}
          />
          <br />
          <textarea
            placeholder="Description"
            value={postProducts.description}
            onChange={(e) => setPostProducts({ ...postProducts, description: e.target.value })}
          />
          <br />
           <input
            type="test"
            placeholder="Price"
            value={postProducts.price}
            onChange={(e) => setPostProducts({ ...postProducts, price: e.target.value })}
          />
          <button type="submit">Create Post</button>
        </form>
      </div>
    )
}

export default CreateProducts;