import { Document } from 'mongoose'

export default  interface Comment    extends Document {
  id: number
  author: string
  text: string
  date: Date
}
