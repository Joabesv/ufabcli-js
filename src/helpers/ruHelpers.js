// CONSTANTS
export const URL_MENU =
  'https://proap.ufabc.edu.br/nutricao-e-restaurantes-universitarios/cardapio-semanal';
export const DAY_IDX_TO_KEY = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
export const DISH_IDX_TO_KEY = [
  'lunch',
  'diner',
  'veggie',
  'garrison',
  'salad',
  'dessert',
];

export const dayIdxToKey = dx => DAY_IDX_TO_KEY[(dx + 1) / 2 - 1];
export const dishIdxToKey = mx => DISH_IDX_TO_KEY[(mx + 1) / 2 - 1];
