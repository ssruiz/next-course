import type { NextPage, GetServerSideProps } from 'next';
import { Box, Typography } from '@mui/material';
import { ShopLayout } from '../../components/layouts';
import { ProductList } from '../../components/products';
import { FullScreenLoading } from '../../components/ui';

import { IProduct } from '../../interfaces';
import { dbProducts } from '../../database';

interface Props {
  products: IProduct[];
  term: string;
  notFoundProducts: boolean;
}

const SearchPage: NextPage<Props> = ({ products, term, notFoundProducts }) => {
  return (
    <ShopLayout
      title={'Floyd/Shop - Search'}
      pageDescription={'Find the best Floyd'}
      imageFullUrl={''}
    >
      <Typography variant="h1" component="h1">
        Search Products
      </Typography>

      {!notFoundProducts ? (
        <Typography variant="h2" sx={{ mb: 1 }} textTransform="capitalize">
          {term}
        </Typography>
      ) : (
        <Box display="flex">
          <Typography variant="h2" sx={{ mb: 1 }}>
            Not matched products with:
          </Typography>
          <Typography
            variant="body1"
            color="secondary"
            sx={{ mb: 1, ml: 3 }}
            textTransform="capitalize"
          >
            {term}
          </Typography>
        </Box>
      )}

      <ProductList products={products} />
    </ShopLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { query = '' } = params as { query: string };

  if (!query)
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },
    };

  let products = await dbProducts.getProductByTerm(query);

  const notFoundProducts = products.length === 0;
  if (notFoundProducts) {
    products = await dbProducts.getAllProducts();
  }
  //  TODO retornar otros productos

  return {
    props: {
      products,
      term: query,
      notFoundProducts,
    },
  };
};

export default SearchPage;
