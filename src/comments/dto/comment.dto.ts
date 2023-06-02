import { IsString, IsDateString } from 'class-validator';

export class CreateCommentDTO {
  @IsString()
  comment: string;

  @IsString()
  author: string;

  @IsDateString()
  date_posted: string;
}
