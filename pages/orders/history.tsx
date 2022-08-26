import NextLink from 'next/link';

import { Chip, Grid, Link, Typography } from '@mui/material';

import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

import { ShopLayout } from '../../components/layouts';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'fullname', headerName: 'Full name', width: 300 },
  {
    field: 'paid',
    headerName: 'Payment',
    description: 'Show if the order is paid',
    width: 200,
    renderCell: (params: GridValueGetterParams) =>
      params.row.paid ? (
        <Chip color="success" label="Paid" variant="outlined" />
      ) : (
        <Chip color="error" label="Pending payment" variant="outlined" />
      ),
  },
  {
    field: 'orderlink',
    headerName: 'Order detail',
    width: 200,
    sortable: false,
    editable: false,
    renderCell: (params: GridValueGetterParams) => (
      <NextLink href={`/orders/${params.row.id}`} passHref prefetch={false}>
        <Link color="secondary" underline="always">
          Go to detail
        </Link>
      </NextLink>
    ),
  },
];

const rows = [
  { id: 1, paid: false, fullname: 'Floyd Gatito' },
  { id: 2, paid: true, fullname: 'Floyd Gatito 2' },
  { id: 3, paid: false, fullname: 'Floyd Gatito 3' },
  { id: 4, paid: true, fullname: 'Floyd Gatito 4' },
  { id: 5, paid: false, fullname: 'Floyd Gatito 5' },
];

const HistoryPage = () => {
  return (
    <ShopLayout title="Orders history" pageDescription="User orders history">
      <Typography variant="h1" component="h1">
        Order history
      </Typography>
      <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
        />
      </Grid>
    </ShopLayout>
  );
};

export default HistoryPage;
