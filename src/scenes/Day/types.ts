export type DataRow = {
  id?: number | string;
  name: string;
  pallets: number | string;
  cases: number | string;
  trailers: string | number;
  expectedCases: string | number;
  expectedTrailers: string | number;
  coefficient: number;
  calculatedCases: number;
  calculatedPallets: number;
};
