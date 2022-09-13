export type TLocation<T extends object = {}> =
{
  pathname: string,
  state: object & T,
  search: string,
  hash: string,
  key?: string | undefined,
}

export type TIngredient = {
  calories: number
  carbohydrates: number
  fat: number
  image: string;
  image_large: string;
  image_mobile: string;
  listId: string;
  name: string;
  price: number
  proteins: number
  type: string;
  __v: number
  _id: string;
}

export type TBurgerDetails = {
  createdAt: string;
  ingredients: any;
  name: string;
  number: number;
  status: string;
  updatedAt: string;
  _id: string;
}