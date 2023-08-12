import Comment from '../models/comment.model'
import CommentInterface from '../interfaces/comment.interface'


// This class is used to interact with the database and perform CRUD operations on the Comment table.
class CommentRepository {
  public async findAll(): Promise<CommentInterface[]> {
    const comments = await Comment.find().populate('author')
    return comments
  }


  /// find comment by id
  public async findById(id: string): Promise<CommentInterface | null> {
    const comment = await Comment.findById(id).populate('author')
    return comment
  }


  // Create comment
  public async createComment(comment: any): Promise<CommentInterface | null> {
    const newComment = new Comment({
      content: comment.content,
      author: comment.author,
    })


    // save comment to database
    const savedComment = await newComment.save()

    return savedComment
  }


  // update comment by id
  public async updateComment(
    id: string,
    comment: any,
  ): Promise<CommentInterface | null> {
    const updatedComment = await Comment.findByIdAndUpdate(id, comment, {
      new: true,
    }).populate('author')

    return updatedComment
  }


  // delete comment by id
  public async deleteComment(id: string): Promise<CommentInterface | null> {
    const deletedComment = await Comment.findByIdAndDelete(id).populate(
      'author',
    )

    return deletedComment
  }
}

export default CommentRepository
