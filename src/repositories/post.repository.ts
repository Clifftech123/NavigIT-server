import Post from '../models/post.model'
import PostInterface from '../interfaces/post.interface'

// This class is used to interact with the database and perform CRUD operations on the Post table.
class PostRepository {
  public async findAll(): Promise<PostInterface[]> {
    const posts = await Post.find().populate('author')
    return posts
  }

  // find post by id
  public async findById(id: string): Promise<PostInterface | null> {
    const post = await Post.findById(id).populate('author')
    return post
  }

  //  Create post
  public async createPost(post: any): Promise<PostInterface | null> {
    const newPost = new Post({
      title: post.title,
      content: post.content,
      author: post.author,
    })

    // save post to database
    const savedPost = await newPost.save()

    return savedPost
  }

  // update post by id

  public async updatePost(
    id: string,
    post: any,
  ): Promise<PostInterface | null> {
    const updatedPost = await Post.findByIdAndUpdate(id, post, {
      new: true,
    }).populate('author')

    return updatedPost
  }

  // delete post by id
  public async deletePost(id: string): Promise<PostInterface | null> {
    const deletedPost = await Post.findByIdAndDelete(id).populate('author')

    return deletedPost
  }
}

export default PostRepository
