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

const CategoryWomenPage: NextPage = () => {
  const { products, isError, isLoading } = useProducts(
    '/products?gender=women'
  );

  return (
    <ShopLayout
      title={'Floyd/Shop - Women'}
      pageDescription={'Clothes for women'}
      imageFullUrl={''}
    >
      <Typography variant="h1" component="h1">
        Category - Women
      </Typography>

      <Typography variant="h2" sx={{ mb: 1 }}>
        Products for Women
      </Typography>

      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default CategoryWomenPage;
