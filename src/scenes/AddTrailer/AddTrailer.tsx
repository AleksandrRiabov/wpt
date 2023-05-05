import {
  Alert,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  FormControlLabel,
  Grid,
  MenuItem,
  Snackbar,
  TextField,
} from "@mui/material";
import { PageHeader } from "../../components";
import DashboardBox from "../../components/dashboardBox/DashboardBox";
import { useEffect, useState } from "react";
import { getSuggestedDeliveryDate } from "../../helpers";
import { format } from "date-fns";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import FlexBetween from "../../components/FlexBetween/FlexBetween";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import ProductsSection from "./ProductsSection";
import { useCreateTrailerMutation } from "../../state/api";

const options = {
  loadTypes: [
    "Ambient",
    "Frozen",
    "Chill",
    "Produce",
    "Frozen / Ambient",
    "Frozen / Chill",
    "Frozen / Produce",
    "Chill / Ambient",
  ],
  freughtTypes: ["Road", "Sea", "Air"],
  crossed: ["Tunnel", "Ferry"],
  contractor: ["JCARRION", "Yusen Logistics"],
};

type Props = {};

type FormState = {
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

const AddTrailer = (props: Props) => {
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [createTrailer, { isLoading, isError, isSuccess }] =
    useCreateTrailerMutation();

  const { palette } = useTheme();
  const colors = tokens(palette.mode);

  const handlePost = async () => {
    if (formState.products) {
      await createTrailer(formState);
    }
  };

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
    const withNewProuduct = formState.products
      ? [...formState.products, product]
      : [product];
    setFormState({ ...formState, products: withNewProuduct });
  };

  const removeProduct = (name: string) => {
    const filteredProducts = formState.products
      ? formState.products.filter((product) => product.name !== name)
      : [];
    setFormState({ ...formState, products: filteredProducts });
  };

  return (
    <Container maxWidth="xl">
      <PageHeader title="Add New Trailer" />
      <DashboardBox>
        <Box p="20px">
          <Grid container spacing={3}>
            {/* Trailer Number */}
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="off"
                autoCapitalize="characters"
                name="trailerNumber"
                label="Trailer Number"
                value={formState.trailerNumber}
                fullWidth
                onChange={handleChange}
              />
            </Grid>

            {/* Load Type */}
            <Grid item xs={12} sm={6}>
              <TextField
                name="loadType"
                label="Load Type"
                value={formState.loadType}
                fullWidth
                select
                onChange={handleChange}
              >
                {options.loadTypes.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Contractor */}
            <Grid item xs={12} sm={6}>
              <TextField
                name="contractor"
                label="Contractor"
                value={formState.contractor}
                fullWidth
                select
                onChange={handleChange}
              >
                {options.contractor.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Date Pickers */}
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <FlexBetween>
                  {/* Sent Date */}
                  <DatePicker
                    label="Sent Date"
                    value={formState.sentDate}
                    onChange={(date) => handleDateChange("sentDate", date)}
                    format="dd/MM/yyyy"
                  />
                  {/* Delivery Date */}
                  <DatePicker
                    label="For Delivery"
                    value={formState.deliveryDate}
                    onChange={(date) => handleDateChange("deliveryDate", date)}
                    format="dd/MM/yyyy"
                  />
                </FlexBetween>
              </LocalizationProvider>
            </Grid>

            {/* Rereference Number */}
            <Grid item xs={12} sm={6}>
              <TextField
                name="reference"
                label="Reference"
                value={formState.reference}
                fullWidth
                onChange={handleChange}
                disabled={formState.contractor === "JCARRION" ? true : false}
              />
            </Grid>

            {/* Freight Type */}
            <Grid item xs={12} sm={6}>
              <TextField
                name="freightType"
                label="Freight Type"
                value={formState.freightType}
                fullWidth
                select
                onChange={handleChange}
              >
                {options.freughtTypes.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Alocohol */}
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={<Checkbox checked={formState.alcohol} />}
                label="Alcohol"
                onChange={() => handleCheckbox("alcohol")}
              />
            </Grid>

            {/* Certified */}
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={<Checkbox checked={formState.cert} />}
                label="Cert"
                onChange={() => handleCheckbox("cert")}
              />
            </Grid>

            {/* Crossed */}
            <Grid item xs={12} sm={6}>
              <TextField
                name="crossed"
                label="Crossed"
                value={formState.crossed}
                fullWidth
                select
                onChange={handleChange}
              >
                {options.crossed.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Comments Input */}
            <Grid item xs={12} sm={6}>
              <TextField
                name="comments"
                label="Comments"
                value={formState.comments}
                fullWidth
                multiline
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={8}>
              <ProductsSection
                addProduct={addProduct}
                removeProduct={removeProduct}
                products={formState.products}
              />
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
        </Box>
      </DashboardBox>
      {isError && (
        <Snackbar open={isError} autoHideDuration={10000} onClose={() => {}}>
          <Alert severity="error"> "Error creating trailer!"</Alert>
        </Snackbar>
      )}

      {isSuccess && (
        <Snackbar open={isSuccess} autoHideDuration={10000} onClose={() => {}}>
          <Alert severity="success">Trailer created successfully!</Alert>
        </Snackbar>
      )}
    </Container>
  );
};

export default AddTrailer;
