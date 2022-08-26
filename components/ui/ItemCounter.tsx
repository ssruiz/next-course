import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import { FC } from 'react';

interface Props {
  children?: React.ReactNode;
  value: number;
  onQuantityChange: (quantity: number) => void;
}

export const ItemCounter: FC<Props> = ({ onQuantityChange, value }) => {
  return (
    <Box display="flex" alignItems="center">
      <IconButton onClick={() => onQuantityChange(value - 1)}>
        <RemoveCircleOutline />
      </IconButton>
      <Typography sx={{ width: 40, textAlign: 'center' }}>{value}</Typography>
      <IconButton onClick={() => onQuantityChange(value + 1)}>
        <AddCircleOutline />
      </IconButton>
    </Box>
  );
};
