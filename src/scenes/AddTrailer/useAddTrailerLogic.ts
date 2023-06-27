import { useEffect, useState } from "react";
import {
  useCreateTrailerMutation,
  useGetOptionsDataQuery,
} from "../../state/api";
import { getSuggestedDeliveryDate } from "../../helpers";
import { generateJcarrionReference } from "./helpers";
import useValidateNewTrailer from "./useValidateNewTrailer";
import { FormState } from "./types";
import { Product } from "../../state/types";

const initialFormState: Omit<FormState, "products"> = {
  reference: "",
  trailerNumber: "",
  loadType: "",
  contractor: "JCARRION",
  sentDate: new Date(),
  deliveryDate: getSuggestedDeliveryDate(),
  freightType: "Road",
  alcohol: false,
  cert: false,
  extraCost: {
    algecirasFerry: { cost: 0 },
    rejectedBySIVEP: { cost: 0 },
    holdOver: { cost: 0 },
    nonStop: { cost: 0 },
  },
  crossed: "Tunnel",
  comments: "",
};

const useAddTrailerLogic = () => {
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [createTrailer, { isLoading, isError, isSuccess }] =
    useCreateTrailerMutation();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const {
    data: options,
    isLoading: isLoadingOptions,
    isError: isErrorOptions,
  } = useGetOptionsDataQuery();

  const {
    validateData,
    trailerNumberError,
    loadTypeError,
    productsError,
    referenceError,
  } = useValidateNewTrailer({
    trailerNumber: formState.trailerNumber,
    loadType: formState.loadType,
    products: formState.products,
    reference: formState.reference,
  });

  const handlePost = async () => {
    const isValidated = validateData();
    if (isValidated) {
      try {
        await createTrailer(formState);
        setSuccessMessage(
          `New trailer ${formState.trailerNumber} has been created.`
        );
        setFormState(initialFormState);
      } catch (error) {
        setErrorMessage("Error. Please try again later..");
        console.log(error);
      }
    }
  };

  // Generate Reference if Contractor JCARRION
  useEffect(() => {
    generateJcarrionReference({
      trailerNumber: formState.trailerNumber,
      contractor: formState.contractor,
      deliveryDate: formState.deliveryDate,
      setFormState,
    });
  }, [formState.deliveryDate, formState.trailerNumber, formState.contractor]);

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (e.target.name === "trailerNumber") {
      setFormState({
        ...formState,
        [e.target.name]: e.target.value.toUpperCase(),
      });
    } else {
      setFormState({ ...formState, [e.target.name]: e.target.value });
    }
  };

  const handleCheckbox = (name: "alcohol" | "cert") => {
    setFormState({ ...formState, [name]: !formState[name] });
  };

  const handleDateChange = (
    key: "sentDate" | "deliveryDate",
    date: Date | null
  ) => {
    setFormState({ ...formState, [key]: date });
  };

  const addProduct = (product: {
    name: string;
    pallets: number;
    cases: number;
    category: string;
  }) => {
    let newProduct: Product;

    if (formState.products) {
      const existingProduct = formState.products.find(
        (existingProduct) => product.name === existingProduct.name
      );
      newProduct = existingProduct
        ? {
            name: product.name,
            pallets: +product.pallets + +existingProduct?.pallets,
            cases: +product.cases + +existingProduct?.cases,
            category: "",
          }
        : product;

      const filteredProducts = formState.products.filter(
        (existingProduct) => product.name !== existingProduct.name
      );

      const withNewProduct = [...filteredProducts, newProduct];
      setFormState({ ...formState, products: withNewProduct });
    } else {
      const withNewProduct = formState.products
        ? [...formState.products, product]
        : [product];
      setFormState({ ...formState, products: withNewProduct });
    }
  };

  const removeProduct = (name: string) => {
    const filteredProducts = formState.products
      ? formState.products.filter((product) => product.name !== name)
      : [];
    setFormState({ ...formState, products: filteredProducts });
  };

  const handleCloseSnackbar = (name: "success" | "error") => {
    if (name === "error") {
      setErrorMessage("");
    } else {
      setSuccessMessage("");
    }
  };

  return {
    formState,
    isLoading,
    isError,
    isSuccess,
    successMessage,
    errorMessage,
    options,
    isLoadingOptions,
    isErrorOptions,
    trailerNumberError,
    loadTypeError,
    productsError,
    referenceError,
    handlePost,
    handleChange,
    handleCheckbox,
    handleDateChange,
    addProduct,
    removeProduct,
    handleCloseSnackbar,
  };
};

export default useAddTrailerLogic;
