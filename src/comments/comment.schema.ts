import { Schema } from 'mongoose';
import { validate } from 'class-validator';
import { Comment } from './comment.interface';
import { CreateCommentDTO } from './dto/comment.dto';

//  create a schema for the comment data
export const CommentSchema = new Schema<Comment>({
  comment: { type: String, required: true },
  author: { type: String, required: true },
  date_posted: { type: String, required: true },
});

//    validate the comment data
CommentSchema.pre('validate', async function () {
  const commentData = this as Comment;
  const commentDto = new CreateCommentDTO();
  commentDto.comment = commentData.comment;
  commentDto.author = commentData.author;
  commentDto.date_posted = commentData.date_posted;

  //  console and error if the comment data is invalid
  try {
    await validate(commentDto);
  } catch (errors) {
    const errorMessage = errors
      .map((error) => Object.values(error.constraints))
      .join(', ');
    throw new Error(errorMessage);
  }
});
