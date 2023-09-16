import { hsk_list } from './data/hsk_5';
import { createCSV } from './utils/createCSV';

const randomizeList = (list: any[]) => list.sort(() => (Math.random() > .5) ? 1 : -1);

const main = async () => {
  try {
    const main_list = hsk_list;
    const records = main_list.slice(800, 1000);
    const totalItems = records.length;

    const xlist1 = records.slice(0, 100);
    // randomizeList(xlist1);
    const csvList: any[] = [];
    for (let i = 0; i < xlist1.length; i++) {
      const item = xlist1[i];
      item.slNo = i + 1;

      csvList.push({ term: item.meaning, definition: item.hanzi });
    }

    const rootFol = ``;
    const fileName = `hao_tian_douluo_ling`;
    const fileResp = await createCSV({ dataList: csvList, rootFol: rootFol, fileName: fileName });

    console.log(",fileResp", fileResp);
  } catch (error: any) {
    console.error(error);
  }
  console.log(">completed");
  // process.exit();
}

main();