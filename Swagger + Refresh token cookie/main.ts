import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser()); // cần cho refresh token cookie

  // 🚀 Swagger config
  const config = new DocumentBuilder()
    .setTitle('NestJS Ecommerce API')
    .setDescription('Auth, Users, Product, Orders')
    .setVersion('1.0')
    .addBearerAuth() // để auth bằng Bearer
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  app.enableCors({
    origin: 'http://localhost:3000', // web frontend
    credentials: true, // cho phép gửi cookie
  });

  await app.listen(3000);
}
bootstrap();
