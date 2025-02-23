import {
  ClientSession,
  Document,
  FilterQuery,
  Model,
  ProjectionType,
  QueryOptions,
  UpdateQuery,
} from 'mongoose';

import { ErrorException } from 'src/common';

import { CODES, IPaginationQuery, IPaginationResponse } from '..';
import { BaseMapper } from '../base';
import { BaseEntity } from '../base/base.entity';
import { spiltQueryAndPaginationOptions } from '../utils/pagination.util';

export class ModelRepository<T extends Document, E extends BaseEntity<T>> {
  constructor(
    protected readonly model: Model<T>,
    protected readonly mapper: BaseMapper<T, E>,
  ) {}

  async find(
    filterQuery: FilterQuery<T>,
    projection?: ProjectionType<T>,
    options?: QueryOptions<T>,
  ): Promise<E[]> {
    const docs = await this.model.find(filterQuery, projection, options).lean<T[]>().exec();

    if (docs?.length) {
      return docs.map(doc => this.mapper.toEntity(doc));
    }

    return [];
  }

  async findById(
    id: string,
    projection?: ProjectionType<T>,
    options?: QueryOptions<T>,
  ): Promise<E> {
    const doc = await this.model.findById(id, projection, options).lean<T>().exec();

    if (!doc) {
      return null;
    }

    return this.mapper.toEntity(doc);
  }

  async findOne(
    filterQuery: FilterQuery<T>,
    projection?: ProjectionType<T>,
    options?: QueryOptions<T>,
  ): Promise<E> {
    const doc = await this.model.findOne(filterQuery, projection, options).lean<T>().exec();

    if (!doc) {
      return null;
    }

    return this.mapper.toEntity(doc);
  }

  async findWithPagination(
    query: IPaginationQuery<T>,
    patternSearchProperties?: string[],
    projection?: ProjectionType<T>,
    populate?: string[],
  ): Promise<IPaginationResponse<T>> {
    const { filterQuery, paginationOptions } = spiltQueryAndPaginationOptions(query);
    const { page, perPage, direction, sortedBy } = paginationOptions;
    const numberOfSkipItems = (page - 1) * perPage;
    const numberOfLimit = perPage;
    const count = await this.model.countDocuments(filterQuery);
    const lastPage = Math.ceil(count / perPage);
    const prevPage = page - 1 <= 0 ? null : page - 1;
    const nextPage = page === lastPage ? null : page + 1;

    if (!count && page !== 1) {
      throw new ErrorException(CODES.INVALID_PAGINATION_PAGE);
    }

    if (patternSearchProperties) {
      for (const property of patternSearchProperties) {
        const key = property as keyof typeof filterQuery;
  
        if (filterQuery[key])
          filterQuery[key] = {
            $regex: filterQuery[key],
            $options: 'i',
          };
      }
    }

    const data = await this.model
      .find(filterQuery, projection)
      .populate(populate)
      .skip(numberOfSkipItems)
      .limit(numberOfLimit)
      .sort({
        [sortedBy]: direction,
      })
      .lean<T[]>()
      .exec();

    return {
      metaData: {
        count,
        perPage,
        prevPage,
        currentPage: page,
        nextPage,
        lastPage,
      },
      data,
    };
  }

  async save(entityData: unknown, session?: ClientSession): Promise<E> {
    const callback = async () => {
      const doc = new this.model(entityData);

      await doc.save({ session });

      return this.mapper.toEntity(doc);
    };

    return this.sessionHandler<E>(callback.bind(this), session);
  }

  async findByIdAndUpdate(
    id: string,
    updateQuery: UpdateQuery<T>,
    options?: QueryOptions<T>,
    session?: ClientSession,
  ): Promise<E> {
    const callback = async () => {
      const updateOption: QueryOptions<T> = { new: true, session, ...options };
      const updatedDoc = await this.model
        .findByIdAndUpdate(id, updateQuery, updateOption)
        .lean<T>()
        .exec();

      return this.mapper.toEntity(updatedDoc);
    };

    return this.sessionHandler<E>(callback.bind(this), session);
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<T>,
    updateQuery: UpdateQuery<T>,
    options?: QueryOptions<T>,
    session?: ClientSession,
  ): Promise<E> {
    const callback = async () => {
      const updateOption: QueryOptions<T> = { new: true, session, ...options };
      const updatedDoc = await this.model
        .findOneAndUpdate(filterQuery, updateQuery, updateOption)
        .lean<T>()
        .exec();

      return this.mapper.toEntity(updatedDoc);
    };

    return this.sessionHandler<E>(callback.bind(this), session);
  }

  async updateMany(
    filterQuery: FilterQuery<T>,
    updateQuery: UpdateQuery<T>,
    options?: QueryOptions<T>,
    session?: ClientSession,
  ): Promise<E[]> {
    const callback = async () => {
      const updateOption: QueryOptions<T> = { new: true, session, ...options };
      const updatedDocs = await this.model
        .findOneAndUpdate(filterQuery, updateQuery, updateOption)
        .lean<T[]>()
        .exec();

      return updatedDocs.map(doc => this.mapper.toEntity(doc));
    };

    return this.sessionHandler<E[]>(callback.bind(this), session);
  }

  async findByIdAndDelete(id: string, session?: ClientSession): Promise<E> {
    const callback = async () => {
      const deletedDoc = await this.model.findByIdAndDelete(id, session).lean<T>().exec();

      if (!deletedDoc) {
        return null;
      }

      return this.mapper.toEntity(deletedDoc);
    };

    return this.sessionHandler<E>(callback.bind(this), session);
  }

  async findOneAndDelete(
    filterQuery: FilterQuery<T>,
    options?: QueryOptions<T>,
    session?: ClientSession,
  ): Promise<E> {
    const callback = async () => {
      const deleteOption: QueryOptions<T> = { new: true, session, ...options };
      const deletedDoc = await this.model
        .findOneAndDelete(filterQuery, deleteOption)
        .lean<T>()
        .exec();

      if (!deletedDoc) {
        return null;
      }

      return this.mapper.toEntity(deletedDoc);
    };

    return this.sessionHandler<E>(callback.bind(this), session);
  }

  private async sessionHandler<U>(callback: () => Promise<U>, session?: ClientSession) {
    if (session) {
      try {
        return await callback();
      } catch {
        session.abortTransaction();
      } finally {
        session.endSession();
      }
    }

    return callback();
  }
}
