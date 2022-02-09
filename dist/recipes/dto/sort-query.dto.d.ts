declare const sortQueryOptions: readonly ["createdAt", "title"];
export declare type sortQuery = typeof sortQueryOptions[number];
declare const orderQueryOptions: readonly ["ASC", "DESC"];
export declare type orderQuery = typeof orderQueryOptions[number];
export declare class SortQueryDto {
    sort: sortQuery;
    order: orderQuery;
}
export {};
