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

export interface ICard {
  element:TIngredient
  id:string
  moveCard:(dragIndex: number, hoverIndex: number) => void
  index:number
}

export interface IDragItem {
index: number
id: string
}

export interface IFeedIngredientRow {
  img: string;
  name: string;
  price: number;
  quan: number;
}

interface IFeedPlateOrder {
  createdAt: string;
  ingredients: Array<string>;
  name: string;
  number: number;
  status: string;
  updatedAt: string;
  _id: string;
}

export interface IFeedPlate {
  padding: string;
  order: IFeedPlateOrder;
  price: number;
  img: Array<string>;
}