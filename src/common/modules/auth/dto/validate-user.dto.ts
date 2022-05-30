import { IsEmail, IsNotEmpty } from 'class-validator'

interface ValidateUserINTF {
  email: string
  password: string
}

export class ValidateUserDTO implements ValidateUserINTF {
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsNotEmpty()
  //@MinLength(8)
  password: string
}
