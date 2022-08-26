import { FC } from 'react';
import NextLink from 'next/link';
import {
  Box,
  Button,
  CardActionArea,
  CardMedia,
  circularProgressClasses,
  Grid,
  Link,
  Typography,
} from '@mui/material';

import { ItemCounter } from '../ui';
import { ICartProduct } from '../../interfaces';
import { useCartProvider } from '../../context';
import { ProductionQuantityLimits } from '@mui/icons-material';
interface Props {
  canEdit?: boolean;
  children?: React.ReactNode;
}

export const CartList: FC<Props> = ({ canEdit = false }) => {
  const { cart, updateCartQuantity, removeProducFromCart } = useCartProvider();

  const onQuantityChange = (product: ICartProduct, newQuantity: number) => {
    updateCartQuantity({ ...product, quantity: newQuantity });
  };

  return (
    <>
      {cart.map((product: ICartProduct) => (
        <Grid
          container
          spacing={2}
          sx={{ mb: 1 }}
          key={product.slug + product.size}
        >
          <Grid item xs={3}>
            <NextLink href={`/products/${product.slug}`} passHref>
              <Link>
                <CardActionArea>
                  <CardMedia
                    image={`/products/${product.image}`}
                    component="img"
                    sx={{ borderRadius: 5 }}
                  />
                </CardActionArea>
              </Link>
            </NextLink>
          </Grid>
          <Grid item xs={7}>
            <Box display="flex" flexDirection="column">
              <Typography variant="body1">{product.title}</Typography>
              <Typography variant="body1">Size: {product.size}</Typography>

              {canEdit ? (
                <ItemCounter
                  value={product.quantity}
                  onQuantityChange={(value) => {
                    onQuantityChange(product, value);
                  }}
                />
              ) : (
                <Typography>
                  {product.quantity}{' '}
                  {product.quantity > 0 ? 'products' : 'product'}
                </Typography>
              )}
            </Box>
          </Grid>
          <Grid
            item
            xs={2}
            display="flex"
            alignItems="center"
            flexDirection="column"
          >
            <Typography variant="subtitle1">{`$${product.price}`}</Typography>

            {canEdit && (
              <Button
                variant="text"
                color="secondary"
                onClick={() => removeProducFromCart(product)}
              >
                Remove
              </Button>
            )}
          </Grid>
        </Grid>
      ))}
    </>
  );
};
