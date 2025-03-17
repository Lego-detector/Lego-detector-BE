import { BaseMapper } from 'src/shared/base';

import { ClassNameDocument } from '../../schemas';
import { ClassNameEntity } from '../entities/className.entity';


export class ClassNameMapper extends BaseMapper<ClassNameDocument, ClassNameEntity> {
  toEntity(classNameDoc: ClassNameDocument): ClassNameEntity {
    return new ClassNameEntity({
      id: classNameDoc.id,
      className: classNameDoc.className
    });
  }
}
