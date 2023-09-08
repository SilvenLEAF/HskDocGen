import fs from 'fs';
// import converter from 'json-2-csv';
const converter = require('json-2-csv');

const createCSV = async ({ dataList, fileName, rootFol, options }: { dataList: any[], fileName: string, rootFol?: string, options?: any }) => {
  try {
    if (!Array.isArray(dataList) || !dataList.length) throw new Error(`Invalid dataList! It must be an array having at least one record!`);
    const csvString = await converter.json2csv(dataList, options);

    fileName = fileName.endsWith('.csv') ? fileName : fileName + '.csv';
    const saveLocation = [rootFol, fileName].filter(Boolean).join('/');
    fs.writeFileSync(saveLocation, csvString);

    return saveLocation;
  } catch (error: any) {
    console.error(error.message);
    console.error(error);
  }
}

export { createCSV };