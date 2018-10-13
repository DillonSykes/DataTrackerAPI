export class GetOptions<T> {
  constructor(public TableName: string, public Key: T){}
}
