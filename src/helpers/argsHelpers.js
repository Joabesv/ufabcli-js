import { ArgumentTypeError } from 'argparse';
import { DAY_IDX_TO_KEY, DISH_IDX_TO_KEY } from '../commands/ru.js';
export function daysHelper(days) {
  const isDayValid = days < 0 || days > 5;

  if (isDayValid) {
    throw ArgumentTypeError(`${days} nao e um dia valido!`);
  }
  return DAY_IDX_TO_KEY[days];
}

export function mealsHelper(meal) {
  if (DISH_IDX_TO_KEY.indexOf(meal) === -1) {
    throw ArgumentTypeError(`${meal} nao e uma refeicao valida!`);
  }
  return meal;
}
