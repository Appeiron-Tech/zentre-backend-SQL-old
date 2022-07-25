import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { UserService } from 'src/public/user/user.service'
import { ConfigService } from '@nestjs/config'
import { ReadUserDto } from '../dto/read-user.dto'
import { plainToClass } from 'class-transformer'
import { ReadTenancyDto } from '../dto/read-tenancy.dto'
import { Request } from 'express'

function getCookie(cookies: string, name: string): string | null {
  const nameEQ = name + '='
  const ca = cookies.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) == ' ') c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length)
  }
  return null
}

/**
 * Extracts the jwt from a cookie
 * @param req Http Request
 */
//https://stackoverflow.com/questions/39163413/node-js-passport-jwt-how-to-send-token-in-a-cookie
const cookieExtractor = (req: Request) => {
  let jwt: string | null = null

  if (req && req.headers.cookie) {
    jwt = getCookie(req.headers.cookie, 'accessToken')
  }
  return jwt
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {
    super({
      //      jwtFromRequest: cookieExtractor,
      jwtFromRequest: ExtractJwt.fromExtractors([
        // Take jwt from http header, Development environment
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        // Take jwt from cookie, Production environment
        cookieExtractor,
      ]),
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
