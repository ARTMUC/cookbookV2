declare const orderQueryOptions: readonly ["ASC", "DESC"];
declare type orderQuery = typeof orderQueryOptions[number];
export declare class OrderQueryDto {
    order?: orderQuery;
}
export {};
