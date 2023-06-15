import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from '../shared/Interfaces/post.interface';
import { CreatePostDTO } from '../shared/dto/post.dto'; // Import the CreatePostDTO interface

@Injectable()
export class PostsService {
  constructor(@InjectModel('Post') private readonly postModel: Model<Post>) {}

  // Fetch all posts from the database
  async getPosts(): Promise<Post[]> {
    const posts = await this.postModel.find().exec();
    return posts;
  }

  // Get a single post by ID from the database
  async getPost(postID): Promise<Post> {
    const post = await this.postModel.findById(postID).exec();
    return post;
  }

  // Add a new post to the database
  async addPost(createPostDTO: CreatePostDTO): Promise<Post> {
    const newPost = new this.postModel(createPostDTO);
    return newPost.save();
  }

  // Edit an existing post by ID in the database
  async editPost(postID, createPostDTO: CreatePostDTO): Promise<Post> {
    const editedPost = await this.postModel.findByIdAndUpdate(
      postID,
      createPostDTO,
      { new: true },
    );
    return editedPost;
  }

  // Delete a post by ID from the database
  async deletePost(postID): Promise<any> {
    const deletedPost = await this.postModel.findByIdAndRemove(postID);
    return deletedPost;
  }
}
