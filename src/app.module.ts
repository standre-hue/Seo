import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MainModule } from './main/main.module';
import { MainController } from './main/main.controller';
import { MulterModule } from '@nestjs/platform-express/multer';
import { diskStorage } from 'multer';
import { ApiController } from './seoapi/api.controller';

@Module({
  imports: [MainModule,
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads', // specify the upload directory
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
          cb(null, `${uniqueSuffix}-${file.originalname}`);
        },
      }),
    })
  ],
  controllers: [MainController,AppController,ApiController],
  providers: [AppService],
})
export class AppModule {}
