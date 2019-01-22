import { Session } from "../models";

export class SessionService {
  public static getClients(response: Session[]): any[] {
    const clients: any[] = [];
    response.map((session: Session) => {
      if (!session.client_2) {
        clients.push({
          id: session.session_id,
          name: session.client_1.first_name + " " + session.client_1.last_name,
        });
      } else {
        clients.push({
          id: session.session_id,
          name: session.client_1.first_name + " " + session.client_1.last_name,
        });
        clients.push({
          id: session.session_id,
          name: session.client_2.first_name + " " + session.client_2.last_name,
        });
      }
    });
    return clients;
  }
}
