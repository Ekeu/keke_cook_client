import { v4 as uuidv4 } from 'uuid';

export const PRODUCT_TYPES = [
  { _id: uuidv4(), name: 'Cupcake' },
  { _id: uuidv4(), name: 'Number Cake' },
  { _id: uuidv4(), name: 'Letter Cake' },
  { _id: uuidv4(), name: 'Macaron' },
  { _id: uuidv4(), name: 'Brownie' },
  { _id: uuidv4(), name: 'Gateau Nature' },
];
export const PRODUCT_COLORS = [
  { _id: uuidv4(), name: 'Blanc' },
  { _id: uuidv4(), name: 'Noir' },
  { _id: uuidv4(), name: 'Jaune' },
  { _id: uuidv4(), name: 'Rouge' },
  { _id: uuidv4(), name: 'Vert' },
  { _id: uuidv4(), name: 'Bleu' },
  { _id: uuidv4(), name: 'Marron' },
];
export const PRODUCT_SHIPPING = [
  { _id: uuidv4(), name: 'Oui' },
  { _id: uuidv4(), name: 'Non' },
];
export const BROWNIE_HAS_TOPPINGS = [
  { _id: uuidv4(), name: 'Oui' },
  { _id: uuidv4(), name: 'Non' },
];
export const MULTISELECT_INTERNATIONALIZATION = {
  allItemsAreSelected: 'Tous les éléments sont sélectionnés.',
  clearSearch: 'Effacer la recherche',
  noOptions: 'Aucune option',
  search: 'Rechercher',
  selectAll: 'Tout sélectionner',
  selectSomeItems: 'Sélectionner...',
};
export const CUPCAKE_SHARES = [
  { _id: uuidv4(), name: '6 parts' },
  { _id: uuidv4(), name: '12 parts' },
  { _id: uuidv4(), name: '16 parts' },
  { _id: uuidv4(), name: '18 parts' },
  { _id: uuidv4(), name: '20 parts' },
  { _id: uuidv4(), name: '24 parts' },
  { _id: uuidv4(), name: '30 parts' },
];
export const MACARON_SHARES = [
  { _id: uuidv4(), name: '12 parts' },
  { _id: uuidv4(), name: '24 parts' },
];
export const NUMBER_LETTER_CAKE_SHARES = [
  { _id: uuidv4(), name: '6/10 parts' },
  { _id: uuidv4(), name: '10/12 parts' },
  { _id: uuidv4(), name: '12/15 parts' },
  { _id: uuidv4(), name: '18/20 parts' },
  { _id: uuidv4(), name: '20/25 parts' },
  { _id: uuidv4(), name: '38/40 parts' },
];
export const CUPCAKE_CAKE_TYPE = [
  { _id: uuidv4(), name: 'Vanille', label: 'Vanille', value: 'vanille' },
  { _id: uuidv4(), name: 'Chocolat', label: 'Chocolat', value: 'chocolat' },
  { _id: uuidv4(), name: 'Coco', label: 'Coco', value: 'coco' },
];
export const CUPCAKE_FODDER = [
  { _id: uuidv4(), name: 'Vanille', label: 'Vanille', value: 'vanille' },
  { _id: uuidv4(), name: 'Nutella', label: 'Nutella', value: 'nutella' },
  { _id: uuidv4(), name: 'Praliné', label: 'Praliné', value: 'praliné' },
  { _id: uuidv4(), name: 'Kinder', label: 'Kinder', value: 'kinder' },
  { _id: uuidv4(), name: 'Coco', label: 'Coco', value: 'coco' },
  { _id: uuidv4(), name: 'Passion', label: 'Passion', value: 'passion' },
];
export const CUPCAKE_CREAM_COLOR = [
  { _id: uuidv4(), name: 'Blanc', label: 'Blanc', value: 'blanc' },
  { _id: uuidv4(), name: 'Rose', label: 'Rose', value: 'rose' },
  { _id: uuidv4(), name: 'Bleu', label: 'Bleu', value: 'bleu' },
  { _id: uuidv4(), name: 'Vert', label: 'Vert', value: 'vert' },
  { _id: uuidv4(), name: 'Gris', label: 'Gris', value: 'gris' },
  { _id: uuidv4(), name: 'Violet', label: 'Violet', value: 'violet' },
  { _id: uuidv4(), name: 'Jaune', label: 'Jaune', value: 'jaune' },
  { _id: uuidv4(), name: 'Orange', label: 'Orange', value: 'orange' },
  { _id: uuidv4(), name: 'Rouge', label: 'Rouge', value: 'rouge' },
  { _id: uuidv4(), name: 'Noir', label: 'Noir', value: 'noir' },
];
export const MACARON_SHELL_COLOR = [
  { _id: uuidv4(), name: 'Blanc', label: 'Blanc', value: 'blanc' },
  { _id: uuidv4(), name: 'Rose', label: 'Rose', value: 'rose' },
  { _id: uuidv4(), name: 'Bleu', label: 'Bleu', value: 'bleu' },
  { _id: uuidv4(), name: 'Marron', label: 'Marron', value: 'marron' },
  { _id: uuidv4(), name: 'Noir', label: 'Noir', value: 'noir' },
];
export const MACARON_FODDER = [
  { _id: uuidv4(), name: 'Vanille', label: 'Vanille', value: 'vanille' },
  { _id: uuidv4(), name: 'Chocolat', label: 'Chocolat', value: 'nchocolatutella' },
  { _id: uuidv4(), name: 'Chocolat Praliné', label: 'Chocolat Praliné', value: 'chocolat praliné' },
  { _id: uuidv4(), name: 'Framboise', label: 'Framboise', value: 'framboise' },
  { _id: uuidv4(), name: 'Coco', label: 'Coco', value: 'coco' },
  { _id: uuidv4(), name: 'Passion', label: 'Passion', value: 'passion' },
];
export const CUPCAKE_TOPPINGS = [
  {
    _id: uuidv4(),
    name: 'Fruits rouge',
    label: 'Fruits rouge',
    value: 'fruits rouge',
  },
  {
    _id: uuidv4(),
    name: 'Fruits exothique',
    label: 'Fruits exothique',
    value: 'fruits exothique',
  },
  { _id: uuidv4(), name: 'Meringues', label: 'Meringues', value: 'meringues' },
  { _id: uuidv4(), name: 'Bonbons', label: 'Bonbons', value: 'bonbons' },
  { _id: uuidv4(), name: 'Chocolat', label: 'Chocolat', value: 'chocolat' },
  { _id: uuidv4(), name: 'Kinder', label: 'Kinder', value: 'kinder' },
  { _id: uuidv4(), name: 'Oréo', label: 'Oréo', value: 'oréo' },
  { _id: uuidv4(), name: 'Caramel', label: 'Caramel', value: 'caramel' },
];
export const NUMBER_LETTER_CAKE_CREAM = [
  { _id: uuidv4(), name: 'Vanille', label: 'Vanille', value: 'vanille' },
  {
    _id: uuidv4(),
    name: 'Pâte à tartiner',
    label: 'Pâte à tartiner',
    value: 'pâte à tartiner',
  },
  { _id: uuidv4(), name: 'Praliner', label: 'Praliner', value: 'praliner' },
];
export const NUMBER_LETTER_CAKE_BISCUIT = [
  { _id: uuidv4(), name: 'Vanille', label: 'Vanille', value: 'vanille' },
  { _id: uuidv4(), name: 'Chocolat', label: 'Chocolat', value: 'chocolat' },
  { _id: uuidv4(), name: 'Amande', label: 'Amande', value: 'amande' },
];
export const NUMBER_LETTER_CAKE_TOPPINGS = [
  {
    _id: uuidv4(),
    name: 'Fruits rouge',
    label: 'Fruits rouge',
    value: 'fruits rouge',
  },
  {
    _id: uuidv4(),
    name: 'Fruits exothique',
    label: 'Fruits exothique',
    value: 'fruits exothique',
  },
  { _id: uuidv4(), name: 'Meringues', label: 'Meringues', value: 'meringues' },
  { _id: uuidv4(), name: 'Bonbons', label: 'Bonbons', value: 'bonbons' },
  { _id: uuidv4(), name: 'Chocolat', label: 'Chocolat', value: 'chocolat' },
  { _id: uuidv4(), name: 'Kinder', label: 'Kinder', value: 'kinder' },
  { _id: uuidv4(), name: 'Oréo', label: 'Oréo', value: 'oréo' },
  { _id: uuidv4(), name: 'Macarons', label: 'Macarons', value: 'macarons' },
];
export const BROWNIE_TOPPINGS = [
  {
    _id: uuidv4(),
    name: 'Pâte à tartiner',
    label: 'Pâte à tartiner',
    value: 'pâte à tartiner',
  },
  {
    _id: uuidv4(),
    name: 'Pâte à tartiner kinder',
    label: 'Pâte à tartiner kinder',
    value: 'pâte à tartiner kinder',
  },
  {
    _id: uuidv4(),
    name: 'Pâte à tartiner Speculoos',
    label: 'Pâte à tartiner Speculoos',
    value: 'pâte à tartiner Speculoos',
  },
  { _id: uuidv4(), name: 'Kinders', label: 'Kinders', value: 'kinders' },
  {
    _id: uuidv4(),
    name: 'Caramel beurre salé',
    label: 'Caramel beurre salé',
    value: 'caramel beurre salé',
  },
  { _id: uuidv4(), name: 'Bretzel', label: 'Bretzel', value: 'bretzel' },
  {
    _id: uuidv4(),
    name: 'Chocolat blanc',
    label: 'Chocolat blanc',
    value: 'chocolat blanc',
  },
  {
    _id: uuidv4(),
    name: 'Chocolat au lait',
    label: 'Chocolat au lait',
    value: 'chocolat au lait',
  },
  {
    _id: uuidv4(),
    name: 'Ferrero rocher',
    label: 'Ferrero rocher',
    value: 'ferrero rocher',
  },
  { _id: uuidv4(), name: 'Speculoos', label: 'Speculoos', value: 'speculoos' },
];
