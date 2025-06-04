/**
 * Future development feature
 *
 * QueryBuilder class for building complex queries with TypeScript type safety.
 * This class allows you to construct queries with conditions, ordering,
 * field selection, pagination, and relation inclusion.
 *
 * Usage:
 * const query = new QueryBuilder<MyEntity>()
 *  .where({ name: { contains: 'example' } })
 *
 *
 * Note: Will implement this if this going to be a real product in the future.
 *       Currently, this is just a placeholder for future development.
 */

type WhereCondition<T> = {
  [K in keyof T]?:  // Scalar filter
    | T[K]
    | T[K][]
    | {
        equals?: T[K];
        not?: T[K];
        in?: T[K][];
        notIn?: T[K][];
        contains?: T[K] extends string ? string : never;
        startsWith?: T[K] extends string ? string : never;
        endsWith?: T[K] extends string ? string : never;
        gt?: T[K] extends number | Date ? T[K] : never;
        gte?: T[K] extends number | Date ? T[K] : never;
        lt?: T[K] extends number | Date ? T[K] : never;
        lte?: T[K] extends number | Date ? T[K] : never;
      }
    // Relation filter (recursive)
    | (T[K] extends object ? { where?: WhereCondition<T[K]> } : never);
};

type OrderByCondition<T> = {
  [K in keyof T]?: "asc" | "desc";
};

type IncludeCondition<T> = {
  [K in keyof T]?:
    | boolean
    | {
        select?: Partial<Record<keyof T[K], boolean>>;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        where?: T[K] extends any[]
          ? WhereCondition<T[K][0]>
          : WhereCondition<T[K]>;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        orderBy?: T[K] extends any[]
          ? OrderByCondition<T[K][0]>
          : OrderByCondition<T[K]>;
        take?: number;
        skip?: number;
      };
};

export default class QueryBuilder<T> {
  private whereConditions: WhereCondition<T>[] = [];
  private orderByConditions: OrderByCondition<T>[] = [];
  private selectFields?: Partial<Record<keyof T, boolean>>;
  private includeRelations?: IncludeCondition<T>;
  private skipCount?: number;
  private takeCount?: number;

  where(condition: WhereCondition<T>): this {
    this.whereConditions.push(condition);
    return this;
  }

  orderBy(condition: OrderByCondition<T>): this {
    this.orderByConditions.push(condition);
    return this;
  }

  select(fields: Partial<Record<keyof T, boolean>>): this {
    this.selectFields = fields;
    return this;
  }

  skip(count: number): this {
    this.skipCount = count;
    return this;
  }

  take(count: number): this {
    this.takeCount = count;
    return this;
  }

  include(relations: IncludeCondition<T>): this {
    this.includeRelations = relations;
    return this;
  }

  build() {
    return {
      where:
        this.whereConditions.length > 0
          ? this.whereConditions.length === 1
            ? this.whereConditions[0]
            : { AND: this.whereConditions }
          : undefined,
      orderBy:
        this.orderByConditions.length > 0 ? this.orderByConditions : undefined,
      select: this.selectFields,
      include: this.includeRelations,
      skip: this.skipCount,
      take: this.takeCount,
    };
  }

  reset(): this {
    this.whereConditions = [];
    this.orderByConditions = [];
    this.selectFields = undefined;
    this.includeRelations = undefined;
    this.skipCount = undefined;
    this.takeCount = undefined;
    return this;
  }
}
