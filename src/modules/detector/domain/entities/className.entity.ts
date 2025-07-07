
import { BaseEntity } from '../../../../shared/base';
import { ClassNameDocument } from '../../schemas';

export class ClassNameEntity extends BaseEntity<ClassNameDocument> {
  classId: number
  className: string
  label: string
  color: string

  constructor(classNameDoc: Partial<ClassNameDocument>) {
    super(classNameDoc as ClassNameDocument);

    Object.assign(this, classNameDoc);
  }

  toDocument(): ClassNameDocument {
    this.document.classId = this.classId;
    this.document.className = this.className;
    this.document.label = this.label;
    this.document.color = this.color;

    return this.document;
  }
}