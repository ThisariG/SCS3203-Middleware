import * as Runner  from 'run-my-sql-file';
import { createConnection } from 'mysql';
import { join } from 'path';

const seedFiles = {
  login: 'login.sql',
  inventory: 'inventory.sql',
  delivery: 'delivery.sql',
  payment: 'payment.sql',
};
//export a default class with argumnets for db name
export default class Seeder {
  private database: string;
  private password: string;
  private host: string;
  private user: string;

  constructor(host, user, password, database) {
    this.database = database;
    this.password = password;
    this.host = host;
    this.user = user;
  }

  private getConnection() {
    return createConnection({
      host: this.host,
      user: this.user,
      password: this.password,
      database: this.database,
    });
  }
  //method to seed the database
  public seed() {
    Runner.connectionOptions({
      host: this.host,
      user: this.user,
      password: this.password,
      // port:3306,
    });

    Runner.runFile(join(__dirname, '..' ,'..','..','db-dumps',seedFiles[this.database]), (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Script sucessfully executed!');
      }
    });

    return this.getConnection();
  }
}
