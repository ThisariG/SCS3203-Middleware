import { UnauthorizedException } from '@middleware-scs3203/utilities';
import { compare, hash } from 'bcrypt';
import { signToken, verifyToken } from '../services/token.service';

export default class AuthController {
  constructor(private db: any) {}

  private async getUserByEmail(email) {
    const user = await this.db.query('SELECT * FROM users WHERE email = ?', [
      email,
    ]); //get user by email

    if (user.length == 0) return false; //if user does not exist
    else return user[0]; //return user
  }

  //user login
  async login(email, password) {
    const user = await this.getUserByEmail(email); //get user by email
    if (!user) throw new UnauthorizedException('User does not exist'); //if user does not exist

    const isPasswordCorrect = await compare(password, user.password); //compare password
    if (!isPasswordCorrect)
      throw new UnauthorizedException('Incorrect Credentials'); //if password is incorrect

    const token = signToken(user.uid, user.username, user.email, user.role); //signed token
    const decoded = verifyToken(token); //verify token
    return token;
  }

  //user signup
  async signup(username, email, password, role) {
    const saltRounds = 10; //salt rounds
    const hashedPassword = await hash(password, saltRounds); //hashed password
    const { insertId } = await this.db.query(
      'INSERT INTO users (username, email, password ,role) VALUES (?, ?, ?,?)', //insert user into database
      [username, email, hashedPassword, role]
    );
    const token = signToken(insertId, username, email, role); //signed token
    const decoded = verifyToken(token); //verify token
    return token;
  }

  //user authentication
  async authenticate(token) {
    const decoded = verifyToken(token); //verify token
    if (!decoded) throw new UnauthorizedException('Invalid Token'); //if token is invalid
    return decoded;
  }
}
