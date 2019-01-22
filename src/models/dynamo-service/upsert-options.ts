export class UpsertOptions<T> {
  constructor(public TableName: string, public Item: T){}
}
