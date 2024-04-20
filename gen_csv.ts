import { hsk_list } from './data/hsk_6';
import { createCSV } from './utils/createCSV';


const main = async () => {
  try {
    let xi = 0;
    let koIndex = xi;
    const main_list = hsk_list;
    const records = main_list.slice(50 * (xi - 1), 50 * xi);
    
    // -------------- generate csv file
    const totalItems = records.length;
    console.log(">total records<", totalItems);
    const csvList: any[] = records.map(elm => ({ yisi: elm.meaning, hanzi: elm.hanzi }));

    // -------------- write in file
    const rootFol = `docs/50`;
    // const fileName = `封号斗罗第五魂环`;
    const fileName = `Liu_Deng_JI_II_${addLeadingZero(koIndex)}`;
    const fileResp = await createCSV({ dataList: csvList, rootFol: rootFol, fileName: fileName });

    console.log(",fileResp", fileResp);
  } catch (error: any) {
    console.error(error);
  }
  console.log(">completed");
}



/* --------------------------- helper function(s) --------------------------- */
const addLeadingZero = (number: number) => String(number).padStart(2, '0');
const randomizeList = (list: any[]) => list.sort(() => (Math.random() > .5) ? 1 : -1);
/* -------------------------------------------------------------------------- */

main();