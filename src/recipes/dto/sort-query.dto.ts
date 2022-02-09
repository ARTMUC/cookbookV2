import { IsEnum, IsIn, IsOptional } from 'class-validator';

const sortQueryOptions = ['createdAt', 'title'] as const;
export type sortQuery = typeof sortQueryOptions[number];
const orderQueryOptions = ['ASC', 'DESC'] as const;
export type orderQuery = typeof orderQueryOptions[number];

export class SortQueryDto {
  @IsIn(sortQueryOptions)
  sort: sortQuery;

  @IsIn(orderQueryOptions)
  order: orderQuery;
}
