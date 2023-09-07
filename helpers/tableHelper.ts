import * as fs from "fs";
import { Paragraph, Table, TableCell, TableRow, WidthType } from "docx";

const createDocTable = ({ columnWidths, rows }: any = {}) => {
  try {

    const xdocTablePayload: any = { rows: [] };
    if (columnWidths) xdocTablePayload.columnWidths = columnWidths;

    for (let row of rows) {
      // row = [{size, text}, {size, text}]

      for (let cell of row) {
        const cellPayload: any = { children: [new Paragraph(cell.text)] };
        if (cell.size) cellPayload.width = { size: cell.size, type: WidthType.DXA };
        const tableCell = new TableCell(cellPayload);

        xdocTablePayload.rows.push(tableCell);
      }
    }

    const docTable = new Table(xdocTablePayload);
    return docTable;
  } catch (error) {
    console.error(error);
  }
}

export { createDocTable };