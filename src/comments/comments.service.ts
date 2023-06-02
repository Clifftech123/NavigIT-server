import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Comment } from './comment.interface';
import { CreateCommentDTO } from './dto/comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel('Comment') private readonly commentModel: Model<Comment>,
  ) {}

  //  fetch all comments from the database
  async findAll(): Promise<Comment[]> {
    return await this.commentModel.find().exec();
  }

  // fetch a single comment by ID from the database
  async findOne(id: string): Promise<Comment> {
    return await this.commentModel.findById(id).exec();
  }

  //    add a new comment to the database
  async create(createCommentDTO: CreateCommentDTO): Promise<Comment> {
    const newComment = new this.commentModel(createCommentDTO);
    return await newComment.save();
  }

  //  edit an existing comment by ID in the database
  async update(
    id: string,
    createCommentDTO: CreateCommentDTO,
  ): Promise<Comment> {
    const updatedComment = await this.commentModel.findByIdAndUpdate(
      id,
      createCommentDTO,
      { new: true },
    );
    return updatedComment;
  }

  //      delete a comment by ID from the database
  async delete(id: string): Promise<Comment> {
    const deletedComment = await this.commentModel.findByIdAndRemove(id);
    return deletedComment;
  }
}
