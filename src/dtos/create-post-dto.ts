import { IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class CreatePostDto {
  @IsNumber()
  userId: number;
}
