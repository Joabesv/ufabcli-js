import axios from 'axios';
import { load } from 'cheerio';
import { writeFile } from 'node:fs/promises';
import {
  DISH_IDX_TO_KEY,
  URL_MENU,
  DAY_IDX_TO_KEY,
  dayIdxToKey,
  dishIdxToKey,
} from '../helpers/ruHelpers.js';
import { logToFile } from '../utils/log.js';

export async function thisWeek() {
  const { data } = await axios.get(URL_MENU);

  const $ = load(data, { xmlMode: true });
  const selection = 'div.row-fluid > div > table > tbody';

  const tbody = $(selection)[0].children;
  const tablerow = tbody.filter(tr => tr.name === 'tr');
  const menu = {};
  // make sunday always empty
  menu['sun'] = {};
  DISH_IDX_TO_KEY.forEach(sumMenu => (menu['sun'][sumMenu] = null));

  // plan to refactor later but IMO it's better
  // than nested for's
  const plates = tablerow
    .map((plate, idx) => ({
      plate,
      idx,
      days: dayIdxToKey(idx),
    }))
    .filter(({ plate, days, idx }) => idx % 2 === 1)
    .map(({ plate, days, idx }) => ({ plate, days, idx }))
    .flatMap(async ({ plate, days, idx }) => {
      const tableData = plate.children[1].children;
      const foodsList = tableData.filter(list => list.name === 'ul');
      const foods = foodsList.map(el => ({
        el,
        days,
        idx,
        mx: dishIdxToKey(idx),
      }));
      return foods;
    });

  // return new Promise(resolve => {
  //   request(URL_MENU, (err, res, body) => {
  //     if (err) {
  //     } else {
  //       for (let i = 1; i < test.length; i += 2) {
  //         menu[dx] = {};

  //         const table = test[i].children[1].children[0].next.children;

  //         for (let j = 1; j < table.length; j += 2) {
  //           menu[dx][mx] = table[j].children[1].data.replace(': ', '');
  //         }
  //       }
  //       resolve(menu);
  //     }
  //   });
  // });

  return plates;
}

await thisWeek();
