// 3p
import { isCommon } from '@foal/password';
import { createConnection, getRepository } from 'typeorm';
// App
import { User } from '../app/entities';

export const schema = {
  additionalProperties: false,
  properties: {
    channelName: { type: 'string' },
    email: { type: 'string', format: 'email' },
    // groups: { type: 'array', items: { type: 'string' }, uniqueItems: true, default: [] },
    password: { type: 'string', pattern: '^[\\w\\d-?!\\$=]+$' },
    // userPermissions: { type: 'array', items: { type: 'string' }, uniqueItems: true, default: [] },
  },
  // allRequired: true, // Note: gives a less explicit message about "required" compared to the next line
  required: ['channelName', 'email', 'password'],
  type: 'object',
};

/**
 * Create a new user with the arguments given in the command line.
 * @example $ foal run create-user email="rofl.mdr@lol.com" password="12345abcdef"
 */
export async function main({ channelName, email, password /*, groups, permissions*/ }: User) {
  const connection = await createConnection();

  const newUser = new User();
  newUser.channelName = channelName;
  newUser.email = email;

  if (await isCommon(password)) {
    return console.log('This password is too common. Please choose another one.');
  }

  try {
    await newUser.setPassword(password);
    // await newUser.setUserPermissions(permissions);
    // await newUser.setUserGroups(groups);

    console.log(await getRepository(User).save(newUser));
  } catch (error) {
    console.error(error.message);
  } finally {
    await connection.close();
  }
}
