import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

// material
import { Container, Skeleton, Stack, Typography } from '@mui/material';
// components
import { useQuery } from 'react-query';
import Page from '../components/Page';
import { ProductCartWidget, ProductFilterSidebar, ProductList, ProductSort } from '../sections/@dashboard/products';
// mock
// ----------------------------------------------------------------------
import { getProducts } from '../api/queries';

export default function EcommerceShop() {
  const [query] = useSearchParams();
  const { data, isError, isLoading, refetch } = useQuery('products', () => getProducts(query.get('query')));
  const [availabeProducts, setAvailableProducts] = useState([]);

  const [openFilter, setOpenFilter] = useState(false);
  const handleOpenFilter = () => {
    setOpenFilter(true);
  };
  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  useEffect(() => {
    if (data) {
      setAvailableProducts(data);
    }
  }, [data]);
  
  useEffect(() => {
    refetch();
  }, [query]);

  // Error and Loading states
  if (isError || isLoading) {
    return <Skeleton />;
  }

  window.addEventListener('storage', () => {
    const cart = JSON.parse(localStorage.getItem('cartItems'));
    const availabeProducts = data.filter((product) => product.amount - cart.reduce((acc, item) => (item.id === product.id ? acc + item.amount : acc), 0) > 0);
    setAvailableProducts(availabeProducts);
  });

  return (
    <Page title="Dashboard: Products">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Products
        </Typography>
        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              isOpenFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort />
          </Stack>
        </Stack>
        <ProductList data={availabeProducts} refetch={refetch} />
        <ProductCartWidget />
      </Container>
    </Page>
  );
}
