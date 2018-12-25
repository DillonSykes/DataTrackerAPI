import * as logger from "winston";

export class ObjectUtils {
  public static mapEmptyStrings(obj: any): any {
    Object.keys(obj).forEach(key => {
      if (obj[key] && typeof obj[key] === "object") {
        ObjectUtils.mapEmptyStrings(obj[key]);
      } else if (obj[key] === "") {
        logger.debug("Deleting" + obj[key]);
        delete obj[key];
      }
    });
  }
  public static isEmptyObject(obj: any): boolean {
    for (const prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        return false;
      }
    }
    return true;
  }
}
