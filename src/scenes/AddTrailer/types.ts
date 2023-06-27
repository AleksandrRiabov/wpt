export type FormState = {
  reference: string;
  trailerNumber: string;
  loadType: string;
  contractor: string;
  sentDate: Date;
  deliveryDate: Date;
  freightType: string;
  alcohol: boolean;
  cert: boolean;
  extraCost: {
    algecirasFerry: { cost: number };
    rejectedBySIVEP: { cost: number };
    holdOver: { cost: number };
    nonStop: { cost: number };
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
