/**
 * Create an object composed of the picked object properties
 * @param object The object to pick properties from
 * @param keys The keys to pick
 * @returns The picked object
 */
const pick = (object: any, keys: string[]): any => {
  return keys.reduce((obj: any, key: string) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      obj[key] = object[key];
    }
    return obj;
  }, {});
};

export default pick;
