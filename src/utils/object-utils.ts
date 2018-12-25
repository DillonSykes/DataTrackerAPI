export class ObjectUtils {
  public static mapEmptyStrings(obj: any): any {
    const newObj = { ...obj };
    Object.keys(newObj).forEach(key => {
      if (newObj[key] && typeof newObj[key] === "object") {
        ObjectUtils.mapEmptyStrings(newObj[key]);
      } else if (newObj[key] === "") {
        delete newObj[key];
      }
    });
    return newObj;
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
