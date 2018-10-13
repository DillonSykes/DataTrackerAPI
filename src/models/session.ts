export class Session {
  constructor(
    public session_id: string,
    public client_1: string,
    public client_2: string,
    public child_caretaker: string) {
  }
}
