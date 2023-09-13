import fs from 'fs';
import { createHSKFile } from './helpers/createHSKFile';

import { hsk_list } from './data/hsk_5';
import { genReplaceHSKFile } from './helpers/genReplaceHSKFile';

const randomizeList = (list: any[]) => list.sort(() => (Math.random() > .5) ? 1 : -1);

const main = async () => {
  try {
    const main_list = hsk_list;
    const records = main_list.slice(400, 600);
    const totalItems = records.length;

    // randomizeList(records);
    const xlist1 = records.slice(0, 100);
    const xlist2 = records.slice(100, 200);
    const prefix = `_random_1_`;
    console.log(">total items", xlist1.length);
    const fileResp1 = await genReplaceHSKFile({ records: xlist1, rootFol: 'replaced', fileName: `${prefix}jian_douluo_I`, pageHeader: '剑斗罗', leftHeader: '【斗罗零】', rightHeader: '【斗罗一】' });

    console.log(">total items", xlist2.length);
    const fileResp2 = await genReplaceHSKFile({ records: xlist2, rootFol: 'replaced', fileName: `${prefix}jian_douluo_II`, pageHeader: '剑斗罗', leftHeader: '【斗罗二】', rightHeader: '【斗罗三】' });
    console.log(fileResp1, fileResp2);
  } catch (error) {
    console.error(error);
  }
  console.log(">completed");
  // process.exit();
}

main();