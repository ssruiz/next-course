import { useEffect } from 'react';
import NextLink from 'next/link';

import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Link,
  Typography,
} from '@mui/material';
import { CartList, OrderSummary } from '../../components/cart';
import { ShopLayout } from '../../components/layouts';
import { useCartProvider } from '../../context';
import { countries } from '../../utils';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
const SummaryPage = () => {
  const { shippingAddress, summary } = useCartProvider();
  const router = useRouter();

  useEffect(() => {
    if (!Cookies.get('firstName')) router.push('/checkout/addres');
  }, [router]);

  if (!shippingAddress) return <></>;
  const { address, city, country, firstName, lastName, phone, zip, addres2 } =
    shippingAddress;
  return (
    <ShopLayout title="Your cart" pageDescription="Order summary">
      <Typography variant="h1" component="h1">
        Order Summary
      </Typography>

      <Grid container sx={{ mt: 4 }}>
        <Grid item xs={12} sm={7}>
          <CartList />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">
                Summary {summary.numberOfItems}{' '}
                {summary.numberOfItems === 1 ? 'product' : 'products'}
              </Typography>
              <Divider sx={{ my: 1 }} />

              {/* Summary */}

              <Box display="flex" justifyContent="end">
                <NextLink href="/checkout/address" passHref>
                  <Link underline="always">Edit</Link>
                </NextLink>
              </Box>

              <Typography variant="subtitle1">Address</Typography>

              <Typography>{`${firstName} ${lastName}`}</Typography>

              <Typography>
                {address} {addres2 ? addres2 : ''}
              </Typography>

              <Typography>
                {city}, {zip}
              </Typography>

              <Typography>
                {
                  countries.find((countryItem) => countryItem.code === country)
                    ?.name
                }
              </Typography>
              <Typography>{phone}</Typography>

              <Divider sx={{ my: 1 }} />

              <Box sx={{ my: 2 }} display="flex" justifyContent="end">
                <NextLink href="/cart" passHref>
                  <Link underline="always">Edit</Link>
                </NextLink>
              </Box>

              <OrderSummary />

              <Box sx={{ mt: 3 }}>
                <Button fullWidth className="circular-btn" color="secondary">
                  Place Order
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default SummaryPage;
