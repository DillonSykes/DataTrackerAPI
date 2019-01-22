export class DeleteOptions<T> {
  public ReturnValues: string;
  constructor(public TableName: string, public Key: T) {
    this.ReturnValues = "ALL_OLD";
  }
}
