export class ObjectUtils {
  public static mapEmptyStrings(obj: any): any {
    const newObj: any = {};
    Object.keys(obj).forEach((prop: any) => {
      if (obj[prop] === "") {
        { newObj[prop] = "N/A"; }
      } else {
        { newObj[prop] = obj[prop]; }
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
