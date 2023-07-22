import { useMemo } from "react";
import { GetDaysDataResponse } from "../state/types";

type Props = {
  data: GetDaysDataResponse[] | undefined;
  checkedProducts: string[];
};

const useFormatChartData = ({ data, checkedProducts }: Props) => {
  const chartData = useMemo(() => {
    if (!data) return [];

    const selectedSet = new Set(checkedProducts);
    const result = [];

    for (const day of data) {
      let totalCases = 0;
      let totalPallets = 0;

      for (const product of day.products) {
        // If the product category or name is included in the selected products set, add its cases and pallets to the totals
        if (
          selectedSet.has(product.category) ||
          selectedSet.has(product.name) || 
          !checkedProducts.length
        ) {
          totalCases += Number(product.cases) || 0; // If no cases, add zero.
          totalPallets += Number(product.pallets) || 0;
        }
      }
      // If the totals are greater than 0, add the day's data to the result array and add name (Date)
      if (totalCases > 0) {
        result.push({
          cases: totalCases,
          pallets: totalPallets,
          name: day.date.slice(0, 10),
        });
      }
    }

    return result;
  }, [data, checkedProducts]);

  return chartData;
};

export default useFormatChartData;
