import axios from 'axios';
import { sign, verify } from 'jsonwebtoken';
import { userInfo } from 'os';

export default class CustomerController {
  // constructor(private db: any) {}

  //customer buying items
  async buyItems(products, paymentDetails, deliveryDetails, token, email) {
    console.log(email)
    const data = sign(
      {
        products: products,
        deliveryDetails: deliveryDetails,
      },
      process.env.JWT_SECRET
    );

    if (paymentDetails.paymentMethod == 'card')
      try {
        const payment = await axios.post('http://127.0.0.1:8290/payment/card', {
          cardNumber: paymentDetails.cardNumber,
          cvc: paymentDetails.cvc,
          cardHolder: paymentDetails.cardHolder,
          amount: paymentDetails.amount,
          callback: `http://127.0.0.1:8290/customer/callback/${data}/${token}`,
          email: email,
        });
        return payment.data.data;
      } catch (e) {
        throw new Error(e);
      }
    else if (paymentDetails.paymentMethod == 'mobile')
      try {
        const payment = await axios.post(
          'http://127.0.0.1:8290/payment/mobile',
          {
            mobileNumber: paymentDetails.mobileNumber,
            amount: paymentDetails.amount,
            pin: paymentDetails.pin,
            callback: `http://127.0.0.1:8290/customer/callback/${data}/${token}`,
          }
        );
        return payment.data.data;
      } catch (e) {
        throw new Error(e);
      }
    else throw new Error('Invalid payment method');
  }

  //completing the payment
  async completePayment(data, token) {
    const { products, deliveryDetails } = verify(data, process.env.JWT_SECRET);
    try {
      await axios.post(
        'http://127.0.0.1:8290/products/buy',
        { products: products },
        {
          headers: { authorization: token },
        }
      );
    } catch (e) {
      throw new Error(e);
    }

    if (deliveryDetails.deliveryStatus) {
      try {
        await axios.post(
          'http://127.0.0.1:8290/delivery/',
          {
            products: products,
            address: deliveryDetails.address,
            deliveryPrice: deliveryDetails.deliveryPrice,
          },
          {
            headers: { authorization: token },
          }
        );
      } catch (e) {
        throw new Error(e);
      }
    }

    return 'Payment process completed';
  }
}
