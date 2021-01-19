import { controller, Get, HttpResponseNotFound, IAppController } from '@foal/core';
import { Connection, createConnection } from 'typeorm';
import { ApiController, AuthController } from './controllers';

export class AppController implements IAppController {
  subControllers = [controller('/auth', AuthController), controller('/api', ApiController)];

  async init() {
    const onFulfilled = (connection: Connection) => {
      console.info(`[NODE_ENV: '${process.env.NODE_ENV || 'development'}']`);
      console.info(
        `Successfully connected to database "${connection.driver.database || 'UNDEFINED_DB_NAME'}"`,
        // connection,
      );
    };

    const onRejected = (reason: unknown) => console.error('Connection to database failed', reason);

    await createConnection().then(onFulfilled, onRejected);
  }

  @Get('*')
  renderApp(/* ctx: Context */) {
    // if (!ctx.request.accepts('html')) {
    return new HttpResponseNotFound('Unknown route !');
    // }
    // return createHttpResponseFile({
    //   directory: './public',
    //   file: 'index.html'
    // });
  }
}
