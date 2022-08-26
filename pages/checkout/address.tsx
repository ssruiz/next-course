import { useRouter } from 'next/router';
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { ShopLayout } from '../../components/layouts';
import { countries } from '../../utils';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import { useCartProvider } from '../../context';

type FormData = {
  firstName: string;
  lastName: string;
  address: string;
  addres2: string;
  zip: string;
  country: string;
  city: string;
  phone: string;
};

const getAddressFromCookies = (): FormData => {
  return {
    firstName: Cookies.get('firstName') || '',
    lastName: Cookies.get('lastName') || '',
    address: Cookies.get('address') || '',
    addres2: Cookies.get('addres2') || '',
    zip: Cookies.get('zip') || '',
    country: Cookies.get('country') || '',
    city: Cookies.get('city') || '',
    phone: Cookies.get('phone') || '',
  };
};

const AddressPage = () => {
  const router = useRouter();

  const { updateAddress } = useCartProvider();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: getAddressFromCookies(),
  });

  const onSubmitAddress = (values: FormData) => {
    updateAddress(values);
    router.push('/checkout/summary');
  };

  return (
    <ShopLayout title="Checkout" pageDescription="Confirm address">
      <Typography variant="h1" component="h1">
        Address
      </Typography>

      <form onSubmit={handleSubmit(onSubmitAddress)}>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Name"
              variant="filled"
              fullWidth
              {...register('firstName', {
                required: 'This field is required',
              })}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Lastname"
              variant="filled"
              fullWidth
              {...register('lastName', {
                required: 'This field is required',
              })}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Address"
              variant="filled"
              fullWidth
              {...register('address', {
                required: 'This field is required',
              })}
              error={!!errors.address}
              helperText={errors.address?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Address #2"
              variant="filled"
              fullWidth
              {...register('addres2')}
              error={!!errors.addres2}
              helperText={errors.addres2?.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Zip code"
              variant="filled"
              fullWidth
              {...register('zip', {
                required: 'This field is required',
              })}
              error={!!errors.zip}
              helperText={errors.zip?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="City"
              variant="filled"
              fullWidth
              {...register('city', {
                required: 'This field is required',
              })}
              error={!!errors.city}
              helperText={errors.city?.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              key="selected_country"
              fullWidth
              select
              {...register('country', {
                required: 'This field is required',
              })}
              error={!!errors.country}
              helperText={errors.country?.message}
              variant="filled"
              label="Countery"
              defaultValue={Cookies.get('country') || countries[0].code}
            >
              {countries.map((country) => (
                <MenuItem key={country.name} value={country.code}>
                  {country.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Phone"
              variant="filled"
              fullWidth
              {...register('phone', {
                required: 'This field is required',
              })}
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 5 }} display="flex" justifyContent="center">
          <Button
            type="submit"
            color="secondary"
            className="circular-btn"
            size="large"
          >
            Check order
          </Button>
        </Box>
      </form>
    </ShopLayout>
  );
};

export default AddressPage;
