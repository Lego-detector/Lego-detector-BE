
import { BaseMapper } from '../../../../shared/base';
import { ClassNameDocument } from '../../schemas';
import { ClassNameEntity } from '../entities/className.entity';


export class ClassNameMapper extends BaseMapper<ClassNameDocument, ClassNameEntity> {
  toEntity(classNameDoc: ClassNameDocument): ClassNameEntity {
    return new ClassNameEntity({
      classId: classNameDoc.classId,
      className: classNameDoc.className,
      label: classNameDoc.label,
      color: classNameDoc.color
    });
  }
}
