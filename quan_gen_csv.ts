import fs from 'fs';
import { hsk_list } from './data/hsk_6';
import { createCSV } from './utils/createCSV';


const main = async () => {
  try {
    const xlimit = 25;
    // const rootFol = 'QuanZhi';
    const rootFol = 'Fashi';

    const records = hsk_list;
    console.log("@total items", records.length);
    for (let xIndex = 0; (xIndex * xlimit) < records.length; xIndex++) {
      const xlist = records.slice(xIndex * xlimit, (xIndex + 1) * xlimit);
      const csvList: any[] = xlist; // xlist.map(elm => ({ yisi: elm.meaning, hanzi: elm.hanzi }));

      const fileName = `Level_${addLeadingZero(xIndex + 1)}.csv`;
      // const csvText = handleCsvReWord(csvList);
      const csvText = handleCsvReWord(csvList);
      fs.writeFileSync(`${rootFol}/${fileName}`, csvText);

      console.log("@file", fileName);
    }
    console.log("@total items", records.length);
  } catch (error: any) {
    console.error(error);
  }
  console.log(">completed");
}


const handleCsvReWord = (list: any[]) => {
  let csvText = "";
  const xwrap = (txt: any) => `"${txt || ''}"`;
  for (let item of list) {
    csvText += `${xwrap(item.hanzi)};${xwrap(item.meaning)}\n`;
  }

  return csvText;
}

const handleFlashCard = (list: any[]) => {
  let csvText = "";
  const xwrap = (txt: any) => txt || '';// `"${txt || ''}"`;
  for (let item of list) {
    csvText += `${xwrap(item.hanzi)},${xwrap(item.meaning)}\n`;
  }

  return csvText;
}
/* --------------------------- helper function(s) --------------------------- */
const addLeadingZero = (number: number) => String(number).padStart(2, '0');
/* -------------------------------------------------------------------------- */

main();