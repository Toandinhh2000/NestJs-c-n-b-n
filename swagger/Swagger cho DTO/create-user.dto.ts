import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Toan' })
  name: string;

  @ApiProperty({ example: 'toan@example.com' })
  email: string;

  @ApiProperty({ example: 25 })
  age: number;
}
