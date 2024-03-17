/*@Get()
  @Render('index')
  async index()  {
    const companies = await this.prisma.company.findMany();
    console.log(companies)
    return { companies };
  }

  @Get('dashboard')
  @Render('dashboard')
  async dashboard(@Query() query)  {
    const companies = await this.prisma.company.findMany()
    return {
        companies
    }
  }

  @Get('search')
  @Render('results')
  async results(@Query() query)  {
    console.log(query.q);
    const companies = await this.prisma.company.findMany({
        include:{
            links:true
        },
        where: {
            name:{
                contains: query.q
            }
        }
    })
    const company = companies[0].links
    console.log(company)
    return { companies, q:query.q };
  }

  @Get('register')
  @Render('register')
  async register()  {
    return {

    }
  }

  @Post('register')
  @UseInterceptors(FilesInterceptor('logo'))
  @Render('register')
  async register_(@Body() body, @UploadedFile() file: Express.Multer.File)  {
    //.log(body);
    const { name, number, link, description,email } = body;
    const company = await this.prisma.company.create({
        data:{
            name,
            email,
            logo:file.filename,
            description
        }
    });
    const link_ = await this.prisma.link.create({
        data:{
            content:link,
            company:{
                connect:{
                    id:company.id
                }
            }
        }
    })
    const number_ = await this.prisma.number.create({
        data:{
            content:number,
            company:{
                connect:{
                    id:company.id
                }
            }
        }
    })
    console.log(file)
    return {
        message:"company created successfully"
    }
  }*/