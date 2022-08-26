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

const CategoryKidPage: NextPage = () => {
  const { products, isError, isLoading } = useProducts('/products?gender=kid');

  return (
    <ShopLayout
      title={'Floyd/Shop - Kids'}
      pageDescription={'Category For kids'}
      imageFullUrl={''}
    >
      <Typography variant="h1" component="h1">
        Category - Kids
      </Typography>

      <Typography variant="h2" sx={{ mb: 1 }}>
        Products for Kids
      </Typography>

      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default CategoryKidPage;
