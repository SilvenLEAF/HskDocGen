import fs from 'fs';
import { createHSKFile } from './helpers/createHSKFile';

import { hsk_list } from './data/hsk_5';
import { replaceDocPlaceholders } from './utils/docModify';
const main = async () => {
  try {
    const records = hsk_list;
    const totalItems = records.length;
    const templateLoc = `./templates/hsk.docx`;
    const templateBuffer = fs.readFileSync(templateLoc);

    for (let xi = 0; xi < totalItems; xi++) {
      const i = xi * 100;
      const xlist = records.slice(i, (xi + 1) * 100);

      const placeholders: any = {
        pageHeader: `封号斗罗`,
        leftHeader: `【第一集】`,
        rightHeader: `【第二季】`,
      };
      for (let j = 0; j < 100; j++) {
        const item = xlist[j];
        const padIndex = (j + 1).toString().padStart(2, '0');

        placeholders[`lp_${padIndex}`] = item.pinyin;
        placeholders[`lh_${padIndex}`] = item.hanzi;
        placeholders[`ly_${padIndex}`] = lowerAndTrim(item.meaning);
      }

      const hskFileBuffer = await replaceDocPlaceholders({ fileBuffer: templateBuffer, placeholders: placeholders, replacerKey: '' });

      const pageIndex = (i + 1).toString().padStart(2, '0');
      fs.writeFileSync(`replaced/HSK_${pageIndex}.docx`, hskFileBuffer!);
      console.log(`HSK_${pageIndex}`);
      break;
    }
  } catch (error) {
    console.error(error);
  }
  console.log(">completed");
  // process.exit();
}

const lowerAndTrim = (text: string) => `${text || ''}`.toLowerCase().trim();

main();