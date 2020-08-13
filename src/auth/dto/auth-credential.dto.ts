import { IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class AuthCredentialDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  userName: string;

  @IsString()
  @MinLength(8, { message: 'Password must be longer than 8 character' })
  @MaxLength(20)
  // @Matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]$/)
  password: string;
}
