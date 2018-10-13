export class Person {
  constructor(
    public first_name: string,
    public last_name: string,
    public session_id: string,
    public date_of_birth?: string,
    public smoker?: boolean,
    public smoker_amount?: string,
    public health_concerns?: string) {}
}