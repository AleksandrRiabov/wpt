export interface GetDaysDataResponse {
  _id: string;
  date: string;
  day: string;
  products: [
    {
      name: string;
      cases: string;
      pallets: string;
      category: string;
    }
  ];
};



export type Product = {
  name: string;
  cases: string;
  pallets: string;
  category: string;
  _id: string;
};

 type EditedBy = {
  name: string;
  date: string;
  _id: string;
};

export type DaysDataResponse = {
  _id: string;
  date: string;
  day: string;
  products: Product[];
  editedBy: EditedBy[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

