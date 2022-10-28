import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Button, Card, Link, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
// eslint-disable-next-line import/no-unresolved
import Iconify from 'src/components/Iconify';
import { fCurrency } from '../../../utils/formatNumber';
// components
import { ColorPreview } from '../../../components/color-utils';
import Label from '../../../components/Label';


// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCard({ product,handleClick}) {
  const { name, price } = product;
  

  // const handleClick = (name,price,fCurrency) => {
  //   // console.log(`Item Details : ${name} and ${price} ${fCurrency}`)
  //   console.log("I am clicked!!")
  // }

  return (
    <Card>
{/*       <Box sx={{ pt: '100%', position: 'relative' }}>
        {status && (
          <Label
            variant="filled"
            color={(status === 'sale' && 'error') || 'info'}
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            {status}
          </Label>
        )}
        <ProductImgStyle alt={name} src={cover} />
      </Box> */}

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link to="#" color="inherit" underline="hover" component={RouterLink}>
          <Typography variant="h4" noWrap sx={{fontWeight:400}}>
            {name}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle1">
            &nbsp;
            {fCurrency(price)}
          </Typography>
          <Button onClick={() => handleClick(product)}><Iconify icon={'bi:cart-plus-fill'} width={22} height={22} /></Button>
        </Stack>
      </Stack>
    </Card>
  );
}
