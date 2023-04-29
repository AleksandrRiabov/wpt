import * as React from "react";
import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import MuiDateRangePicker from "../../components/DateRangePicker/MuiDateRangePicker";
import { DateRange } from "../../state/types";

type Categories = Record<string, string[]>;

interface Props {
  categories: Categories;
  checkedProducts: string[];
  setCheckedProducts: React.Dispatch<React.SetStateAction<string[]>>;
  onDateChange: (dateRange: DateRange) => void;
  sessionStorageKey: string;
}

const ChartFilters = ({
  categories,
  checkedProducts,
  setCheckedProducts,
  onDateChange,
  sessionStorageKey,
}: Props) => {
  const handleCategoryCheck = (selectedCategory: string) => {
    const isChecked = checkedProducts.includes(selectedCategory);
    // if the category is already checked, uncheck it
    if (isChecked) {
      setCheckedProducts(
        checkedProducts.filter((category) => category !== selectedCategory)
      );
    } else {
      // otherwise, add the category to the list of checked products and remove any products in the category that were previously checked
      const filteredProducts = checkedProducts.filter(
        (product) => !categories[selectedCategory].includes(product)
      );
      setCheckedProducts([...filteredProducts, selectedCategory]);
    }
  };

  const handleProductCheck = (selectedProduct: string, category: string) => {
    const isChecked = checkedProducts.includes(selectedProduct);
    const isCategoryChecked = checkedProducts.includes(category);

    if (isChecked || isCategoryChecked) {
      if (isCategoryChecked) {
        //If category is full, get all products from category, remove the one which was clicked on, and remove category as its not full anymore
        const allProductsInCategory = categories[category];
        const mergedCtegoryProductsWithSelected = [
          ...allProductsInCategory,
          ...checkedProducts,
        ];
        setCheckedProducts(
          mergedCtegoryProductsWithSelected.filter(
            (product) => product !== selectedProduct && product !== category
          )
        );
      } else {
        // otherwise, just remove the product from the list of checked products
        setCheckedProducts(
          checkedProducts.filter((product) => product !== selectedProduct)
        );
      }
    } else {
      // if the product and its category are not already checked, add the product to the list of checked products and check if all products in the category are now checked
      const mergedWithUpcoming = checkedProducts.concat([selectedProduct]);
      const willFullCategory = categories[category].every((product) =>
        mergedWithUpcoming.includes(product)
      );

      if (willFullCategory) {
        // if all products in the category are now checked, add the category to the list of checked products and remove any products in the category that were previously checked
        setCheckedProducts([
          ...checkedProducts.filter(
            (product) => !categories[category].includes(product)
          ),
          category,
        ]);
      } else {
        // otherwise, just add the product to the list of checked products
        setCheckedProducts([...checkedProducts, selectedProduct]);
      }
    }
  };

  return (
    <Box>
      <MuiDateRangePicker
        onDateChange={onDateChange}
        sessionStorageKey={sessionStorageKey}
      />
      {Object.entries(categories).length ? (
        Object.entries(categories).map(([category, products]) => (
          <Box key={category}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={
                    checkedProducts.includes(category) ||
                    categories[category].every(
                      (product) => checkedProducts.indexOf(product) >= 0
                    )
                  }
                  onChange={() => handleCategoryCheck(category)}
                />
              }
              label={category}
            />
            <div style={{ marginLeft: "1rem" }}>
              {products.map((product) => (
                <FormControlLabel
                  key={product}
                  control={
                    <Checkbox
                      checked={
                        checkedProducts.includes(category) ||
                        checkedProducts.includes(product)
                      }
                      onChange={() => handleProductCheck(product, category)}
                    />
                  }
                  label={product}
                />
              ))}
            </div>
          </Box>
        ))
      ) : (
        <Box>
          <Typography variant="h4">
            No Products Categories Found for the selected dates
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ChartFilters;
