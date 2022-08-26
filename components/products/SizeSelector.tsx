import { Box, Button } from '@mui/material';
import { FC } from 'react';
import { ICartProduct, ISize } from '../../interfaces';

interface Props {
  selectedSize?: ISize;
  sizes: ISize[];
  children?: React.ReactNode;
  onSizeChange: (size: ISize) => void;
}

export const SizeSelector: FC<Props> = ({
  selectedSize,
  sizes,
  onSizeChange,
}) => {
  return (
    <Box>
      {sizes.map((size) => (
        <Button
          key={size}
          size="small"
          color={selectedSize === size ? 'primary' : 'info'}
          onClick={() => onSizeChange(size)}
        >
          {size}
        </Button>
      ))}
    </Box>
  );
};
