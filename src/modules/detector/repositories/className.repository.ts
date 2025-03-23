import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { ModelRepository } from 'src/shared/database/model.repository';

import { ClassNameEntity } from '../domain/entities';
import { ClassNameMapper } from '../domain/mappers';
import { ClassName, ClassNameDocument } from '../schemas';

export class ClassNameRepository extends ModelRepository<ClassNameDocument, ClassNameEntity> {
  constructor(
    @InjectModel(ClassName.name)
    private readonly classNameModel: Model<ClassNameDocument>,
    private readonly classNameyMapper: ClassNameMapper,
  ) {
    super(classNameModel, classNameyMapper);
  }
}
