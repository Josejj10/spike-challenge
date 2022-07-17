import { IAddress, mapAddress } from "./address.interface";

export interface IDistanceQuery {
  id: number;
  addressFrom: IAddress;
  addressTo: IAddress;
  distance: number;
  time: string;
}

export const mapDistanceQuery = (data: any): IDistanceQuery => {
  return {
    ...data,
    addressFrom: mapAddress(data.addressFrom),
    addressTo: mapAddress(data.addressTo),
  };
};
