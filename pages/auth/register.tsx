import { useState } from 'react';
import { GetServerSideProps } from 'next';
import { getSession, signIn } from 'next-auth/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import {
  Box,
  Button,
  Chip,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { ErrorOutlined } from '@mui/icons-material';

import { useForm } from 'react-hook-form';

import { AuthLayout } from '../../components/layouts';
import { validation } from '../../utils';
import { useAuthProvider } from '../../context';

type FormData = {
  email: string;
  name: string;
  password: string;
};

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const { onRegister } = useAuthProvider();

  const router = useRouter();
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const onUserRegister = async ({ name, email, password }: FormData) => {
    setShowError(false);

    const result = await onRegister(name, email, password);

    if (result.hasError) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 3000);
      setErrorMessage(result.message || '');
      return;
    }

    await signIn('credentials', { email, password });
  };

  return (
    <AuthLayout title="Register">
      <form onSubmit={handleSubmit(onUserRegister)}>
        <Box sx={{ width: 350, padding: '10px 20px' }}>
          <Grid container spacing={2}>
            <Grid xs={12} item>
              <Typography variant="h1" component="h1">
                New account
              </Typography>
              {showError && (
                <Chip
                  label={`Error on register - ${errorMessage}`}
                  color="error"
                  icon={<ErrorOutlined />}
                  className="fadeIn"
                  sx={{ my: 2 }}
                />
              )}
            </Grid>

            <Grid xs={12} item>
              <TextField
                label="Name"
                variant="filled"
                fullWidth
                {...register('name', {
                  required: 'This field is required',
                  minLength: { value: 6, message: 'Min 6 characters' },
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>

            <Grid xs={12} item>
              <TextField
                label="Email"
                variant="filled"
                fullWidth
                {...register('email', {
                  required: 'This field is required',
                  validate: validation.isEmail,
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>

            <Grid xs={12} item>
              <TextField
                label="Password"
                variant="filled"
                type="password"
                fullWidth
                {...register('password', {
                  required: 'This field is required',
                  minLength: { value: 6, message: 'Min 6 characters' },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>

            <Grid xs={12} item>
              <Button
                color="secondary"
                className="circular-btn"
                size="large"
                fullWidth
                type="submit"
              >
                Access
              </Button>
            </Grid>

            <Grid xs={12} item display="flex" justifyContent="end">
              <NextLink
                href={
                  router.query.p
                    ? `/auth/login?p=${router.query.p}`
                    : '/auth/login'
                }
                passHref
              >
                <Link underline="always">Already have account?</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const session = await getSession({ req });

  const { p = '/' } = query;

  if (session) {
    return {
      redirect: {
        destination: p.toString(),
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
export default RegisterPage;
