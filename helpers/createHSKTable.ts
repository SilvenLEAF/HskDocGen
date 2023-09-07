import {
  Paragraph,
  Table,
  TableCell,
  TableRow,
  WidthType,
} from "docx";

interface IHSKTablePayload {
  slStart?: number;
  records?: { hanzi: string; pinyin: string; meaning: string }[];
}

const createHSKTable = ({ slStart = 0, records }: IHSKTablePayload = {}) => {
  try {
    if (!records) return;

    const columnWidths = [1000, 1000, 1000, 1000];
    const xpayload = {
      columnWidths: columnWidths,
      rows: [
        new TableRow({
          children: [
            new TableCell({
              width: { size: columnWidths[0], type: WidthType.DXA },
              children: [new Paragraph("SL")],
            }),
            new TableCell({
              width: { size: columnWidths[1], type: WidthType.DXA },
              children: [new Paragraph("Pin Yin")],
            }),
            new TableCell({
              width: { size: columnWidths[2], type: WidthType.DXA },
              children: [new Paragraph("Han Zi")],
            }),
            new TableCell({
              width: { size: columnWidths[3], type: WidthType.DXA },
              children: [new Paragraph("Yi Si")],
            }),
          ],
        }),
      ],
    };

    const totalItems = records.length;
    const genParagraphInList = (text: string | number | undefined | null) => (text || text === 0 ? [new Paragraph(text + "")] : []);

    for (let i = 0; i < totalItems; i++) {
      const item = records[i];
      const slNo = ((slStart || 1) + i).toString().padStart(3, '0');
      const row = new TableRow({
        children: [
          new TableCell({
            width: { size: 1000, type: WidthType.DXA },
            children: genParagraphInList(slNo),
          }),
          new TableCell({
            width: { size: 1000, type: WidthType.DXA },
            children: genParagraphInList(item.pinyin),
          }),
          new TableCell({
            width: { size: 1000, type: WidthType.DXA },
            children: genParagraphInList(item.hanzi),
          }),
          new TableCell({
            width: { size: 1000, type: WidthType.DXA },
            children: genParagraphInList(item.meaning),
          }),
        ],
      });
      xpayload.rows.push(row);
    }

    const table = new Table(xpayload);
    return table;
  } catch (error) {
    console.error(error);
  }
};

export { createHSKTable };
