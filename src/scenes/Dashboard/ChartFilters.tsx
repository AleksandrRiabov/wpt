import * as React from "react";
import { Box, Checkbox, FormControlLabel } from "@mui/material";

type Categories = Record<string, string[]>;

interface Props {
  categories: Categories;
  setCheckedProducts: (products: string[]) => void;
  checkedProducts: string[];
}

const ChartFilters = ({
  categories,
  setCheckedProducts,
  checkedProducts,
}: Props) => {
  const handleProductChange =
    (category: string, product: string) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const isChecked = event.target.checked;
      const productsInCategory = categories[category];
      let updatedCheckedProducts = [...checkedProducts];
      if (isChecked) {
        updatedCheckedProducts.push(product);
        if (
          productsInCategory.every((productInCategory) =>
            updatedCheckedProducts.includes(productInCategory)
          )
        ) {
          // if all products in category are checked, also check the category
          updatedCheckedProducts.push(category);
        }
      } else {
        updatedCheckedProducts = updatedCheckedProducts.filter(
          (checkedProduct) =>
            checkedProduct !== product && checkedProduct !== category
        );
      }
      setCheckedProducts(updatedCheckedProducts);
      localStorage.setItem("checkedProducts", JSON.stringify(updatedCheckedProducts));
    };

  const handleCategoryChange =
    (category: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const isChecked = event.target.checked;
      const productsInCategory = categories[category];
      let updatedCheckedProducts = [...checkedProducts];
      if (isChecked) {
        updatedCheckedProducts.push(category, ...productsInCategory);
      } else {
        updatedCheckedProducts = updatedCheckedProducts.filter(
          (checkedProduct) =>
            !productsInCategory.includes(checkedProduct) &&
            checkedProduct !== category
        );
      }
      setCheckedProducts(updatedCheckedProducts);
      localStorage.setItem("checkedProducts", JSON.stringify(updatedCheckedProducts));
    };

  React.useEffect(() => {
    const savedCheckedProducts = localStorage.getItem("checkedProducts");
    if (savedCheckedProducts) {
      setCheckedProducts(JSON.parse(savedCheckedProducts));
    }
  },[]);

  return (
    <Box sx={{ position: "absolute" }}>
      {Object.entries(categories).map(([category, products]) => (
        <div key={category}>
          <FormControlLabel
            control={
              <Checkbox
                checked={checkedProducts.includes(category)}
                onChange={handleCategoryChange(category)}
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
                    checked={checkedProducts.includes(product)}
                    onChange={handleProductChange(category, product)}
                  />
                }
                label={product}
              />
            ))}
          </div>
        </div>
      ))}
    </Box>
  );
};

export default ChartFilters;
