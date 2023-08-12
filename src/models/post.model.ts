import mongoose from 'mongoose'
import PostSchema from '../schemas/post.schema'
import PostInterface from '../interfaces/post.interface'
import constantModel from '../constants/PostModel.constant'

const PostModel = mongoose.model<PostInterface>(
  constantModel.POST_MODEL,
  PostSchema,
)

export default PostModel
