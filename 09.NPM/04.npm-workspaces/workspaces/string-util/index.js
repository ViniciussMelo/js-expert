export default class StringUtil {
  /**
   * 
   * @param {String} str 
   * @returns {String}
   */
  static removeEmptySpaces(str) {
    // replace spaces by ""
    return str.replace(/\s/g, "");
  }

  /**
   * 
   * @param {String} str 
   * @returns {Boolean}
   */
  static isEmpty(str) {
    return str.length === 0;
  }
}