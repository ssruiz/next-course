import { Box, Typography } from '@mui/material';
import { NextPage } from 'next';
import { ShopLayout } from '../components/layouts';

const NotFoundPage: NextPage = () => {
  return (
    <ShopLayout
      title={'Not Found Layout'}
      pageDescription={"There's nothing to show here"}
      imageFullUrl={''}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="calc(100vh - 200px)"
        sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
      >
        <Typography variant="h1" component="h1" fontSize={80} fontWeight={150}>
          404 |
        </Typography>
        <Typography marginLeft={2}>
          {` There's nothing to show here`}
        </Typography>
      </Box>
    </ShopLayout>
  );
};

export default NotFoundPage;
