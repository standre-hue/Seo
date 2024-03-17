import { Body, Controller, Get, Param, Post, Query, Render, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PrismaClient } from '@prisma/client';
import { Response } from 'express';
import { diskStorage } from 'multer'
import { extname } from 'path'


@Controller('api/v1/')
export class ApiController {
    prisma = new PrismaClient();
    constructor() {
        this.prisma.$connect();
    }

    @ApiTags('company')
    @ApiOperation({ summary: 'Get all companies' })
    @ApiResponse({
        status: 200,
        description: 'Get the list of all companies',
        schema: {
            type: 'object',
            properties: {
                companies: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'number' },
                            name: { type: 'string' },
                            email: { type: 'string' },
                            logo: { type: 'string' },
                            numbers: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        id: { type: 'number' },
                                        content: { type: 'string' },
                                        createdAt: { type: 'datetime' },
                                        updatedAt: { type: 'datetime' },
                                    }

                                }
                            },
                            links: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        id: { type: 'number' },
                                        content: { type: 'string' },
                                        createdAt: { type: 'datetime' },
                                        updatedAt: { type: 'datetime' },
                                    }

                                }
                            }
                        }
                    }
                }
            }
        }
    })
    @Get('companies')
    async companies() {
        const companies = await this.prisma.company.findMany(
            {
                include: {
                    links: true,
                    numbers: true
                }
            }
        );
        return { companies, length: companies.length };
    }

    @ApiTags('number')
    @ApiOperation({ summary: 'Get all numbers' })
    @ApiResponse({
        status: 200, description: 'List of numbers',
        schema: {
            type: 'object',
            properties: {
                numbers: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'number' },
                            content: { type: 'string' },
                            createdAt: { type: 'datetime' },
                            updatedAt: { type: 'datetime' },
                            company: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        id: { type: 'number' },
                                        name: { type: 'string' },
                                        email: { type: 'string' },
                                        logo: { type: 'string' },
                                        createdAt: { type: 'datetime' },
                                        updatedAt: { type: 'datetime' },
                                    }

                                }
                            },
                        }
                    }
                }
            }
        }
    })
    @Get('numbers')
    async numbers() {
        const numbers = await this.prisma.number.findMany(
            {
                include: {
                    company: true,
                }
            }
        );
        return { numbers, length: numbers.length };
    }

    @ApiTags('link')
    @ApiOperation({ summary: 'Get all links' })
    @ApiResponse({
        status: 200, description: 'List of links',
        schema: {
            type: 'object',
            properties: {
                links: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'number' },
                            content: { type: 'string' },
                            createdAt: { type: 'datetime' },
                            updatedAt: { type: 'datetime' },
                            company: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        id: { type: 'number' },
                                        name: { type: 'string' },
                                        email: { type: 'string' },
                                        logo: { type: 'string' },
                                        createdAt: { type: 'datetime' },
                                        updatedAt: { type: 'datetime' },
                                    }

                                }
                            },
                        }
                    }
                }
            }
        }
    })
    @Get('links')
    async links() {
        const links = await this.prisma.link.findMany(
            {
                include: {
                    company: true,
                }
            }
        );
        return { links, length: links.length };
    }


    @ApiTags('search')
    @ApiOperation({ summary: 'Get all companies that satisfied the query' })
    @ApiResponse({
        status: 200, description: 'List of companies that satisfied the query',
        schema: {
            type: 'object',
            properties: {
                companies: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'number' },
                            name: { type: 'string' },
                            email: { type: 'string' },
                            logo: { type: 'string' },
                            numbers: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        id: { type: 'number' },
                                        content: { type: 'string' },
                                        createdAt: { type: 'datetime' },
                                        updatedAt: { type: 'datetime' },
                                    }

                                }
                            },
                            links: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        id: { type: 'number' },
                                        content: { type: 'string' },
                                        createdAt: { type: 'datetime' },
                                        updatedAt: { type: 'datetime' },
                                    }

                                }
                            }
                        }
                    }
                }
            }
        }
    })
    @Get('search')
    async results(@Query() query) {

        const companies = await this.prisma.company.findMany({
            include: {
                links: true
            },
            where: {
                name: {
                    contains: query.q
                }
            }
        })
        return { companies, length: companies.length };
    }

    @ApiTags('company')
    @ApiOperation({ summary: 'Get a specific company' })
    @ApiResponse({
        status: 200, description: 'Get a specific company',
        schema: {
            type: 'object',
            properties: {
                company: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                        name: { type: 'string' },
                        email: { type: 'string' },
                        logo: { type: 'string' },
                        numbers: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id: { type: 'number' },
                                    content: { type: 'string' },
                                    createdAt: { type: 'datetime' },
                                    updatedAt: { type: 'datetime' },
                                }

                            }
                        },
                        links: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id: { type: 'number' },
                                    content: { type: 'string' },
                                    createdAt: { type: 'datetime' },
                                    updatedAt: { type: 'datetime' },
                                }

                            }
                        }
                    }
                }
            }
        }
    })
    @Get('company/:id')
    async company(@Param('id') id, @Res() res: Response) {
        const company = await this.prisma.company.findUnique(
            {
                where: {
                    id: parseInt(id)
                },
                include: {
                    numbers: true,
                    links: true
                }

            }
        );
        if (company == null) {
            res.status(404).send({
                message: 'Compnay not found'
            })
            return;
        }
        res.send({ company })
        return;
    }


    @ApiTags('number')
    @ApiOperation({ summary: 'Get a specific number' })
    @ApiResponse({
        status: 200, description: 'Get a specific number',
        schema: {
            type: 'object',
            properties: {
                number: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                        content: { type: 'string' },
                        createdAt: { type: 'datetime' },
                        updatedAt: { type: 'datetime' },
                        company: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id: { type: 'number' },
                                    name: { type: 'string' },
                                    email: { type: 'string' },
                                    logo: { type: 'string' },
                                    createdAt: { type: 'datetime' },
                                    updatedAt: { type: 'datetime' },
                                }

                            }
                        },
                        
                    }
                }
            }
        }
    })
    @Get('number/:id')
    async number(@Param('id') id, @Res() res: Response) {
        const number = await this.prisma.number.findUnique(
            {
                where: {
                    id: parseInt(id)
                },
                include: {
                    company: true,

                }

            }
        );
        if (number == null) {
            res.status(404).send({
                messqge: 'number not found'
            });
            return;
        }
        res.send({ number })
        return;
    }

    @ApiTags('link')
    @ApiOperation({ summary: 'Get a specific link' })
    @ApiResponse({ status: 200, description: 'Get a specific link', 

    schema: {
        type: 'object',
        properties: {
            link: {
                type: 'object',
                properties: {
                    id: { type: 'number' },
                    content: { type: 'string' },
                    createdAt: { type: 'datetime' },
                    updatedAt: { type: 'datetime' },
                    company: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                id: { type: 'number' },
                                name: { type: 'string' },
                                email: { type: 'string' },
                                logo: { type: 'string' },
                                createdAt: { type: 'datetime' },
                                updatedAt: { type: 'datetime' },
                            }

                        }
                    },
                    
                }
            }
        }
    }
})
    @Get('link/:id')
    async link(@Param('id') id, @Res() res: Response) {
        const link = await this.prisma.link.findUnique(
            {
                where: {
                    id: parseInt(id)
                },
                include: {
                    company: true,

                }

            }
        );
        if (link == null) {
            res.status(404).send({
                messqge: 'link not found'
            });
            return;
        }
        res.send({ link })
        return;
    }

    @ApiTags(':filename')
    @ApiOperation({ summary: 'Get a company logo' })
    @ApiResponse({ status: 200, description: 'Get a company' })
    @Get(':filename')
    async serveImage(@Param('filename') filename, @Res() res: Response) {
        return res.sendFile(filename, { root: './uploads' });
    }

    @ApiTags('company')
    @ApiOperation({ summary: 'Save a company' })
    @ApiResponse({ status: 200, description: 'Save a company' })
    @Post('company')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads'
            , filename: (req, file, cb) => {
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
                cb(null, `${randomName}${extname(file.originalname)}`)
            }
        })
    }))
    async register_(@UploadedFile() file, @Body() body, @Res() res: Response) {
        //.log(body);
        const { name, number, link, description, email } = body;
        if (name == null || name == undefined) {
            res.status(403).send({
                message: "company name is required "
            })
            return;
        }
        if (number == null || number == undefined) {
            res.status(403).send({
                message: "Company number is required"
            })
            return;
        }
        if (link == null || link == undefined) {
            res.status(403).send({
                message: "Company link is required"
            })
            return;
        }
        if (description == null || description == undefined) {
            res.status(403).send({
                message: "Company description is required"
            })
            return;
        }
        if (description.length < 50) {
            res.status(403).send({
                message: "Company description must at least 50 caraters"
            })
            return;
        }
        if (email == null || email == undefined) {
            res.status(403).send({
                message: "Company email is required"
            })
            return;
        }
        let c = await this.prisma.company.findUnique({
            where: {
                name
            }
        })
        if (c != null) {
            res.status(403).send({
                message: "You can't use this name"
            })
            return;
        }

        let cc = await this.prisma.company.findUnique({
            where: {
                email
            }
        })
        //console.log(cc)
        if (cc != null) {
            res.status(403).send({
                message: "You can't use this email"
            })
            return;
        }
        let ccc = await this.prisma.number.findUnique({
            where: {
                content: number
            }
        })

        if (ccc != null) {
            res.status(403).send({
                message: "You can't use this number"
            })
            return;
        }
        const company = await this.prisma.company.create({
            data: {
                name,
                email: email,
                description,
                logo: file.filename
            }
        });
        const link_ = await this.prisma.link.create({
            data: {
                content: link,
                company: {
                    connect: {
                        id: company.id
                    }
                }
            }
        })
        const number_ = await this.prisma.number.create({
            data: {
                content: number,
                company: {
                    connect: {
                        id: company.id
                    }
                }
            }
        })
        console.log(file)
        res.status(200).send({
            message: "company created successfully",
            company
        })
        return;
    }




    @ApiTags('number')
    @ApiOperation({ summary: 'Save a company number' })
    @ApiResponse({ status: 200, description: 'Save a company number' })
    @Post('add-number')
    async add_number(@Body() body, @Res() res: Response) {
        //.log(body);
        const { companyId, number } = body;
        let company = null;
        company = await this.prisma.company.findUnique({
            where: {
                id: parseInt(companyId)
            }
        })
        if (company == null)
            res.status(404).send({
                message: "Company not found"
            })

        if (number == null || number == undefined) {
            res.status(403).send({
                message: "Company number is required"
            })
        }
        let ccc = await this.prisma.number.findUnique({
            where: {
                content: number
            }
        })

        if (ccc != null) {
            res.status(403).send({
                message: "You can't use this number"
            })
            return;
        }

        const number_ = await this.prisma.number.create({
            data: {
                content: number,
                company: {
                    connect: {
                        id: company.id
                    }
                }
            }
        })

        return {
            message: "number added successfully",
            number_
        }
    }

    @ApiTags('link')
    @ApiOperation({ summary: 'Save a company link' })
    @ApiResponse({ status: 200, description: 'Save a company link' })
    @Post('add-link')
    async add_link(@Body() body, @Res() res: Response) {
        //.log(body);
        const { companyId, link } = body;
        let company = null;
        company = await this.prisma.company.findUnique({
            where: {
                id: parseInt(companyId)
            }
        })
        if (company == null)
            res.status(404).send({
                message: "Company not found"
            })

        if (link == null || link == undefined) {
            res.status(403).send({
                message: "Company link is required"
            })
        }

        let ccc = await this.prisma.link.findUnique({
            where: {
                content: link
            }
        })

        if (ccc != null) {
            res.status(403).send({
                message: "You can't use this link"
            })
            return;
        }

        const link_ = await this.prisma.link.create({
            data: {
                content: link,
                company: {
                    connect: {
                        id: company.id
                    }
                }
            }
        })

        return {
            message: "link added successfully",
            link_
        }
    }

    @ApiTags('link')
    @ApiOperation({ summary: 'Delete a company link' })
    @ApiResponse({ status: 200, description: 'Delete a company link' })
    @Get('delete-link/:id')
    async delete_link(@Param('id') id, @Res() res: Response) {
        let link = null;
        link = await this.prisma.link.findUnique({
            where: {
                id: parseInt(id)
            }
        })
        if (link == null)
            res.status(404).send({
                message: "Link not found"
            })

        const link_ = await this.prisma.link.delete({
            where: {
                id: parseInt(id)
            }
        })
        return {
            message: "link deleted successfully",
        }
    }

    @ApiTags('number')
    @ApiOperation({ summary: 'Delete a company number' })
    @ApiResponse({ status: 200, description: 'Delete a company number' })
    @Get('delete-number/:id')
    async delete_number(@Param('id') id, @Res() res: Response) {
        let number = null;
        number = await this.prisma.number.findUnique({
            where: {
                id: parseInt(id)
            }
        })
        if (number == null)
            res.status(404).send({
                message: "Number not found"
            })

        const number_ = await this.prisma.number.delete({
            where: {
                id: parseInt(id)
            }
        })
        return {
            message: "number deleted successfully",

        }
    }


    @ApiTags('company')
    @ApiOperation({ summary: 'Delete a company' })
    @ApiResponse({ status: 200, description: 'Delete a company' })
    @Get('delete-company/:id')
    async delete_company(@Param('id') id, @Res() res: Response) {
        let company = null;

        company = await this.prisma.company.findUnique({
            where: {
                id: parseInt(id)
            }
        })
        if (company == null)
            res.status(404).send({
                message: "Company not found"
            })

        const company_ = await this.prisma.company.delete({
            where: {
                id: parseInt(id)
            }
        })
        res.status(200).send(
            {
                message: "company deleted successfully",

            }
        )

        return;
    }



}
