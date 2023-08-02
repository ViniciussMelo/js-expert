import TableComponent from "../../shared/base/tableComponent.mjs"
import { joinLists } from "../../utils/joinLists.mjs";

export default class TableBrowserComponent extends TableComponent {
  /**
   * @param {Array<any>} data 
   */
  render(data) {
    const template = this.prepareDate(data);
    document.body.insertAdjacentHTML("afterbegin", template);
  }

  /**
   * @param {Array<any>} data 
   * @returns {String}
   */
  prepareDate(data) {
    // pegar o primeiro item data[0]
    const [firstItem] = data;
    // fazer o loop pelas keys do objeto (nome das propriedades)
    const tHeaders = Object.keys(firstItem).map(text => `<th scope=col>${text.toUpperCase()}</th>`);

    // pegar somente os values dos itens
    const tBodyValues = data
      .map(item => Object.values(item))
      .map(item => item.map(value => `<td>${value}</td>`))
      .map(tds => `<tr>${joinLists(tds)}</tr>`);

    const template = `
    <table class="table table-striped-columns">
      <thead>
        <tr>${joinLists(tHeaders)}
        </tr>
      </thead>
      <tbody>${joinLists(tBodyValues)}</tbody>
    </table>
    `

    return template;
  }
}