import React from "react";
import AddProduct from "./AddProduct";
import ProductsTable from "../../components/ProductsTable/ProductsTable";

type Product = {
  name: string;
  cases: number;
  pallets: number;
  category: string;
};

type Props = {
  products?: Product[];
  addProduct: (product: Product) => void;
  removeProduct: (name: string) => void;
};

const ProductsSection = ({ products, addProduct, removeProduct }: Props) => {
  return (
    <>
      {/* Add Products */}
      <AddProduct addProduct={addProduct} />

      {/* Render Products */}
      {products?.length ? (
        <ProductsTable products={products} removeProduct={removeProduct} />
      ) : (
        ""
      )}
    </>
  );
};

export default ProductsSection;
