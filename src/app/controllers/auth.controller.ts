import {
  Context,
  HttpResponseBadRequest,
  HttpResponseCreated,
  HttpResponseMethodNotAllowed,
  HttpResponseOK,
  HttpResponseUnauthorized,
  Post,
  ValidateBody,
  verifyPassword,
} from '@foal/core';
import { isCommon } from '@foal/password';
import { getMongoRepository } from 'typeorm';
import { User } from '../entities';
import { createJWT } from '../helpers';

const CREDENTIALS_SCHEMA = {
  additionalProperties: false,
  properties: {
    email: { type: 'string', format: 'email' },
    password: { type: 'string' },
  },
  required: ['email', 'password'],
  type: 'object',
};

// @Log('AuthController', { body: true })
export class AuthController {
  @Post('/register')
  @ValidateBody(CREDENTIALS_SCHEMA)
  async register(context: Context<User>) {
    // /!\ IMPORTANT /!\ : for security reason, this route should be used only in development env, and never should be exposed publicly
    if (process.env.NODE_ENV === 'production') return new HttpResponseMethodNotAllowed();

    const { email, password } = context.request.body;
    if (await isCommon(password)) {
      return new HttpResponseBadRequest({
        message: 'This password is too common. Please choose another one.',
      });
    }

    const newUser = new User();
    newUser.email = email;
    await newUser.setPassword(password);

    // FIXME: apparently insert() mutates "newUser" payload with _id instead of id, and doesnot throw any error when failing (@unique email)
    // FIXME: save() does not check if email uniqueness defined in entity model

    const insertedUser = await getMongoRepository(User).save(newUser);
    return new HttpResponseCreated({ token: createJWT(insertedUser) });
  }

  @Post('/login')
  @ValidateBody(CREDENTIALS_SCHEMA)
  async login(context: Context<User>) {
    const { email, password } = context.request.body;
    const user = await getMongoRepository(User).findOne({ email });
    if (!user) {
      return new HttpResponseUnauthorized({ message: 'User not found' });
    }

    return (await verifyPassword(password, user.password))
      ? new HttpResponseOK({ token: createJWT(user) })
      : new HttpResponseUnauthorized();
  }
}
