import fs from 'fs';
import { hsk_list } from './data/hsk_6';
import { createCSV } from './utils/createCSV';
const randomizeList = (list: any[]) => list.sort(() => (Math.random() > .5) ? 1 : -1);

const main = async () => {
  try {
    const main_list = hsk_list;
    const records = main_list.slice(0, 250);
    const totalItems = records.length;

    const xlist = records;  // records.slice(200, 300);
    console.log(">total records<", xlist.length);
    // randomizeList(xlist);

    const root_fol = `docs`;
    const file_name = `FengHao DouLuo I`;
    const file_location = `${root_fol}/${file_name}.txt`;


    
    let file_content = '';
    for (let i = 0; i < xlist.length; i++) {
      const item = xlist[i];
      item.slNo = i + 1;
      
      file_content += [item.meaning, item.hanzi].join('?') + '\n';
    }

    fs.writeFileSync(file_location, file_content);
  } catch (error: any) {
    console.error(error);
  }
  console.log(">completed");
  // process.exit();
}

main();