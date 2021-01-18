import { Config } from '@foal/core';
import { getSecretOrPrivateKey } from '@foal/jwt';
import { Secret, sign, SignOptions } from 'jsonwebtoken';
import { User } from './entities';

/**
 * Generates a signed temporary Json Web Token based on user's email and id
 */
export function createJWT({ email, id }: User) {
  if (!id) throw new Error('[AuthController.createJWT] An undefined ID were passed');

  const payload = { email, id };
  const secret: Secret = getSecretOrPrivateKey();
  const expiresIn: SignOptions['expiresIn'] = Config.getOrThrow('JWT_EXPIRE', 'string');
  const options: SignOptions = { expiresIn, subject: id.toString() };
  return sign(payload, secret, options);
}
