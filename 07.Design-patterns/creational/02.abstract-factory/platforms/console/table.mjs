import chalkTable from 'chalk-table';
import chalk from 'chalk';

import TableComponent from "../../shared/base/tableComponent.mjs"
import { isEven } from "../../utils/isEven.mjs";

export default class TableConsoleComponent extends TableComponent {
  render(data) {
    const columns = this.prepareData(data);

    const options = {
      leftPad: 2,
      columns,
    }

    const table = chalkTable(options, data);
    console.log(table);
  }

  /**
   * 
   * @param {Array<any>} data 
   * @returns {Array<{field: string, name: string}>}
   */
  prepareData(data) {
    const [firstItem] = data;
    const headers = Object.keys(firstItem)

    const columns = headers.map((item, index) => ({
      field: item,
      name: this.formatHeader(item.toUpperCase(), index)
    }));

    return columns;
  }

  /**
   * @param {String} header 
   * @param {Number} index 
   */
  formatHeader(header, index) {
    return isEven(index) ? chalk.yellow(header) : chalk.green(header);
  }
}