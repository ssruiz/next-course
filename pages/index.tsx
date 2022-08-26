import type { NextPage } from 'next';

import {
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import { ShopLayout } from '../components/layouts';
import { ProductList } from '../components/products';
import { FullScreenLoading } from '../components/ui';
import { useProducts } from '../hooks';

import { IProduct } from '../interfaces';

const HomePage: NextPage = () => {
  const { products, isError, isLoading } = useProducts('/products');

  return (
    <ShopLayout
      title={'Floyd/Shop'}
      pageDescription={'Find the best Floyd'}
      imageFullUrl={''}
    >
      <Typography variant="h1" component="h1">
        Home
      </Typography>

      <Typography variant="h2" sx={{ mb: 1 }}>
        All Products
      </Typography>

      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default HomePage;
