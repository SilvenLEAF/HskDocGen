import fs from 'fs';
import docx from 'docx';
import { createHSKTable } from './createHSKTable';

const { Document, Packer, Paragraph, Table, TableCell, TableRow } = docx;


interface IHSKFile {
  topLeftHeader?: string,
  topRightHeader?: string,
  bottomLeftHeader?: string,
  bottomRightHeader?: string,
  records: { hanzi: string, pinyin: string, meaning: string }[],
}
const createHSKFile = async ({ topLeftHeader, topRightHeader, bottomLeftHeader, bottomRightHeader, records }: IHSKFile) => {
  try {
    const totalItems = records.length;

    const midPoint = 50;
    const topLeftRecords = records.slice(0, midPoint);
    const topRightRecords = records.slice(midPoint);

    // const bottomLeftRecords = records.slice(0, midPoint);
    // const bottomRightRecords = records.slice(midPoint);

    const topLeftTable = createHSKTable({ records: topLeftRecords });
    const topRightTable = createHSKTable({ records: topRightRecords });

    // const bottomLeftTable = createHSKTable({ records: bottomLeftRecords });
    // const bottomRightTable = createHSKTable({ records: bottomRightRecords });

    const docChildren: any[] = [];
    if (topLeftHeader) docChildren.push(new Paragraph({ text: topLeftHeader }));

    docChildren.push(topLeftTable);
    if (topRightHeader) docChildren.push(new Paragraph({ text: topRightHeader }));
    docChildren.push(topRightTable);

    // if (bottomLeftHeader) docChildren.push(new Paragraph({ text: bottomLeftHeader }));
    // docChildren.push(bottomLeftTable);

    // if (bottomRightHeader) docChildren.push(new Paragraph({ text: bottomRightHeader }));
    // docChildren.push(bottomRightTable);

    const docFile = new Document({ sections: [{ children: docChildren }] });

    const b64string = await Packer.toBase64String(docFile);
    const fileBuffer = Buffer.from(b64string, 'base64');
    return fileBuffer;

    // const docLoc = `./docs/HSK_0.docx`;
    // fs.writeFileSync(docLoc, fileBuffer);

    // Packer.toBuffer(docFile).then((buffer) => {
    //   fs.writeFileSync("docs/DOX_Not_Working.docx", buffer);
    // });
  } catch (error) {
    console.error(error);
  }
}

export { createHSKFile };