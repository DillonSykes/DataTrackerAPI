import { Session } from "../models";
import * as logger from "winston";

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
  // public newObj: object;
  static mapSessionLabels(
    obj: any,
    keyName: { [key: string]: string },
    newObj: object,
  ): object {
    let ender = {};
    Object.keys(obj).forEach(key => {
      // console.log(newObj);
      ender = { ...ender, [obj[key]]: mapObj(obj, keyName) };
    });
    return ender;
  }
  static mapArrayOfObjectsLabel(
    array: any[],
    keyName: { [key: string]: string },
    newObj: object,
  ): any[] {
    const newArray = array.map((item: any) => {
      return SessionService.mapSessionLabels(item, keyName, newObj);
    });
    return newArray;
  }
}
function mapObj(obj: any, keyName: any): any {
  let newObj = {};
  Object.keys(obj).forEach(key => {
    if (obj[key] && typeof obj[key] === "object") {
      SessionService.mapSessionLabels(obj[key], keyName, newObj);
    }
    if (obj[key] && Array.isArray(obj[key])) {
      const newArray = SessionService.mapArrayOfObjectsLabel(
        obj[key],
        keyName,
        newObj,
      );
      console.log("isArray");
      newObj = { ...newObj, [obj[key]]: newArray };
    }
    if (keyName[key]) {
      newObj = { ...newObj, [keyName[key]]: obj[key] };
    }
  });
  // console.log(newObj);
  return newObj;
}
