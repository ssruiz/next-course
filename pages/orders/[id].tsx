import NextLink from 'next/link';

import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Link,
  Typography,
} from '@mui/material';
import { CartList, OrderSummary } from '../../components/cart';
import { ShopLayout } from '../../components/layouts';
import {
  CreditCardOffOutlined,
  CreditCardOutlined,
  CreditScoreOutlined,
} from '@mui/icons-material';

const OrderPage = () => {
  return (
    <ShopLayout title="Order #12312" pageDescription="Order summary">
      <Typography variant="h1" component="h1">
        Order #12312 - Summary
      </Typography>

      {/* <Chip
        sx={{ my: 2 }}
        label="Pending payment"
        variant="outlined"
        color="error"
        icon={<CreditCardOffOutlined />}
      /> */}

      <Chip
        sx={{ my: 2 }}
        label="Paid"
        variant="outlined"
        color="success"
        icon={<CreditScoreOutlined />}
      />

      <Grid container sx={{ mt: 4 }}>
        <Grid item xs={12} sm={7}>
          <CartList />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">Summary 3 products</Typography>
              <Divider sx={{ my: 1 }} />

              {/* Summary */}

              <Box sx={{ my: 2 }} display="flex" justifyContent="end">
                <NextLink href="/checkout/address" passHref>
                  <Link underline="always">Edit</Link>
                </NextLink>
              </Box>

              <Typography variant="subtitle1">Address destination</Typography>

              <Typography>Floyd gatito</Typography>

              <Typography>Cat Box 345</Typography>

              <Typography>Catville, MEW 88</Typography>

              <Typography>SomeCountry</Typography>
              <Typography>+1321 2132 2121</Typography>

              <Divider sx={{ my: 1 }} />

              <Box sx={{ my: 2 }} display="flex" justifyContent="end">
                <NextLink href="/cart" passHref>
                  <Link underline="always">Edit</Link>
                </NextLink>
              </Box>

              <OrderSummary />

              <Box sx={{ mt: 3 }}>
                <h1>Payment</h1>
                <Chip
                  sx={{ my: 2 }}
                  label="Paid"
                  variant="outlined"
                  color="success"
                  icon={<CreditScoreOutlined />}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default OrderPage;
