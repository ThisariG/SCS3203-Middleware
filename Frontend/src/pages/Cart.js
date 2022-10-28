import { useState ,useEffect} from 'react';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import {
  Container, Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button
} from '@mui/material';
import IconButton from '@mui/material/IconButton';

import { Link as RouterLink , useNavigate} from 'react-router-dom';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
// mock

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const onSubmit = async values => {
  await sleep(300)
  // eslint-disable-next-line no-alert
  window.alert(JSON.stringify(values, 0, 2))
}

export default function CardDetails() {
  const navigate = useNavigate();
  const [cart , setCart] = useState(JSON.parse(localStorage.getItem("cartItems")) || []);

  console.log(JSON.parse(localStorage.getItem("cartItems")));

  const handleDelete = (id) => {
    const rows = cart.filter((row,index) => index !== id);
    setCart([...rows]);
    localStorage.setItem("cartItems", JSON.stringify(rows));
    window.dispatchEvent(new Event("storage"));
  };

  useEffect(() => {
    window.addEventListener('storage', () => {
      setCart(JSON.parse(localStorage.getItem('cartItems')) || []);
    });
  }, []);

    return (
      <Page title="Checkout">
        <Container>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Product Name</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Remove</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.map((row, index) => (
                  <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.price}</TableCell>
                    <TableCell align="right">1</TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => handleDelete(index)}>
                        <DeleteOutlineOutlinedIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button
            sx={{ marginLeft: '36%', width: '15%', marginTop: '20px' }}
            variant="contained"
            startIcon={<Iconify icon="ic:outline-shopping-cart-checkout" />}
            onClick={() => navigate('/dashboard/payments')}
          >
            Checkout
          </Button>
        </Container>
      </Page>
    );
  
      }
