import { IExtractedQueryAndPaginationOptions, IPaginationOptions } from '../interfaces';

export const spiltQueryAndPaginationOptions = <T extends IPaginationOptions>(
  query: T,
): IExtractedQueryAndPaginationOptions<T> => {
  const { page, perPage, sortedBy, direction, ...filterQuery } = query;

  return {
    paginationOptions: {
      page,
      perPage,
      sortedBy,
      direction,
    },
    filterQuery,
  };
};
