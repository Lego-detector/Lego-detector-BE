import { FilterQuery } from 'mongoose';

import { SortDirection, SortedBy } from '../enum';


export interface IPaginationResponse<T> {
  data: T[];
  metaData: IPaginationMetaData;
}

export interface IPaginationMetaData {
  perPage: number;
  count: number;
  prevPage: number;
  currentPage: number;
  nextPage: number;
  lastPage: number;
}

export interface IPaginationOptions {
  page: number;
  perPage: number;
  sortedBy?: SortedBy;
  direction?: SortDirection;
}

export interface IExtractedQueryAndPaginationOptions<T extends IPaginationOptions> {
  paginationOptions: IPaginationOptions;
  filterQuery: FilterQuery<Omit<T, keyof IPaginationOptions>>;
}

export type IPaginationQuery<T> = IPaginationOptions & FilterQuery<T>;
