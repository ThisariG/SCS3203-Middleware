import {
  ServerException,
  UnauthorizedException,
} from '@middleware-scs3203/utilities';
import axios from 'axios';

export default class PaymentController {
  constructor(private db: any) {}

  //Call the end points of email or sms according to the user preference 
  private async paymentSuccessMessage(type: string, body: any) {
    let message;
    try {
      if (type == 'mobile')
        message = await axios.post('http://127.0.0.1:8290/notification/sms', {
          phone: body.phone,
          message: body.message + ' of' + body.amount,
          subject : body.subject
        });
      else if (type == 'email')
        message = await axios.post('http://127.0.0.1:8290/notification/mail', {
          email: body.email,
          subject: body.subject,
          message: body.message + ' of' + body.amount,
        });
      else throw new ServerException('Invalid type');
    } catch (e) {
      throw new ServerException('Payment success message failed' + e);
    }
    console.log(message.data.data);
    return message.data.data;
  }

  //Payment processes by card payments
  async cardPayment(
    cardNumber: string,
    cvc: string,
    cardHolder: string,
    amount: number,
    callback: string,
    email: string
  ) {
    try {
      console.log(cardNumber, cvc, cardHolder, amount, callback, email);
      await this.db.query(
        'INSERT INTO card_payment (cardNumber, cvc, cardHolder, amount) VALUES (?,?,?,?)',
        [cardNumber, cvc, cardHolder, amount]
      );
      await axios.get(callback);
      const message = await this.paymentSuccessMessage('email', {
        email: email,
        subject: 'Payment Gateway',
        message: 'Your payment was successful',
        amount: amount,
      });
      return message.data.data;
    } catch (e) {
      throw new ServerException('Card payment failed' + e);
    }

  }

  //payment processes by mobile
  async mobilePayment(
    mobileNumber: string,
    amount: number,
    pin: string,
    callback: string
  ) {
    try {
      const result = await this.db.query(
        'SELECT * FROM mobile_payment WHERE pin = ? AND mobileNumber = ? ',
        [pin, mobileNumber]
      );
      if (result.length == 0)
        throw new UnauthorizedException('Invalid details');
      await this.db.query(
        'UPDATE mobile_payment SET mobileNumber = ?, amount = ? WHERE pin = ?',
        [mobileNumber, amount, pin]
      );

      axios.get(callback);
      return await this.paymentSuccessMessage('mobile', {
        phone: mobileNumber,
        message: 'Your payment was successful',
        subject : 'Payment Gateway',
        amount: amount,
      });
    } catch (e) {
      throw new ServerException('Mobile payment failed' + e);
    }
  }

  //Generates a unique pin number
  async getMobilePaymentPin(mobileNumber: string) {
    const pin = Math.floor(Math.random() * 10000);
    try {
      await this.db.query(
        'INSERT INTO mobile_payment (mobileNumber, pin) VALUES (?,?)',
        [mobileNumber, pin]
      );
      const message = await axios.post(
        'http://127.0.0.1:8290/notification/sms',
        {
          phone: mobileNumber,
          message: `Your pin is ${pin}`,
        }
      );
      return message.data.data;
    } catch (e) {
      throw new ServerException('Mobile payment failed' + e);
    }
  }
}
