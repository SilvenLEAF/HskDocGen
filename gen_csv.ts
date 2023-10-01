import { hsk_list } from './data/pure_hsk_5';
import { createCSV } from './utils/createCSV';

const randomizeList = (list: any[]) => list.sort(() => (Math.random() > .5) ? 1 : -1);

const main = async () => {
  try {
    const main_list = hsk_list;
    const records = main_list.slice(0 * 260, 5 * 260);
    const totalItems = records.length;

    const xlist1 = records;  // records.slice(200, 300);
    console.log(">total records<", xlist1.length);
    // randomizeList(xlist1);
    const csvList: any[] = [];
    for (let i = 0; i < xlist1.length; i++) {
      const item = xlist1[i];
      item.slNo = i + 1;

      csvList.push({ traditional: item.traditionalHanzi, simple: item.simplifiedHanzi });
    }

    const rootFol = `Di_Wu_Ji`;
    const fileName = `封号斗罗`;
    const fileResp = await createCSV({ dataList: csvList, rootFol: rootFol, fileName: fileName });

    console.log(",fileResp", fileResp);
  } catch (error: any) {
    console.error(error);
  }
  console.log(">completed");
  // process.exit();
}

main();