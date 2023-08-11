import mongoose from 'mongoose'
import constantNumber from '../constants/number.constant'

const CommentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    minlength: constantNumber.COMMENT_CONTENT_MIN_LENGTH,
    maxlength: constantNumber.COMMENT_CONTENT_MAX_LENGTH,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

export default CommentSchema
