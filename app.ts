import fs from 'fs';
import { createHSKFile } from './helpers/createHSKFile';

import { hsk_list } from './data/hsk_5';
const main = async () => {
  try {
    const records = hsk_list;
    const totalItems = records.length;

    for (let i = 0; i * 100 < totalItems; i++) {
      const xlist = records.slice(i * 100, (i + 1) * 100);
      const hskFileBuffer = await createHSKFile({ topLeftHeader: '【第一集】', topRightHeader: '【第二季集】', records: xlist });
      const padIndex = (i + 1).toString().padStart(2, '0');

      fs.writeFileSync(`docs/HSK_${padIndex}.docx`, hskFileBuffer!);
      console.log(`HSK_${padIndex}`);
    }
  } catch (error) {
    console.error(error);
  }
  console.log(">completed");
  // process.exit();
}

main();