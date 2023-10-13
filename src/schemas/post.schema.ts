import mongoose from 'mongoose'
import constantNumber from '../constants/number.constant'

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: constantNumber.POST_TITLE_MIN_LENGTH,
    maxlength: constantNumber.POST_TITLE_MAX_LENGTH,
  },
  content: {
    type: String,
    required: true,
    minlength: constantNumber.POST_CONTENT_MIN_LENGTH,
    maxlength: constantNumber.POST_CONTENT_MAX_LENGTH,
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

PostSchema.set('toObject', { virtuals: true })
PostSchema.set('toJSON', { virtuals: true })

PostSchema.virtual('user', {
  ref: 'User',
  localField: 'author',
  foreignField: '_id',
  justOne: true,
})

export default PostSchema
