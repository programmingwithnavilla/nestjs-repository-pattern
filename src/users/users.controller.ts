import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
} from '@nestjs/common';
import { CreateUserSchema } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  async create(@Body() body: any) {
    const parsed = CreateUserSchema.safeParse(body);
    if (!parsed.success) {
      throw new BadRequestException(parsed.error.format());
    }
    return this.userService.create(parsed.data);
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }
  @Get(':page/:limit')
  async findPaginated(
    @Param('page') page: string,
    @Param('limit') limit: string,
    @Query('sort') sort?: string,
    @Query('filter') filters?: Record<string, any>,
  ) {
    return this.userService.findPaginated(+page, +limit, sort, filters);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    const parsed = CreateUserSchema.safeParse(body);
    if (!parsed.success) {
      throw new BadRequestException(parsed.error.format());
    }
    return this.userService.update(+id, parsed.data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.userService.delete(+id);
  }
}
