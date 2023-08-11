import mongoose from 'mongoose'
import CommentSchema from '../schemas/comment.schema'
import CommentInterface from '../interfaces/comment.interface'
import constantModel from '../constants//CommentModel.constant'
const CommentModel = mongoose.model<CommentInterface>(
  constantModel.COMMENT_MODEL,
  CommentSchema,
)

export default CommentModel
