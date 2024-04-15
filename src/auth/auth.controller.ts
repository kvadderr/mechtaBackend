import {
  Controller,
  Post,
  Req,
  Body,
  ForbiddenException,
  UseInterceptors,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginResponse } from './type/loginResponse';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/user/entities/user.entity';
import { UserService } from '../user/user.service';
import { CookieInterceptor } from './interceptor/cookie.interceptor';
import { CodeCheckDto } from './dto/codeCheck.dto';
import { LoginUserDto } from './dto/loginUser.dto';

@Controller('/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) { }

  @Post('sign')
  async registerUser(@Body() loginUserDto: LoginUserDto) {
    return
  }


  @Post('check')
  async check(@Body() checkCode: CodeCheckDto) {
    const { phone, code } = checkCode;
    if (code === '1234') {
      let existingUser = await this.userService.findOneByPhone(phone);
      if (!existingUser) {
        existingUser = await this.userService.create({ phone })
      }
      const { id, role } = existingUser;
      const tokens = this.authService.assignTokens(id, role);
      return tokens
    } else throw new ForbiddenException('Неверный код');
  }

  @Post('refresh-token')
  async getTokens(@Req() req): Promise<LoginResponse> {
    const token = req.cookies['refreshToken'];
    try {
      const { accessToken, refreshToken, user } = await this.authService.refreshTokens(token);
      if (accessToken && user) {
        return { accessToken, refreshToken };
      }
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }
}