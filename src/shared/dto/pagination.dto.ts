import { Transform, Type } from 'class-transformer';
import { IsEnum, IsOptional, IsPositive, IsString } from 'class-validator';
 
import { SortDirection, SortedBy } from '../enum';

export class PaginationDto {
  @IsOptional()
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @Type(() => Number)
  @IsPositive()
  page: number = 1;

  @IsOptional()
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @Type(() => Number)
  @IsPositive()
  perPage: number = 10;

  @IsOptional()
  @Type(() => Number)
  @IsEnum(SortDirection)
  direction = SortDirection.Descending;

  @IsOptional()
  @IsString()
  @IsEnum(SortedBy)
  sortedBy = SortedBy.CreatedAt;
}
