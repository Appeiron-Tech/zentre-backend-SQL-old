import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { UserService } from 'src/public/user/user.service'
import { ReadUserDto } from './dto/read-user.dto'
import * as bcryptjs from 'bcryptjs'
import { plainToClass } from 'class-transformer'
import { ValidateUserDTO } from './dto/validate-user.dto'
import { UpdUserDto } from './dto/upd-user.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<ReadUserDto> | undefined {
    const user = await this.userService.find({ email: email })
    if (!user) {
      console.log('user not found')
      return null
    }

    const passwordIsValid = await bcryptjs.compare(password, user.password)
    return passwordIsValid ? plainToClass(ReadUserDto, user) : null
  }

  async login(loginUserDTO: ValidateUserDTO): Promise<{ access_token: string }> {
    const payload = {
      email: loginUserDTO.email,
      password: loginUserDTO.password,
    }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }

  async verify(token: string): Promise<ReadUserDto> {
    const decodedUser: ValidateUserDTO = this.jwtService.verify(token, {
      secret: this.configService.get<string>('JWT_SECRET'),
    })
    const user = await this.userService.find({ email: decodedUser.email })
    return plainToClass(ReadUserDto, user)
  }

  async updateUser(params: { email: string; updateUserDTO: UpdUserDto }): Promise<void> {
    const { email, updateUserDTO } = params
    try {
      await this.userService.update(email, updateUserDTO)
    } catch (e) {
      throw e
    }
  }
}
