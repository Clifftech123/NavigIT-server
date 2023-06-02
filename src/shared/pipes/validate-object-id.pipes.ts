import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import * as mongoose from 'mongoose';
/**
 * The `ValidateObjectId` pipe is used to validate the ID of a document in the database.
 * It checks if the ID is a valid MongoDB ObjectId.
 */
@Injectable()
export class ValidateObjectId implements PipeTransform<string> {
  async transform(value: string, metadata: ArgumentMetadata) {
    const isValidObjectId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidObjectId) {
      throw new BadRequestException('Invalid ID!');
    }
    return value;
  }
}
