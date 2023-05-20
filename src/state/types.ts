export interface GetDaysDataResponse {
  _id: string;
  date: string;
  day: string;
  products: [
    {
      name: string;
      cases: number;
      pallets: number;
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
  contractor: string;
  sentDate: Date;
  deliveryDate: Date;
  alcohol: boolean;
  cert: boolean;
  extraCost: {
    [key: string]: { cost: number } | undefined;
  };
  crossed: string;
  comments: string;
  products: {
    name: string;
    cases: number;
    pallets: number;
    category: string;
  }[];

  editedBy: [
    {
      name: String;
      date: Date;
    }
  ];
}

export interface GetOptionsDataResponse {
  freightType: string[];
  loadType: string[];
  contractor: string[];
  crossed: string[];
  products: { name: string; category: string }[];
}


export type NewTrailer = {
  reference: string;
  trailerNumber: string;
  loadType: string;
  freightType: string;
  sentDate: Date;
  deliveryDate: Date;
  alcohol: boolean;
  cert: boolean;
  extraCost: {
    [key: string]: { cost: number } | undefined;
  };
  crossed: string;
  comments: string;
  products?: {
    name: string;
    cases: number;
    pallets: number;
    category: string;
  }[];
};

export type Product = {
  name: string;
  cases: number;
  pallets: number;
  category: string;
  _id?: string;
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
