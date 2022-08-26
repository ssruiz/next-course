import { useEffect } from 'react';
import { ShopLayout } from '../../components/layouts';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import { CartList, OrderSummary } from '../../components/cart';
import { useCartProvider } from '../../context';
import { useRouter } from 'next/router';
import { FullScreenLoading } from '../../components/ui';

const CartPage = () => {
  const router = useRouter();
  const { cart, initialized } = useCartProvider();

  useEffect(() => {
    if (initialized && cart.length === 0) {
      router.replace('/cart/empty');
    }
  }, [cart, initialized, router]);

  if (!initialized || cart.length === 0) return <></>;

  return (
    <ShopLayout title={`Cart - ${cart.length}`} pageDescription="Shop cart">
      <Typography variant="h1" component="h1">
        Cart
      </Typography>

      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList canEdit />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="sumary-card">
            <CardContent>
              <Typography variant="h2">Order</Typography>
              <Divider sx={{ my: 1 }} />

              {/* Summary */}

              <OrderSummary />

              <Box sx={{ mt: 3 }}>
                <Button
                  fullWidth
                  className="circular-btn"
                  color="secondary"
                  href="/checkout/address"
                >
                  Checkout
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default CartPage;
