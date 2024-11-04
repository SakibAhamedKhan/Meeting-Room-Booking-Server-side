import { FilterQuery, Query, model } from "mongoose";

export class QueryBuilder<T> {
  public query: Record<string, unknown>;
  public modelQuery: Query<T[], T>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
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
    let limit: number = Number(this.query?.limit || 10);
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
    console.log("Querybuilder: ", queryObj);
    const exculdedQuery = ["searchTerm", "page", "limit", "fields"];
    exculdedQuery.forEach((exe) => delete queryObj[exe]);
    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
    return this;
  }
}
