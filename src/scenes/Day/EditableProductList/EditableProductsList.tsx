import { Box } from "@mui/material";
import { DataRow } from "../types";
import EditableRow from "./EditableRow";
import { memo, useCallback, useEffect, useState } from "react";
import ProductsTableHeader from "./ProductsTableHeader";
import ProductsTableFooter from "./ProductsTableFooter";

import {
  useGetDaysDataQuery,
  useGetOptionsDataQuery,
} from "../../../state/api";
import { GetDaysDataResponse } from "../../../state/types";
import { countExpectedPallets, palletsToTrailers } from "./helpers";
import { useParams } from "react-router-dom";

type Props = {
  updateProduct: ({
    name,
    pallets,
    cases,
  }: {
    name: string;
    pallets: number;
    cases: number;
  }) => void;
};

const EditableProductsList = ({ updateProduct }: Props) => {
  const [tableData, setTableData] = useState<DataRow[] | null>(null);
  const { date } = useParams();
  // Get All Possible Products from options
  const {
    data: options,
    isLoading: loadingOptions,
    isError: optionsError,
  } = useGetOptionsDataQuery();

  // Get all products data for requested day
  const { data, refetch: refetchDayProducts } = useGetDaysDataQuery(
    `dateFrom=${date}&dateTo=${date}`
  );
  const day = data?.length ? data[0] : ({} as GetDaysDataResponse);

  console.log(day);
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
        return existingProduct;
      } else {
        const newProduct = {
          name: optionProduct.name,
          cases: "",
          pallets: "",
          category: optionProduct.category,
          expectedCases: 0,
          coefficient: 0,
        };
        return newProduct;
      }
    });
  }, [options?.products, day.products]);

  useEffect(() => {
    if (!data || !options || !combinedData) return;

    const getEstimates = () => {
      return combinedData().map((product) => {
        const { pallets, cases, coefficient, expectedCases } = product;

        const expectedCasesNumber = +cases > 0 ? +cases : expectedCases;
        const trailers = palletsToTrailers(+pallets);
        // if no actual cases useExpectedCases to predict trailers
        const expectedPallets = countExpectedPallets(
          expectedCasesNumber,
          coefficient
        );
        const expectedTrailers = palletsToTrailers(expectedPallets);

        return {
          ...product,
          trailers,
          expectedCases: expectedCasesNumber,
          expectedPallets,
          expectedTrailers,
        };
      });
    };

    setTableData(getEstimates());
  }, [data, options, combinedData]);

  console.log("render");
  return (
    <Box minWidth="600px">
      <ProductsTableHeader />
      {tableData?.map((row) => (
        <Box key={row.name}>
          <EditableRow updateProduct={updateProduct} row={row} />
        </Box>
      ))}
      <ProductsTableFooter />
    </Box>
  );
};

export default memo(EditableProductsList);
