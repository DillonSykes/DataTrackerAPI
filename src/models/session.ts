import {Person} from "./person";

export class Session {
  constructor(
    public session_id: string,
    public client_1: Person,
    public client_2: Person,
    public child_caretaker: Person) {
  }
}
