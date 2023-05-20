import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Snackbar,
  Typography,
} from "@mui/material";
import { PageHeader } from "../../components";
import DashboardBox from "../../components/dashboardBox/DashboardBox";
import { useEffect, useState } from "react";
import { getSuggestedDeliveryDate } from "../../helpers";
import { format } from "date-fns";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import ProductsSection from "./ProductsSection";
import {
  useCreateTrailerMutation,
  useGetOptionsDataQuery,
} from "../../state/api";
import useValidateNewTrailer from "./useValidateNewTrailer";
import TopSection from "./TopSection";
import MiddleSection from "./MiddleSection";
import { Product } from "../../state/types";

export type FormState = {
  reference: string;
  trailerNumber: string;
  loadType: string;
  contractor: string;
  sentDate: Date;
  deliveryDate: Date;
  freightType: string;
  alcohol: boolean;
  cert: boolean;
  extraCost: {
    algecirasFerry: { cost: number };
    rejectedBySIVEP: { cost: number };
    holdOver: { cost: number };
    nonStop: { cost: number };
  };
  crossed: string;
  comments: string;
  products?: {
    name: string;
    cases: number;
    pallets: number;
    category: string;
  }[];
};

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

const AddTrailer = () => {
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [createTrailer, { isLoading, isError, isSuccess }] =
    useCreateTrailerMutation();

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

  const { palette } = useTheme();
  const colors = tokens(palette.mode);

  const handlePost = async () => {
    const isValidated = validateData();
    if (isValidated) {
      await createTrailer(formState);
      setFormState(initialFormState);
    }
  };
  console.log("render");
  useEffect(() => {
    const { trailerNumber, contractor, deliveryDate } = formState;
    // Generate trailer reference Number. If JCARRION, Reference = Delivery Date + digets from trailer number
    if (contractor === "JCARRION" && trailerNumber.length > 7) {
      const formatedDeliveryDate = format(deliveryDate, "dd-MM-yy")
        .split("-")
        .join("");
      const newReference = `${formatedDeliveryDate}${trailerNumber.slice(
        1,
        5
      )}`;
      setFormState({ ...formState, reference: newReference });
    }
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

  return (
    <Container maxWidth="xl" sx={{ minHeight: "80vh" }}>
      <PageHeader title="Add New Trailer" />
      <DashboardBox>
        <Box p="20px">
          {isLoadingOptions ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="400px"
            >
              <Typography variant="h4">Loading Options..</Typography>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {/* TOP Section - TrailerNumber, LoadType, Contractor and Dates*/}
              <TopSection
                formState={formState}
                handleDateChange={handleDateChange}
                handleChange={handleChange}
                trailerNumberError={trailerNumberError}
                loadTypeError={loadTypeError}
                options={options}
              />

              {/* MIDDLE Section - Reference, FreightType, Alcohol/Cert, Cooments */}
              <MiddleSection
                formState={formState}
                handleChange={handleChange}
                options={options}
                handleCheckbox={handleCheckbox}
                referenceError={referenceError}
              />

              {/* {PRODUCTS Section} */}
              <Grid item xs={12} md={8}>
                <ProductsSection
                  addProduct={addProduct}
                  removeProduct={removeProduct}
                  products={formState.products}
                  options={options?.products || []}
                />
                {productsError.error ? (
                  <Box p="5px" color="red">
                    {productsError.message}
                  </Box>
                ) : (
                  ""
                )}
              </Grid>
              <Grid item xs={12}>
                {/* SUBMIT */}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handlePost}
                  disabled={isLoading}
                  sx={{ background: colors.secondary[500], width: "200px" }}
                >
                  {isLoading ? (
                    <CircularProgress
                      sx={{ color: colors.secondary[500] }}
                      size={24}
                    />
                  ) : (
                    "Create Trailer"
                  )}
                </Button>
              </Grid>
            </Grid>
          )}
        </Box>
      </DashboardBox>
      {isError && (
        <Snackbar
          open={isError || isErrorOptions}
          autoHideDuration={6000}
          onClose={() => {}}
        >
          <Alert severity="error">
            {" "}
            {isError
              ? "Error creating trailer!"
              : "Error.. Could not Load the Options"}
          </Alert>
        </Snackbar>
      )}

      {isSuccess && (
        <Snackbar open={isSuccess} autoHideDuration={6000} onClose={() => {}}>
          <Alert severity="success">Trailer created successfully!</Alert>
        </Snackbar>
      )}
    </Container>
  );
};

export default AddTrailer;
