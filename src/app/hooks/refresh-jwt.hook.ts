import { Context, Hook, HookDecorator, HttpResponse, isHttpResponseServerError } from '@foal/core';
import { User } from '../entities';
import { createJWT } from '../helpers';

/**
 * @see https://foalts.org/docs/authentication-and-access-control/jwt#refresh-the-tokens
 */
export function RefreshJWT(): HookDecorator {
  return Hook((ctx: Context<User>) => {
    if (!ctx.user) return;

    return (response: HttpResponse) => {
      if (isHttpResponseServerError(response)) return;

      response.setHeader('Authorization', createJWT(ctx.user));
    };
  });
}
