import { Types } from 'mongoose';

import { BoundingBoxDocument } from '../../modules/detector/schemas';


export interface IJobEvent {
  uid: Types.ObjectId;
  image: string;
}

export interface IInferenceResponseEvent {
  uid: string;
  status: string;
  results: BoundingBoxDocument[];
}
