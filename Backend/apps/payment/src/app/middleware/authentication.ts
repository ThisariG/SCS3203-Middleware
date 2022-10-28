import { Request } from 'express';
import axios from 'axios';
import {
  UnauthorizedException,
  ServerException,
} from '@middleware-scs3203/utilities';

export default (req: Request, res, next) => {
  if (req.header('authorization')) {
    const token = req.header('authorization').split(' ').pop();
    axios
      .get('http://127.0.0.1:8290/authentication', {
        headers: { authorization: token },
      })
      .then((res) => {
        if (res.status == 200) {
          req.user = res.data.data;
          next();
        }
      })
      .catch(err=>{
        next(err);
      });
  } else 
  next( new UnauthorizedException('Unauthorized'));
};
