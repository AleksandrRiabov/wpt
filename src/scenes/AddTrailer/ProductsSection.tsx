import AddProduct from "./AddProduct";
import ProductsTable from "../../components/ProductsTable/ProductsTable";
import { GetOptionsDataResponse } from "../../state/types";

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
  options: GetOptionsDataResponse["products"];
};

const ProductsSection = ({
  products,
  addProduct,
  removeProduct,
  options,
}: Props) => {
  return (
    <>
      {/* Add Products */}
      <AddProduct addProduct={addProduct} options={options} />

      {/* Render Products */}
      {products?.length && (
        <ProductsTable products={products} removeProduct={removeProduct} />
      )}
    </>
  );
};

export default ProductsSection;
