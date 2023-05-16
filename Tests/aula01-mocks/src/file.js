const { readFile } = require('fs/promises');

const User = require('./user');
const { error } = require('./constants');

const DEFAULT_OPTION = {
  maxLines: 3,
  fields: ['id','name','profession','age']
}

class File {
  static async csvToJSON(filePath) {
    const content = await readFile(filePath, 'utf-8');
    const validation = File.isValid(content);

    if(!validation.valid) throw new Error(validation.error);

    const users = File.parseCSVToJSON(content);
    return users;
  }

  static isValid(csvString, options = DEFAULT_OPTION) {
    const [header, ...fileWithoutHeader] = csvString.split(/\r?\n/).map((srt) => srt.replace(/\r/g, ''));

    const isHeaderValid = header === options.fields.join(',');

    if(!isHeaderValid) {
      return {
        error: error.FILE_FIELDS_ERROR_MESSAGE,
        valid: false
      }
    }

    const isContentLengthAccepted = (
      fileWithoutHeader.length > 0 &&
      fileWithoutHeader.length <= options.maxLines
    )

    if(!isContentLengthAccepted) {
      return {
        error: error.FILE_LENGTH_ERROR_MESSAGE,
        valid: false
      }
    }

    return { valid: true }
  }

  static parseCSVToJSON(csvString) {
    const lines = csvString.split(/\r?\n/);
    const firsLine = lines.shift();
    const header = firsLine.split(',');

    const users = lines.map(line => {
      const columns = line.split(',');
      const user = {};

      for(const index in columns) {
        user[header[index]] = columns[index].trim();
      }
      
      return new User(user);
    });

    return users
  }
}

module.exports = File