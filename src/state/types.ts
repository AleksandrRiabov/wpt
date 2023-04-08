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