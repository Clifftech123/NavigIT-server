import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Comment } from '../shared/Interfaces/comment.interface';
import { CreateCommentDTO } from '../shared/dto/comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  //   fetch all comments from the database
  @Get()
  async findAll(): Promise<Comment[]> {
    return await this.commentsService.findAll();
  }

  //  fetch a single comment by ID from the database
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Comment> {
    return await this.commentsService.findOne(id);
  }

  //    add a new comment to the database
  @Post()
  async create(@Body() createCommentDTO: CreateCommentDTO): Promise<Comment> {
    return await this.commentsService.create(createCommentDTO);
  }

  //  edit an existing comment by ID in the database
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() createCommentDTO: CreateCommentDTO,
  ): Promise<Comment> {
    return await this.commentsService.update(id, createCommentDTO);
  }

  //    delete a comment by ID from the database
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Comment> {
    return await this.commentsService.delete(id);
  }
}
