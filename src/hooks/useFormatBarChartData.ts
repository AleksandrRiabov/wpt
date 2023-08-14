import { useMemo } from "react";
import { GetDaysDataResponse } from "../state/types";

type Props = {
  data: GetDaysDataResponse[] | undefined;
  checkedProducts: string[];
};

const useFormatBarChartData = ({ data, checkedProducts }: Props) => {
  const chartData = useMemo(() => {
    type Totals = {
      [key: string]: { cases: number; pallets: number };
    };

    let totalsForThePeriod: Totals = {};

    data?.forEach(({ products }) => {
      products.forEach((product) => {
        if (
          checkedProducts.includes(product.name) ||
          checkedProducts.includes(product.category) ||
          !checkedProducts.length
        ) {
          if (!totalsForThePeriod[product.name]) {
            totalsForThePeriod[product.name] = { cases: 0, pallets: 0 };
          }

          totalsForThePeriod[product.name] = {
            cases:
              totalsForThePeriod[product.name].cases + Number(product.cases),
            pallets:
              totalsForThePeriod[product.name].pallets +
              Number(product.pallets),
          };
        }
      });
    });

    return Object.keys(totalsForThePeriod).map((product) => {
      const { cases, pallets } = totalsForThePeriod[product];
      const casesPerPallet = isNaN(cases / pallets) // If 0 cases and 0 pallets, avoid 0 devide by 0
        ? 0
        : Math.round(cases / pallets);
      return { name: product, casesPerPallet };
    });
  }, [data, checkedProducts]);

  return chartData;
};

export default useFormatBarChartData;
