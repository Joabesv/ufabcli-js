import { ArgumentError, ArgumentParser } from 'argparse';

import { thisWeek } from './commands/ru.js';
import { daysHelper, mealsHelper } from './helpers/argsHelpers.js';

const parser = new ArgumentParser({
  version: '1.0.0',
  description: 'ufabcli - o app essencial para o rato de computacao',
  add_help: true,
});

const subparsers = parser.add_subparsers({
  title: 'subcomands',
  dest: 'subcommand_name', // wtf
});

const ruParser = subparsers.add_parser('ru', { addHelp: true });

ruParser.add_argument('-d', '--day', {
  action: 'store',
  type: daysHelper,
  help: 'O dia da semana. 0 = segunda, 5 = sabado',
});

ruParser.add_argument('-m', '--meal', {
  action: 'store',
  type: mealsHelper,
  help: 'A refeicao. Pode ser [lunch, diner, veggie, garrison, salad, dessert]',
});

const main = async () => {
  try {
    const { day, meal, subcommand_name } = parser.parse_args();
    console.log({ day, meal });

    if (!subcommand_name === 'ru') {
      throw ArgumentError('O argumento passado é inválido');
    }

    const menu = await thisWeek();
    return menu[day][meal];
  } catch (err) {
    // will fall here in case, thisWeek Call fail
    throw new Error(err);
  }
};

const output = await main();
console.log(output);
