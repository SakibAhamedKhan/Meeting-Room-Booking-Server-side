import { FilterQuery, Query } from "mongoose";

export class QueryBuilder<T> {
  public query: Record<string, unknown>;
  public modelQuery: Query<T[], T>;

  constructor(modelQuery:any, query: Record<string, unknown>) {
    this.query = query;
    this.modelQuery = modelQuery;
  }

  search(searchableFields: string[]) {
    let searchTerm = "";
    if (this.query?.searchTerm) {
      searchTerm = this.query.searchTerm as string;
    }
    this.modelQuery = this.modelQuery.find({
      $or: searchableFields.map(
        (f) =>
          ({
            [f]: { $regex: searchTerm, $options: "i" },
          } as FilterQuery<T>)
      ),
    });
    return this;
  }

  pagination() {
    const limit: number = Number(this.query?.limit || 10);
    let skip: number = 0;
    if (this.query?.page) {
      const page: number = Number(this.query.page || 1);
      skip = Number((page - 1) * limit);
    }
    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }

  fields() {
    let fields = "";
    if (this.query?.fields) {
      fields = (this.query.fields as string).split(",").join(" ");
    }
    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }

  filtering() {
    const queryObj = { ...this.query };
    const exculdedQuery = ["searchTerm", "page", "limit", "fields"];
    exculdedQuery.forEach((exe) => delete queryObj[exe]);
    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
    return this;
  }

  async countTotal() {
    const totalQueries = this.modelQuery.getFilter();
    const total = await this.modelQuery.model.countDocuments(totalQueries);
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const totalPage = Math.ceil(total / limit);

    return {
      page,
      limit,
      total,
      totalPage,
    };
  }
}
