/** @format */

import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import moment from 'moment';
import { NextFunction, Request, Response } from 'express';
import User from '@models/User';

class AuthenticationStore {
  static async authenticate(req: Request, res: Response, next: NextFunction) {
    const payload = await AuthenticationStore.consumeToken(req);

    if (payload.status && payload.status !== 200) {
      return res.status(payload.status).json(payload.message);
    }

    const {
      sub: subscription,
      session_state: sessioState,
      exp,
      email,
      preferred_username: userName,
      role,
    } = payload;

    req.userId = subscription;
    req.userName = userName;
    req.sessionState = sessioState;
    req.expiration = exp;
    req.email = email;
    req.role = role;

    return next();
  }

  static signJwt(user: User) {
    let payload = {
      sub: user.id,
      role: user.roles,
      iat: moment().unix(),
      exp: moment().add(6, 'hours').unix(),
    };
    console.log(process.env.JWT_SECRET);
    return jwt.sign(payload, process.env.JWT_SECRET);
  }

  static async isAdmin(req: Request, res: Response, next: NextFunction) {
    if (!req.userId || req.role !== 'ADMIN') {
      return res.status(401).json('Unauthorized');
    }
    next();
  }

  static decodeJwt(token: string) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('DECODED TOKEN', decoded);
      return decoded;
    } catch (error) {
      console.log('[ERROR WHEN DECODE JWT]', error);
    }
  }

  static bearer(token: string) {
    let payload = this.decodeJwt(token);
    return payload;
  }

  static async consumeToken(req: Request) {
    let result: {
      status?: number;
      message?: string;
    } = {};

    if (!req.headers.authorization) {
      result.status = 401;
      result.message =
        'Please make sure your request has an authorization header';
      return result;
    }
    let token = req.headers.authorization.split(' ')[1];
    let type = req.headers.authorization.split(' ')[0];
    let payload;

    switch (type) {
      case 'Bearer':
        payload = AuthenticationStore.bearer(token);
        break;
      default:
        result.status = 401;
        result.message = 'Invalid token type. Must be type Bearer';
        return result;
    }
    if (!payload || !payload.sub) {
      result.status = 401;
      result.message = 'Authorization Denied.';
      return result;
    }

    if (payload.exp <= moment().unix()) {
      result.status = 401;
      result.message = 'Token has expired';
      return result;
    }
    return payload;
  }
}
export default AuthenticationStore;
