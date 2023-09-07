import fs from 'fs';
import { replaceDocPlaceholders } from '../utils/docModify';

interface IRHSKFile {
  rootFol?: string,
  fileName: string,

  pageHeader: string,
  leftHeader?: string,
  rightHeader?: string,
  records: { pinyin: string, hanzi: string, meaning: string }[]
}
const genReplaceHSKFile = async ({ rootFol, fileName, pageHeader, leftHeader, rightHeader, records }: IRHSKFile) => {
  try {
    const totalItems = records.length;
    if (totalItems > 100) throw new Error(`Total records are more than 100`);

    const templateLoc = `./templates/hsk.docx`;
    const templateBuffer = fs.readFileSync(templateLoc);


    const xlist = records;
    const placeholders: any = {
      pageHeader: pageHeader,
      leftHeader: leftHeader,
      rightHeader: rightHeader,
    };

    for (let j = 0; j < 100; j++) {
      const item = xlist[j];
      const padIndex = (j + 1).toString().padStart(2, '0');

      placeholders[`lp_${padIndex}`] = item.pinyin;
      placeholders[`lh_${padIndex}`] = item.hanzi;
      placeholders[`ly_${padIndex}`] = lowerAndTrim(item.meaning);
    }

    const hskFileBuffer = await replaceDocPlaceholders({ fileBuffer: templateBuffer, placeholders: placeholders, replacerKey: '' });

    const savedLocation = [rootFol, `${fileName}.docx`].join('/');
    fs.writeFileSync(savedLocation, hskFileBuffer!);
    console.log(`>generated ${fileName}.docx`);
    return savedLocation;
  } catch (error: any) {
    console.error("@@@@@@@Error while generating HSK file::", error.message);
    console.error(error);
    return { error: true, message: error.message };
  }
}
const lowerAndTrim = (text: string) => `${text || ''}`.toLowerCase().trim();

export { genReplaceHSKFile };