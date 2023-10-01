import fs from 'fs';
import { hsk_list } from './data/hsk_5';
const { tify, sify } = require('chinese-conv');
const randomizeList = (list: any[]) => list.sort(() => (Math.random() > .5) ? 1 : -1);

const main = async () => {
  try {
    const main_list = hsk_list;
    console.log(">total records<", main_list.length);
    // randomizeList(xlist1);
    const csvList: any[] = [];
    for (let i = 0; i < main_list.length; i++) {
      const item = main_list[i];
      item.slNo = i + 1;

      const traditionalHanzi = tify(item.hanzi);
      csvList.push({ slNo: item.slNo, traditionalHanzi: traditionalHanzi, simplifiedHanzi: item.hanzi, meaning: item.meaning });
    }

    const rootFol = `data/pure_hsk_5.ts`;
    fs.writeFileSync(rootFol, JSON.stringify(csvList));
  } catch (error: any) {
    console.error(error);
  }
  console.log(">completed");
  // process.exit();
}

main();