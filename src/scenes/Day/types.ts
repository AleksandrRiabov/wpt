export type DataRow = {
  id?: number | string;
  name: string;
  pallets: number | string;
  cases: number | string;
  trailers: string | number;
  expectedPallets: string | number;
  expectedCases: string | number;
  expectedTrailers: string | number;
  coefficient: number;
};
