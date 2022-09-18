import axios from 'axios';
import { load } from 'cheerio';
import {
  DISH_IDX_TO_KEY,
  URL_MENU,
  DAY_IDX_TO_KEY,
} from '../helpers/ruHelpers.js';

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

  return new Promise(resolve => {
    request(URL_MENU, (err, res, body) => {
      if (err) {
      } else {
        for (let i = 1; i < test.length; i += 2) {
          let dx = DAY_IDX_TO_KEY[(i + 1) / 2 - 1];
          menu[dx] = {};

          const table = test[i].children[1].children[0].next.children;

          for (let j = 1; j < table.length; j += 2) {
            let mx = DISH_IDX_TO_KEY[(j + 1) / 2 - 1];
            menu[dx][mx] = table[j].children[1].data.replace(': ', '');
          }
        }
        resolve(menu);
      }
    });
  });
}
