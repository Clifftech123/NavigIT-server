//  comment interface for comment model

import { Document } from 'mongoose';

export interface Comment extends Document {
  readonly comment: string;
  readonly author: string;
  readonly date_posted: string;
}
