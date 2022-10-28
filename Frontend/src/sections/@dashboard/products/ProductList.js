import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import ShopProductCard from './ProductCard';


ProductList.propTypes = {
  data: PropTypes.array.isRequired,
};

export default function ProductList({ data, refetch, ...other }) {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cartItems')) || []);

  // adding item to cart
  const handleClick = (product) => {
    setCart([...cart, {
      id: product.id,
      amount: 1,
      name: product.name,
      price : product.price,
      uid : product.uid,
    }]);
  };

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cart));
    window.dispatchEvent(new Event("storage"));
  }, [cart]);

  return (
    <Grid container spacing={3} {...other}>
      {data.map((product) => (
        <Grid key={product.id} item xs={12} sm={6} md={3}>
          <ShopProductCard product={product} handleClick={handleClick} />
        </Grid>
      ))}
    </Grid>
  );
}
