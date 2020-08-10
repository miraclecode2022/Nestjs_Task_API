import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { TaskStatus } from '../task.model';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    TaskStatus.DONE,
    TaskStatus.IN_PROGRESS,
    TaskStatus.OPEN,
  ];
  transform(value: any, metadata: ArgumentMetadata) {
    console.log('value', value);
    value = value.toUpperCase();

    if (!this.isStatusValod(value)) {
      throw new BadRequestException(`${value} is an invalid status`);
    }

    return value;
  }

  private isStatusValod(status: any) {
    const index = this.allowedStatuses.indexOf(status);
    return index !== -1;
  }
}
