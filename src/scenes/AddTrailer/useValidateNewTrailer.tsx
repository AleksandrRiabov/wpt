import { useState } from "react";
import { FormState } from "./types";

type Props = {
  trailerNumber: FormState["trailerNumber"];
  loadType: FormState["loadType"];
  products: FormState["products"];
  reference: FormState["reference"];
};

function useValidateNewTrailer({
  trailerNumber,
  loadType,
  products,
  reference,
}: Props) {
  const [trailerNumberError, setTrailerNumberError] = useState({
    error: false,
    message: "",
  });
  const [loadTypeError, setLoadTypeError] = useState({
    error: false,
    message: "",
  });
  const [productsError, setProductsError] = useState({
    error: false,
    message: "",
  });
  const [referenceError, setReferenceError] = useState({
    error: false,
    message: "",
  });

  const validateData = () => {
    let isValid = true;
    // Check if no trailer number or trailer number shorter than 3 characters
    if (!trailerNumber) {
      setTrailerNumberError({
        error: true,
        message: "Trailer number is required",
      });
      isValid = false;
    } else if (trailerNumber.length < 3) {
      setTrailerNumberError({
        error: true,
        message: "Trailer number must be at least 3 characters",
      });
      isValid = false;
    } else {
      setTrailerNumberError({ error: false, message: "" });
    }

    // Check if Load Type selected
    if (!loadType) {
      setLoadTypeError({ error: true, message: "Load Type is required" });
      isValid = false;
    } else {
      setLoadTypeError({ error: false, message: "" });
    }

    // Check if Reference Added
    if (!reference) {
      setReferenceError({ error: true, message: "Reference is required" });
      isValid = false;
    } else {
      setReferenceError({ error: false, message: "" });
    }

    //Check if at least one product has been added
    if (!products || !products.length) {
      setProductsError({ error: true, message: "Please add products" });
      isValid = false;
    } else {
      setProductsError({ error: false, message: "" });
    }
    return isValid;
  };

  return {
    validateData,
    trailerNumberError,
    loadTypeError,
    productsError,
    referenceError,
  };
}

export default useValidateNewTrailer;
