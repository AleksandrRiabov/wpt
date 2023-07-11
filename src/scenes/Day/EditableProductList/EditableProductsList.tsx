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
import {
  countExpectedPallets,
  getDayTotals,
  palletsToTrailers,
} from "./helpers";
import { useParams } from "react-router-dom";
import FlexCenterCenter from "../../../components/FlexCenterCenter/FlexCenterCenter";

const EditableProductsList = () => {
  const [tableData, setTableData] = useState<DataRow[]>([] as DataRow[]);
  const { date } = useParams();
  // Get All Possible Products from options
  const {
    data: options,
    isLoading: loadingOptions,
    isError: optionsError,
  } = useGetOptionsDataQuery();

  // Get all products data for requested day
  const {
    data,
    isLoading: loadingDayData,
    refetch: refetchDayProducts,
    isError: dayDataError,
  } = useGetDaysDataQuery(`dateFrom=${date}&dateTo=${date}`);
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
        console.log("Trying to update state");
        const currentProduct = tableData.find(
          (product) => product.name === name
        );

        if (!currentProduct) {
          // Handle error when current product is not found
          console.error(`Product with name ${name} not found.`);
          return tableData; // Return the original data unchanged
        }

        const updatedProduct = {
          ...currentProduct,
          cases,
          pallets,
          trailers: palletsToTrailers(+pallets),
          expectedCases: +cases < 1 ? currentProduct.expectedCases : cases,
          expectedTrailers: palletsToTrailers(+currentProduct.expectedCases),
        };

        const updatedData = tableData.map((product) =>
          product.name === name ? updatedProduct : product
        );
        return updatedData;
      };

      setTableData((prevState) => updateData(prevState));
    },
    []
  );

  const dayTotals = getDayTotals(tableData);
  const isError = optionsError || dayDataError;
  const errorMessage =
    "Apologies for the inconvenience. We're unable to retrieve the products at the moment. The app server may be in sleep mode due to free hosting. Please wait for about 10-15 seconds. Thank you for your patience.";
  console.log("render");
  return (
    <Box minWidth="600px">
      <ProductsTableHeader />
      {loadingOptions || loadingDayData ? (
        <FlexCenterCenter height="400px">Loading...</FlexCenterCenter>
      ) : isError ? (
        <FlexCenterCenter height="400px">{errorMessage}</FlexCenterCenter>
      ) : (
        tableData?.map((row) => (
          <Box key={row.name}>
            <EditableRow updateProduct={updateProduct} row={row} />
          </Box>
        ))
      )}
      <ProductsTableFooter dayTotals={dayTotals} />
    </Box>
  );
};

export default memo(EditableProductsList);
