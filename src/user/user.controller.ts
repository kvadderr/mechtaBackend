import { Controller, Get, Post, Body, Patch, Param, Req, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('/me')
  async getMe(@Req() req): Promise<User> {
    console.log('mee')
    try {
      return req.user;
    } catch (error) {
      throw new UnauthorizedException(`unautorized`);
    }
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Patch()
  update(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    try {
      return this.userService.update(req.user.id, updateUserDto);
    } catch {
      throw new UnauthorizedException(`unautorized`);
    }
  }

}
