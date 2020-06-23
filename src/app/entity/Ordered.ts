import {Shoe} from './Shoe';
import {Client} from './Client';

export class Ordered {

  id: number;
  orderedShoes: Shoe[];
  client: Client;
  ttn: string;
  notes: string;
  status: string;
  prePayment: string;
  nameAndSurname = this.client.name + ' ' + this.client.lastName + ' ' + this.client.phone;
  address: string;
  size: number;
  postComment: string;
  nameAndSurnameNP: string;
  price: string;
  fullPayment: boolean;
  withoutTTN: boolean;

}
