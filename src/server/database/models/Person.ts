import { ICity } from './City';


export interface IPerson {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  IdCity: ICity
}