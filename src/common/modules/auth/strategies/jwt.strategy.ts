import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { UserService } from 'src/public/user/user.service'
import { ConfigService } from '@nestjs/config'
import { ReadUserDto } from '../dto/read-user.dto'
import { plainToClass } from 'class-transformer'
import { ReadTenancyDto } from '../dto/read-tenancy.dto'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'mysecretejwtpassword',
    })
  }

  async validate(validationPayload: { email: string; sub: string }): Promise<ReadUserDto> | null {
    const readTenancies: ReadTenancyDto[] = []
    const user = await this.userService.find({ email: validationPayload.email })
    user?.userTenancies.forEach((userTenancy) => {
      const readTenancy = plainToClass(ReadTenancyDto, userTenancy.tenancy)
      readTenancies.push(readTenancy)
    })
    const readUser: ReadUserDto = plainToClass(ReadUserDto, user)
    if (user) {
      readUser.tenancies = readTenancies
      return readUser
    }
    return null
  }
}
