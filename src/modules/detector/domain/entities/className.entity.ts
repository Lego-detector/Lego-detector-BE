import { BaseEntity } from 'src/shared/base/base.entity';

import { ClassNameDocument } from '../../schemas';

export class ClassNameEntity extends BaseEntity<ClassNameDocument> {
  id: number
  className: string

  constructor(classNameDoc: Partial<ClassNameDocument>) {
    super(classNameDoc as ClassNameDocument);

    Object.assign(this, classNameDoc);
  }

  toDocument(): ClassNameDocument {
    this.document.id = this.id;
    this.document.className = this.className;

    return this.document;
  }
}