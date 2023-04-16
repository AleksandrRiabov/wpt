import { useMemo } from "react";
import { GetDaysDataResponse } from "../state/types";

type Categories = {
  [category: string]: string[];
};

const useGetCategories = (
  data: GetDaysDataResponse[] | undefined
): Categories => {
  const categories = useMemo(() => {
    if (!data) return {};
    // Create an empty object to store the categories and their corresponding products.
    const result: Categories = {};

    for (const day of data) {
      for (const product of day.products) {
        // If the product's category does not exist in the result dictionary, create a new key for it and add the product name to its value array.
        if (!result[product.category]) {
          result[product.category] = [product.name];
        }
        // If the product's category already exists in the result dictionary but the product name is not yet included in the value array, add it to the array.
        else if (!result[product.category].includes(product.name)) {
          result[product.category].push(product.name);
        }
      }
    }
    // Return the resulting object of categories and their corresponding products.
    return result;
  }, [data]);

  return categories;
};

export default useGetCategories;
