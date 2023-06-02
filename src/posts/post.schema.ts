import { Schema } from 'mongoose';
import { validate } from 'class-validator';
import { CreatePostDTO } from './dto/post.dto';
import { Post } from './post.interface';

//    create a schema for the post data
export const PostSchema = new Schema<Post>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  body: { type: String, required: true },
  author: { type: String, required: true },
  date_posted: { type: String, required: true },
});

//  validate the post data
PostSchema.pre('validate', async function (next) {
  const postData = this as Post;
  const postDto = new CreatePostDTO();
  postDto.title = postData.title;
  postDto.description = postData.description;
  postDto.body = postData.body;
  postDto.author = postData.author;
  postDto.date_posted = postData.date_posted;

  // console and error if the post data is invalid
  const errors = await validate(postDto);
  if (errors.length > 0) {
    const errorMessage = errors
      .map((error) => Object.values(error.constraints))
      .join(', ');
    next(new Error(errorMessage));
  } else {
    next();
  }
});
