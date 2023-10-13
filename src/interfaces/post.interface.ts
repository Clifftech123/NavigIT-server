// Post interface

import { Document } from 'mongoose'
import Comment from './comment.interface'

export default interface Post extends Document {
  id: number
  title: string
  content: string
  author: string
  date: Date
  comments: Comment[]
}
