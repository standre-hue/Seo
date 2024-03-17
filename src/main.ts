
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  const options = new DocumentBuilder()
  .setTitle('SEO API')
  .setDescription('API permettnt de gerer des entreprises pour en faire un petit moteur de recherche')
  .setVersion('1.0')
  .addTag('API')
  .build();

const document = SwaggerModule.createDocument(app, options);
SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
