import {
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import type { NextPage } from 'next';
import { ShopLayout } from '../../components/layouts';
import { ProductList } from '../../components/products';
import { FullScreenLoading } from '../../components/ui';
import { useProducts } from '../../hooks';

const CategoryMenPage: NextPage = () => {
  const { products, isError, isLoading } = useProducts('/products?gender=men');

  return (
    <ShopLayout
      title={'Floyd/Shop - Clothes Men'}
      pageDescription={'Clothes for men'}
      imageFullUrl={''}
    >
      <Typography variant="h1" component="h1">
        Category - Men
      </Typography>

      <Typography variant="h2" sx={{ mb: 1 }}>
        Products for Men
      </Typography>

      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default CategoryMenPage;
