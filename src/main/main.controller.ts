import { Body, Controller, Get, Post, Query, Render, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express/multer';
import { PrismaClient } from '@prisma/client';


@Controller('web')
export class MainController {
prisma = new PrismaClient();
  constructor() {
    this.prisma.$connect();
  }
}
