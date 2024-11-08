import { Handler, Context, Callback } from 'aws-lambda';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import serverlessExpress from 'serverless-http';

let server: Handler;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.init();
  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress(expressApp);
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  server = server ?? (await bootstrap());
  return server(event, context, callback);
};
