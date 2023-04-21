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
}

export interface GetTrailersDataResponse {
  _id: string;
  reference: string;
  trailerNumber: string;
  received: Date | null;
  clearance: Date;
  loadType: string;
  freightType: string;
  sentDate: Date;
  deliveryDate: Date ;
  alcohol: boolean;
  cert: boolean;
  extraCost: { cost: number; comment: string };
  algecirasFerry: { cost: number };
  rejectedBySIVEP: { cost: number };
  holdOver: { days: number; cost: number };
  nonStop: { cost: Number };
  crossed: string;
  comments: string;
  products: [
    {
      name: string;
      cases: string;
      pallets: string;
      category: string;
    }
  ];
  editedBy: [
    {
      name: String;
      date: Date;
    }
  ];
}

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

export type DateRange = {
  from: Date | null;
  to: Date | null;
};
