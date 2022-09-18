import { ArgumentParser, ArgumentTypeError } from 'argparse';

import { thisWeek } from './commands/ru.js';

let parser = new ArgumentParser({
  version: '0.0.1',
  addHelp: true,
  description: 'ufabcli - o app essencial para o rato de computacao',
});

let subparsers = parser.addSubparsers({
  tile: 'subcomands',
  dest: 'subcommand_name', // wtf
});

let ruParser = subparsers.addParser('ru', { addHelp: true });
ruParser.addArgument(['-d', '--day'], {
  action: 'store',
  type: x => {
    if (x < 0 || x > 5) {
      throw ArgumentTypeError(`${x} nao e um dia valido!`);
    } else {
      return ['mon', 'tue', 'wed', 'thu', 'fri', 'sat'][x];
    }
  },
  help: 'O dia da semana. 0 = segunda, 5 = sabado',
});
ruParser.addArgument(['-m', '--meal'], {
  action: 'store',
  type: x => {
    if (
      ['lunch', 'diner', 'veggie', 'garrison', 'salad', 'dessert'].indexOf(x) ==
      -1
    ) {
      throw ArgumentTypeError(`${x} nao e uma refeicao valida!`);
    } else {
      return x;
    }
  },
  help: 'A refeicao. Pode ser [lunch, diner, veggie, garrison, salad, dessert]',
});

const main = async () => {
  const args = parser.parseArgs();

  switch (args.subcommand_name) {
    case 'ru':
      const menu = await thisWeek();
      return menu[args.day][args.meal];
  }
};

main().then(console.log);
