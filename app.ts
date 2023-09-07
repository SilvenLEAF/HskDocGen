import fs from 'fs';
import { createHSKFile } from './helpers/createHSKFile';

import { hsk_list } from './data/hsk_5';
import { genReplaceHSKFile } from './helpers/genReplaceHSKFile';

const randomizeList = (list: any[]) => list.sort(() => (Math.random() > .5) ? 1 : -1);

const main = async () => {
  try {
    const main_list = hsk_list;
    const records = main_list.slice(0, 200);
    records.sort(() => (Math.random() > .5) ? 1 : -1);
    const totalItems = records.length;

    const xlist1 = records.slice(0, 100);
    const xlist2 = records.slice(100, 200);
    console.log(">total items", xlist1.length);
    const fileResp1 = await genReplaceHSKFile({
      rootFol: 'replaced',
      fileName: `_random_1_hun_douluo_I`, pageHeader: '魂斗罗',
      leftHeader: '【斗罗零】', rightHeader: '【斗罗一】',
      records: xlist1,
    });

    console.log(">total items", xlist2.length);
    const fileResp2 = await genReplaceHSKFile({
      rootFol: 'replaced',
      fileName: `_random_2_hun_douluo_II`, pageHeader: '魂斗罗',
      leftHeader: '【斗罗二】', rightHeader: '【斗罗三】',
      records: xlist2,
    });
    console.log(fileResp1, fileResp2);
  } catch (error) {
    console.error(error);
  }
  console.log(">completed");
  // process.exit();
}

main();