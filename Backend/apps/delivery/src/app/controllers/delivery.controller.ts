import { ServerException } from '@middleware-scs3203/utilities';

export default class DeliveryConstroller {
  constructor(private db: any) {}

  //get delivery rate
  async getQuote(address) {
    return {
      price:
        'colombo' in address.toLocaleLowerCase
          ? Math.floor(Math.random() * 500)
          : Math.floor(Math.random() * 2000),
    };
  }

  //add delivery
  async addDelivery(
    customer: string,
    address: string,
    items: object,
    deliveryPrice: number
  ) {
    try {
      await this.db.query(  
        'INSERT INTO delivery (customer, address, items, delivery_price) VALUES (?,?,?,?)', //insert delivery into database
        [customer, address, JSON.stringify(items), deliveryPrice]
      );
      return 'Delivery Successful'; //return success message
    } catch (error) {
      throw new Error(error) //throw error
    }
  }
}
