import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Param,
  NotFoundException,
  Post,
  Body,
  Query,
  Put,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDTO } from '../shared/dto/post.dto';
import { ValidateObjectId } from '../shared//pipes/validate-object-id.pipes';

@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}

  // Get all posts from the database
  @Get('posts')
  async getPosts(@Res() res) {
    const posts = await this.postService.getPosts();
    return res.status(HttpStatus.OK).json(posts);
  }

  // Get a particular post by ID from the database
  @Get('post/:postID')
  async getPost(@Res() res, @Param('postID', new ValidateObjectId()) postID) {
    const post = await this.postService.getPost(postID);
    if (!post) throw new NotFoundException('Post does not exist!');
    return res.status(HttpStatus.OK).json(post);
  }

  // Add a new post to the database
  @Post('/post')
  @UsePipes(new ValidationPipe())
  async addPost(@Res() res, @Body() createPostDTO: CreatePostDTO) {
    const newPost = await this.postService.addPost(createPostDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Post has been submitted successfully!',
      post: newPost,
    });
  }

  // Edit an existing post by ID in the database
  @Put('/edit')
  @UsePipes(new ValidationPipe())
  async editPost(
    @Res() res,
    @Query('postID', new ValidateObjectId()) postID,
    @Body() createPostDTO: CreatePostDTO,
  ) {
    const editedPost = await this.postService.editPost(postID, createPostDTO);
    if (!editedPost) throw new NotFoundException('Post does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Post has been successfully updated',
      post: editedPost,
    });
  }

  // Delete a post by ID from the database
  @Delete('/delete')
  async deletePost(
    @Res() res,
    @Query('postID', new ValidateObjectId()) postID,
  ) {
    const deletedPost = await this.postService.deletePost(postID);
    if (!deletedPost) throw new NotFoundException('Post does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Post has been deleted!',
      post: deletedPost,
    });
  }
}
