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

    data &&
      data?.forEach(({ products }) => {
        products.forEach((product) => {
          if (
            checkedProducts.includes(product.name) ||
            checkedProducts.includes(product.category)
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
      return { name: product, casesPerPallet: Math.round(cases / pallets) };
    });
  }, [data, checkedProducts]);

  return chartData;
};

export default useFormatBarChartData;
