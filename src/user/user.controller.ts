import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entity/user.entity';
import { UserService } from './user.service';

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({
    summary: 'Fetches a list of registered users on the application.',
  })
  @ApiQuery({
    name: 'limit',
    type: String,
    description: 'The upper limit of pages you want the pagination to return',
    required: false,
  })
  @ApiQuery({
    name: 'page',
    type: String,
    description:
      'The position of the page number that you want the API to return',
    required: false,
  })
  @ApiResponse({
    status: 200,
    description: 'Users fetched successfully based on the query',
  })
  public async getAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.userService.getAll({ page, limit });
  }

  @Get(':id')
  public async getById(@Param('id') id: string): Promise<User> {
    return this.userService.getById(id);
  }

  @Patch(':id')
  public async updateById(
    @Param('id') id: string,
    @Body() body: Partial<User>,
  ): Promise<User> {
    return this.userService.updateById(id, body);
  }

  @Delete(':id')
  public async deleteById(@Param('id') id: string): Promise<boolean> {
    return this.userService.deleteById(id);
  }
}
