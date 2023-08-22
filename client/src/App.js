import React, { useState } from 'react';
import './App.css';
import Products from './components/Products/Products';
import CreateProducts from './components/createProducts/CreateProducts';

function App() {
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
      setRefresh(!refresh);
  };

  return (
    <div>
      <Products refresh={refresh} />
      <br />
      <CreateProducts onPostSuccess={handleRefresh} />
    </div>
  );
}

export default App;
