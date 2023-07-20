import { useCallback, useEffect } from "react";
import { DataRow } from "../types";
import {
  GetDaysDataResponse,
  GetOptionsDataResponse,
} from "../../../state/types";
import { getEstimates, palletsToTrailers } from "./helpers";

type Props = {
  options: GetOptionsDataResponse | undefined;
  day: GetDaysDataResponse;
  setTableData: React.Dispatch<React.SetStateAction<DataRow[]>>;
  dayData: GetDaysDataResponse[] | undefined;
};

function useEditableProductsLogic({
  options,
  day,
  dayData,
  setTableData,
}: Props) {
  // Go through the options (possible products) and if it exist on current day then keep the value of current day,
  //  if not exist on requested day then format with empty values
  const combinedData = useCallback(() => {
    if (!options?.products) {
      return [];
    }

    return options?.products.map((optionProduct) => {
      const existingProduct = day.products?.find(
        (product) =>
          product.name.toLowerCase() === optionProduct.name.toLowerCase()
      );
      if (existingProduct) {
        return {
          ...existingProduct,
          calculatedCases: 0,
          calculatedPallets: 0,
          trailers: 0,
          expectedTrailers: 0,
          category: optionProduct.category,
        };
      } else {
        const newProduct = {
          name: optionProduct.name,
          cases: "",
          pallets: "",
          category: optionProduct.category,
          expectedCases: 0,
          coefficient: 0,
          calculatedPallets: 0,
          calculatedCases: 0,
        };
        return newProduct;
      }
    });
  }, [options?.products, day.products]);

  // UseEffect to calculate estimates if day changed
  useEffect(() => {
    if (!dayData || !options || !combinedData) return;

    setTableData(getEstimates(combinedData()));
  }, [dayData, options, combinedData, setTableData]);

  // =============   HANDLE UPDATE TABLE DATA =========
  const updateProduct = useCallback(
    ({
      name,
      pallets,
      cases,
    }: {
      name: string;
      pallets: number | string;
      cases: number | string;
    }) => {
      const updateData = (tableData: DataRow[]): DataRow[] => {
        const currentProduct = tableData.find(
          (product) => product.name === name
        );

        if (!currentProduct) {
          // Handle error when current product is not found
          console.error(`Product with name ${name} not found.`);
          return tableData; // Return the original dayData unchanged
        }

        const updatedProduct = {
          ...currentProduct,
          cases,
          pallets,
          trailers: palletsToTrailers(+pallets),
        };

        const updatedData = tableData.map((product) =>
          product.name === name ? updatedProduct : product
        );

        return updatedData;
      };

      setTableData((prevState) => getEstimates(updateData(prevState)));
    },
    [setTableData]
  );

  return { combinedData, updateProduct };
}

export default useEditableProductsLogic;
