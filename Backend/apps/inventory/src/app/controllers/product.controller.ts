import {
  NotFoundException,
  ServerException,
} from '@middleware-scs3203/utilities';

export default class ProductController {
  constructor(private db: any) {}
  //get product details by id
  private async getProductById(id: number) {
    const product = await this.db.query('SELECT * FROM products WHERE id = ?', [
      id,
    ]);
    if (product.length == 0) throw new NotFoundException('Product not found');
    return product[0];
  }

  //get product details by product name 
  async getProducts(name) {
    const query = `SELECT * FROM products WHERE name LIKE '%${name}%'`;
    const products = await this.db.query(query);
    if (products.length == 0) return [];
    return products;
  }

  //if the user role is buyer, then select all the details of all products
  //if the user role is not buyer select product details relevant to the user
  async getAllProducts(user) {
    let products;
    if (user.role == 'buyer') {
       products = await this.db.query('SELECT * FROM products');
    } else {
       products = await this.db.query('SELECT * FROM products where uid = ?', [user.id]);
    }
    if (products.length == 0) return [];
    return products;
  }

  //add products to the catalogue by inserting name,price,amount and image of the product
  async addProduct(
    name: string,
    price: number,
    amount: number,
    img_url: string,
    user : any,
  ): Promise<void> {
    try {
      //TODO: add validation for price and amount

      await this.db.query(
        'INSERT INTO products (name, price, amount, img_url,uid) VALUES (?, ?, ?, ? , ?)',
        [name, price, amount, img_url ,user.id]
      );
    } catch (error) {
      throw new ServerException('Error in adding product');
    }
  }

  //update 
  async updateProduct(
    id: number,
    name: string,
    price: number,
    amount: number,
    img_url: string
  ) {
    const productInfo = await this.getProductById(id);
    //TODO: add validation for price and amount
    console.log(typeof name, name);
    name = name ? name : productInfo.name;
    price = price ? price : productInfo.price;
    amount = amount ? amount : productInfo.amount;
    img_url = img_url ? img_url : productInfo.img_url;

    try {
      await this.db.query(
        'UPDATE products SET name = ?, price = ?, amount = ?, img_url = ? WHERE id = ?',
        [name, price, amount, img_url, id]
      );
    } catch (error) {
      throw new ServerException('Product update failed');
    }

    return 'Product updated';
  }

  //update the amount of the product
  async updateAmount(productArray: any) {
    for (const product of productArray) {
      
      const productInfo = await this.getProductById(product.id);
      if (productInfo.amount < product.amount) {
        throw new ServerException('Not enough product');
      }

      const newAmount = productInfo.amount - product.amount;
      try {
        await this.db.query('UPDATE products SET amount = ? WHERE id = ?', [
          newAmount,
          product.id,
        ]);
      } catch (error) {
        throw new ServerException('Product update failed');
      }
    };

    return 'Inventory updated';
  }

  //delete product from the user catalogue
  async deleteProduct(id: number) {
    try {
      await this.db.query('DELETE FROM products WHERE id = ?', [id]);
    } catch (error) {
      throw new ServerException('Product delete failed');
    }
  }
}
