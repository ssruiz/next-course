import { Grid, Typography } from '@mui/material';
import { useCartProvider } from '../../context/cart/useCartProvider';
import { currency } from '../../utils';

export const OrderSummary = () => {
  const { summary } = useCartProvider();

  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography># Products</Typography>
      </Grid>

      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{summary.numberOfItems}</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Sub-Total</Typography>
      </Grid>

      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{currency.format(summary.subTotal)} </Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Taxes</Typography>
      </Grid>

      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{currency.format(summary.taxes)}</Typography>
      </Grid>

      <Grid item xs={6} sx={{ mt: 2 }}>
        <Typography variant="subtitle1">Total</Typography>
      </Grid>

      <Grid item xs={6} display="flex" justifyContent="end" sx={{ mt: 2 }}>
        <Typography variant="subtitle1">
          {currency.format(summary.total)}
        </Typography>
      </Grid>
    </Grid>
  );
};
