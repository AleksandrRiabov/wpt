import { useMemo } from "react";
import { GetDaysDataResponse } from "../state/types";

type Categories = {
  [category: string]: string[];
};

const useGetCategories = (
  data: GetDaysDataResponse[] | undefined
): Categories => {
  const categories = useMemo(() => {
    if (!data) return { NoCategory: [""] };
    const result: Categories = {};

    for (const day of data) {
      for (const product of day.products) {
        if (!result[product.category]) {
          result[product.category] = [product.name];
        } else if (!result[product.category].includes(product.name)) {
          result[product.category].push(product.name);
        }
      }
    }
    return result;
  }, [data]);

  return categories;
};

export default useGetCategories;
