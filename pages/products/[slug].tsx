import { useState } from 'react';
import { NextPage, GetStaticPaths, GetStaticProps } from 'next';

import { Box, Button, Chip, Grid, Typography } from '@mui/material';

import { ShopLayout } from '../../components/layouts';
import { ProductSlideShow, SizeSelector } from '../../components/products';
import { FullScreenLoading, ItemCounter } from '../../components/ui';

import { useRouter } from 'next/router';
import { useProducts } from '../../hooks';
import { ICartProduct, IProduct, ISize } from '../../interfaces';
import { getProductBySlug } from '../../database/dbProducts';
import { dbProducts } from '../../database';
import { useCartProvider } from '../../context/cart/useCartProvider';

interface Props {
  product: IProduct;
  children?: React.ReactNode;
}

const ProductoPage: NextPage<Props> = ({ product }) => {
  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    image: product.images[0],
    price: product.price,
    slug: product.slug,
    title: product.title,
    gender: product.gender,
    quantity: 1,
  });

  const { addToCart } = useCartProvider();

  const onSizeChange = (size: ISize) =>
    setTempCartProduct((prev: ICartProduct) => ({ ...prev, size }));

  const onQuantityChange = (quantity: number) =>
    setTempCartProduct((prev: ICartProduct) => ({
      ...prev,
      quantity:
        quantity > 0 && quantity <= product.inStock ? quantity : prev.quantity,
    }));

  return (
    <ShopLayout
      title={product.title}
      pageDescription={product.description}
      imageFullUrl={product.images[0]}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <ProductSlideShow images={product.images} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Box display="flex" flexDirection="column">
            <Typography variant="h1" component="h1">
              {product.title}
            </Typography>
            <Typography variant="subtitle1">{`$ ${product.price}`}</Typography>

            <Box sx={{ my: 2 }}>
              <Typography variant="subtitle2">Cantidad</Typography>
              <ItemCounter
                value={tempCartProduct.quantity}
                onQuantityChange={onQuantityChange}
              />
              <SizeSelector
                selectedSize={tempCartProduct.size}
                sizes={product.sizes}
                onSizeChange={onSizeChange}
              />
            </Box>

            {/* Agregar al carrito */}

            {/* 
            <Chip label="No stock" variant="outlined" color="error" /> */}

            {product.inStock > 0 ? (
              <Button
                color="secondary"
                className="circular-btn"
                onClick={() =>
                  tempCartProduct.size ? addToCart(tempCartProduct) : null
                }
              >
                {tempCartProduct.size ? 'Add to cart' : 'Select a size'}
              </Button>
            ) : (
              <Chip color="primary" label="Out of stock" />
            )}

            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2">Description</Typography>
              <Typography variant="body2">{product.description}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

// getServerSideProps

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
//*NO USAR ESTO
// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
//   const { slug } = params as { slug: string }; //

//   const product = await dbProducts.getProductBySlug(slug);

//   if (!product)
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false,
//       },
//     };

//   return {
//     props: {
//       product,
//     },
//   };
// };

// getStaticsProps

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const productSlugs = await dbProducts.getAllProductsSlugs();

  return {
    paths: productSlugs.map(({ slug }) => ({
      params: {
        slug,
      },
    })),
    fallback: 'blocking',
  };
};

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug = '' } = params as { slug: string }; // your fetch function here

  const product = await dbProducts.getProductBySlug(slug);

  if (!product)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };

  return {
    props: { product },
    revalidate: 60 * 60 * 24,
  };
};

export default ProductoPage;
