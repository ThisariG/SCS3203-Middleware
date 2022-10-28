import { createConnection } from 'mysql';
import Seeder from './seeder';

export class db {
  con: any;

  constructor(host, user, password, database) {
    this.con = createConnection({
      host: host,
      user: user,
      password: password,
      database: database,
    });
    

    this.con.connect(function (err) {
      if (err) {
        console.error('error connecting: ' + err.stack);
        const seeder = new Seeder(host, user, password,database);
        this.con = seeder.seed();
        return;
      }
      console.log('connected as id ' + this.con);
    });
  }

  query(sql, args) {
    console.log(sql);
    return new Promise((resolve, reject) => {
      this.con.query(sql, args, (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  }
  getConnection() {
    return this.con;
  }
}
