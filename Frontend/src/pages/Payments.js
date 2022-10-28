import React, { useEffect } from 'react';
import { render } from 'react-dom';
import { useQuery, useMutation } from 'react-query';
import { Form, Field } from 'react-final-form';
import { Link as RouterLink } from 'react-router-dom';
import {
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Container,
  Stack,
  Typography,
  TextField,
  TableRow,
  TableCell,
  TableBody,
  Table,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
} from '@mui/material';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Styles from '../sections/@dashboard/payments/Styles';
import Card from '../sections/@dashboard/payments/Card';
import { formatCreditCardNumber, formatCVC, formatExpirationDate } from '../sections/@dashboard/payments/cardUtils';

// material
// components
import Page from '../components/Page';
import { getDeliveryCost, getMobilePin, customerPayment } from '../api/queries';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const onSubmit = async (values) => {
  await sleep(300);
  // eslint-disable-next-line no-alert
  window.alert(JSON.stringify(values, 0, 2));
};

export default function CardDetails() {
  const [checked, setChecked] = React.useState(false);
  const [items, setItems] = React.useState([]);

  const [paymentDetails, setPaymentDetails] = React.useState({
    paymentMethod: 'card',
  });

  const [deliveryDetails, setDeliveryDetails] = React.useState({
    address: '',
    deliveryPrice: '',
  });

  const { data: deliveryPrice, isSuccess: deliverySuccess, mutate: getDeliveryPrice } = useMutation(getDeliveryCost);
  const { data: pin, isSuccess: pinSuccess, mutate: getPin } = useMutation(getMobilePin);
  const { data: paymentSuccessData, mutate: paymnetMutation, isSuccess: paymentSucces } = useMutation(customerPayment);

  useEffect(() => {
    if (deliverySuccess) setDeliveryDetails({ ...deliveryDetails, deliveryPrice: deliveryPrice.price });
  }, [deliverySuccess]);

  useEffect(() => {
    if (paymentSucces) {
      localStorage.removeItem('cartItems');
      window.dispatchEvent(new Event('storage'));
      // window.location.reload(false);
    }
  }, [paymentSucces]);

  const total =
    parseInt(
      items.map((item) => item.price).reduce((a, b) => a + b, 0),
      10
    ) + (deliveryDetails.deliveryPrice !== '' ? parseInt(deliveryDetails.deliveryPrice, 10) : 0);

  React.useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cartItems'));
    if (items) {
      setItems(items);
    }
  }, []);

  const cartItems = items.map((item) => (
    <TableRow>
      <TableCell>{item.name}</TableCell>
      <TableCell>{item.amount}</TableCell>
      <TableCell>{item.price.toFixed(2)}</TableCell>
    </TableRow>
  ));

  const handleChangeCheckBox = (e) => {
    setChecked(e.target.checked);
  };

  const handleSelectRadio = (e) => {
    setPaymentDetails({ ...paymentDetails, paymentMethod: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('ssdfsdfsd');
    paymnetMutation({
      paymentDetails: {
        ...paymentDetails,
        amount: total,
      },
      deliveryDetails: {
        ...deliveryDetails,
        deliveryStatus: checked,
      },
      products: items,
    });
  };
  React.useEffect(() => {
    console.log(paymentDetails.mobileNumber);
  }, [paymentDetails.mobileNumber]);
  return (
    <Styles>
      <Dialog
        open={paymentSucces}
        keepMounted
        onClose={() => window.location.reload(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{'Payment Success message'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {paymentSucces && paymentSuccessData}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => window.location.reload(false)}>Close</Button>
        </DialogActions>
      </Dialog>
      <Page title="Checkout">
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              Checkout
            </Typography>
          </Stack>
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '2%', marginTop: '20px' }}>
            <Grid container spacing={3}>
              <Grid item xs="6">
                <Grid item xs="12">
                  <Typography variant="h4">Item List</Typography>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell>Item</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Price</TableCell>
                      </TableRow>
                      {cartItems}
                      {deliveryDetails.deliveryPrice !== '' && (
                        <TableRow>
                          <TableCell>Delivery</TableCell>
                          <TableCell />
                          <TableCell>{deliveryDetails.deliveryPrice.toFixed(2)}</TableCell>
                        </TableRow>
                      )}
                      <TableRow>
                        <TableCell>
                          <Typography fontWeight={900}>Total</Typography>
                        </TableCell>
                        <TableCell />
                        <TableCell>
                          <Typography fontWeight={900}>{total.toFixed(2)}</Typography>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Grid>
              </Grid>
              <Grid item xs="6">
                <Grid item xs="12">
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">Payment Method</FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                      value={paymentDetails.paymentMethod}
                      onChange={handleSelectRadio}
                    >
                      <Stack direction="row" spacing={2}>
                        <FormControlLabel value="card" control={<Radio />} label="Card Payment" />
                        <FormControlLabel value="mobile" control={<Radio />} label="Mobile Payment" />
                      </Stack>
                    </RadioGroup>
                  </FormControl>
                </Grid>
                {paymentDetails.paymentMethod === 'card' ? (
                  <Grid item xs="12">
                    <Typography>Card Details</Typography>
                    <Form
                      onSubmit={onSubmit}
                      render={({ handleSubmit, form, submitting, pristine, values, active }) => (
                        <form onSubmit={handleSubmit}>
                          <Card
                            number={values.number || ''}
                            name={values.name || ''}
                            expiry={values.expiry || ''}
                            cvc={values.cvc || ''}
                            focused={active}
                          />
                          <div>
                            <TextField
                              fullWidth
                              size="small"
                              name="number"
                              type="text"
                              placeholder="Card Number"
                              format={formatCreditCardNumber}
                              onChange={(e) => setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value })}
                            />
                          </div>
                          <div>
                            <TextField
                              fullWidth
                              size="small"
                              name="name"
                              type="text"
                              placeholder="Name"
                              onChange={(e) => setPaymentDetails({ ...paymentDetails, cardHolder: e.target.value })}
                            />
                          </div>
                          <div>
                            <TextField
                              size="small"
                              name="cvc"
                              type="text"
                              fullWidth="true"
                              placeholder="CVC"
                              onChange={(e) => setPaymentDetails({ ...paymentDetails, cvc: e.target.value })}
                            />
                          </div>
                        </form>
                      )}
                    />
                  </Grid>
                ) : (
                  <Grid item xs="12">
                    <Typography sx={{ p: 1 }}>Mobile Details</Typography>
                    <TextField
                      placeholder="Enter Mobile Number"
                      sx={{ width: '90%', margin: '10px 10px 20px 0' }}
                      onChange={(e) =>
                        setPaymentDetails({ ...paymentDetails, mobileNumber: parseInt(e.target.value, 10) })
                      }
                    />
                    <TextField
                      disabled={!pinSuccess}
                      placeholder="Enter the Pin"
                      sx={{ width: '90%', margin: '10px 200px 10px 23px' ,input: {
                        "&:disabled": {
                          background: "#d9d9d9",
                          borderRadius : '8px'
                        }
                    }}}
                      value={paymentDetails.pin}
                      onChange={(e) => setPaymentDetails({ ...paymentDetails, pin: parseInt(e.target.value, 10) })}
                    />
                    <Button
                      sx={{ margin: '10px auto 20px auto', width: '30%' }}
                      variant="contained"
                      component={RouterLink}
                      to="#"
                      type="submit"
                      onClick={(e) => {
                        e.preventDefault();
                        getPin(paymentDetails.mobileNumber);
                      }}
                    >
                      Get Pin
                    </Button>
                    <Typography>{pin}</Typography>
                  </Grid>
                )}

                <Grid item xs="12">
                  <Typography variant="h5">
                    Add Delivery?
                    <Checkbox
                      checked={checked}
                      onChange={handleChangeCheckBox}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                    {checked ? (
                      <>
                        <TextField
                          placeholder="Enter Your Address"
                          sx={{ width: '90%', margin: '10px 200px 10px 23px' }}
                          onChange={(e) => setDeliveryDetails({ ...deliveryDetails, address: e.target.value })}
                        />
                        <Button
                          sx={{ margin: '10px auto 20px auto', width: '30%' }}
                          variant="contained"
                          component={RouterLink}
                          to="#"
                          type="submit"
                          onClick={(e) => {
                            e.preventDefault();
                            getDeliveryPrice(deliveryDetails.address);
                          }}
                        >
                          Get Quote
                        </Button>
                        <Typography variant="h5">Delivery Price: {deliveryPrice?.price}</Typography>
                      </>
                    ) : (
                      <></>
                    )}
                  </Typography>
                  <Button
                    sx={{ margin: '10px auto 20px auto', width: '30%' }}
                    variant="contained"
                    component={RouterLink}
                    to="#"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Pay
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </Container>
      </Page>
    </Styles>
  );
}
