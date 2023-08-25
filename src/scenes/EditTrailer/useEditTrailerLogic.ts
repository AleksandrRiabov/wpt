import { useParams } from "react-router-dom";
import {
  useGetOptionsDataQuery,
  useGetTrailersDataQuery,
} from "../../state/api";
import { useEffect, useState } from "react";
import { GetTrailersDataResponse } from "../../state/types";

const useEditTrailerLogic = () => {
  const { id } = useParams();

  // Fetch trailer data based on the 'id'
  const {
    data,
    isLoading: isLoadingTrailerData,
    isError: isErrorTrailerData,
  } = useGetTrailersDataQuery(`_id=${id}`);
  const trailer = data && data[0]; // Extract the first trailer object from the fetched data

  // Define the state variable 'editTrailerData' and initialize it with the fetched trailer object
  const [editTrailerData, setEditTrailerData] = useState<
    GetTrailersDataResponse | undefined
  >(trailer);

  useEffect(() => {
    // Update 'editTrailerData' whenever 'trailer' changes
    setEditTrailerData(trailer);
  }, [trailer]);

  // Fetch options data
  const {
    data: options,
    isLoading: isLoadingOptions,
    isError: isErrorOptions,
  } = useGetOptionsDataQuery();

  // Handle changes in input fields
  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (!editTrailerData) return;
    setEditTrailerData({ ...editTrailerData, [e.target.name]: e.target.value });
  };

  // Handle changes in the extra cost fields
  const handleExtraCostChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (!editTrailerData) return;
    setEditTrailerData({
      ...editTrailerData,
      extraCost: {
        ...editTrailerData.extraCost,
        [e.target.name]: {
          ...editTrailerData.extraCost[e.target.name],
          cost: parseInt(e.target.value),
        },
      },
    });
  };

  // Handle checkbox changes
  const handleCheckbox = (name: "alcohol" | "cert") => {
    if (!editTrailerData) return;
    setEditTrailerData({ ...editTrailerData, [name]: !editTrailerData[name] });
  };

  // Handle date changes
  const handleDateChange = (
    key: "sentDate" | "deliveryDate" | "clearance" | "received",
    date: Date | null
  ) => {
    if (!editTrailerData) return;
    setEditTrailerData({ ...editTrailerData, [key]: date });
  };

  // Handle changes in product details
  const handleProductChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    editingProduct: string
  ) => {
    if (!editTrailerData) return;
    const { name, value } = e.target;

    const cleanValue = !value.length ? " " : parseInt(value.trim());
    if (!cleanValue) return;

    const foundProductIndex = editTrailerData.products.findIndex(
      (product) => product.name === editingProduct
    );
    if (foundProductIndex === -1) return;

    const updatedProduct = {
      ...editTrailerData.products[foundProductIndex],
      [name]: cleanValue,
    };

    const newProducts = [...editTrailerData.products];
    newProducts[foundProductIndex] = updatedProduct;

    setEditTrailerData({
      ...editTrailerData,
      products: newProducts,
    });
  };

  // Add a new product
  const addProduct = (product: {
    name: string;
    pallets: number;
    cases: number;
    category: string;
  }) => {
    if (!editTrailerData) return;

    const productExist = editTrailerData?.products.find(
      (existingProd) => product.name === existingProd.name
    );
    if (productExist) {
      alert(
        `${product.name} already exists, please change the value of the existing product`
      );
      return;
    }

    setEditTrailerData({
      ...editTrailerData,
      products: [...editTrailerData.products, product],
    });
  };

  // Remove a product
  const handleRemoveProduct = (name: string) => {
    if (!editTrailerData) return;
    const filteredProducts = editTrailerData.products.filter(
      (product) => product.name !== name
    );

    setEditTrailerData({
      ...editTrailerData,
      products: filteredProducts,
    });
  };

  // Return all the variables and functions as part of the hook's API
  return {
    id,
    isLoadingOptions,
    editTrailerData,
    options,
    isErrorOptions,
    isLoadingTrailerData,
    isErrorTrailerData,
    trailer,
    handleChange,
    handleDateChange,
    handleCheckbox,
    handleExtraCostChange,
    addProduct,
    handleRemoveProduct,
    handleProductChange,
  };
};

export default useEditTrailerLogic;
