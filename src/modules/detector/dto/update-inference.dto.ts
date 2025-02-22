import { PartialType } from '@nestjs/mapped-types';

import { CreateInferenceDto } from './create-inference.dto';

export class UpdateInferenceDto extends PartialType(CreateInferenceDto) {}
