import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
  useTheme,
} from "@mui/material";

import { tokens } from "../../../theme";
import { useUpdateOptionsMutation } from "../../../state/api";
import Notifications from "../../../components/Notifications/Notifications";
import OptionsList from "./OptionsList";
import OptionForm from "./OptionForm";

type Props = {
  configCategory: string[];
  name: "freightType" | "loadType" | "contractor" | "crossed" | "products";
  title: string;
};

//Renders a configuration box with a list of options, the ability to add and remove options,
// and the button to save changes
function ConfigBox({ configCategory, name, title }: Props) {
  const { palette } = useTheme();
  const colors = tokens(palette.mode);

  const [options, setOptions] = useState(configCategory);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isEdited, setIsEdited] = useState(false);

  // Set initial options from props
  useEffect(() => {
    setOptions(configCategory);
  }, [configCategory]);

  // extract function to send PUT request
  const [updateOptions, { isLoading, isSuccess, error }] =
    useUpdateOptionsMutation();

  // Sends updated details to backend
  const handleSave = async () => {
    await updateOptions({ name, options });
    setIsEdited(false);
  };

  const handleAddOption = (newOption: string) => {
    if (!newOption.trim()) {
      setErrorMessage("Can not be Empty!");
      return;
    }
    // Display error message if the option already exists
    const productExist = options.find(
      (product) => product.toUpperCase() === newOption.toUpperCase()
    );
    if (productExist) {
      setErrorMessage(`${newOption} already exist in ${title}..`);
      return;
    }

    setOptions([...options, newOption]);
    setSuccessMessage(
      `${newOption} added to ${title}. Please do not forget to SAVE THE CHANGES!`
    );

    setIsEdited(true);
  };

  const handleRemove = (option: string) => {
    const filtered = options.filter((item) => item !== option);
    setOptions(filtered);
    setSuccessMessage(`${option} has been removed from ${title}`);
    setIsEdited(true);
  };

  const handleCloseSnackbar = (name: "success" | "error") => {
    if (name === "error") {
      setErrorMessage("");
    } else {
      setSuccessMessage("");
    }
  };

  // useEffects for updating notification messages
  useEffect(() => {
    if (error) {
      if ("status" in error) {
        setErrorMessage(`Error.. could not save changes in ${title}`);
      }
    }
  }, [error, title]);

  useEffect(() => {
    if (isSuccess) {
      setSuccessMessage(`${title} details has been updated!`);
    }
  }, [isSuccess, title]);

  return (
    <Card
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        maxWidth: "370px",
        minWidth: { md: "350px" },
        borderRadius: "5px",
        overflow: "hidden",
        background: colors.primary[400],
      }}
    >
      <CardHeader
        title={<Typography variant="h3">{title}</Typography>}
        p="20px"
        sx={{ background: colors.secondary[600] }}
      />
      <CardContent sx={{ padding: 0 }}>
        <OptionsList
          options={[...options].reverse()}
          handleRemove={handleRemove}
        />
      </CardContent>
      {/* Card footer */}
      <Box
        sx={{
          padding: "0 20px",
          marginTop: "auto",
          background: colors.primary[500],
        }}
      >
        {/* Options Form / Input*/}
        <OptionForm handleAddOption={handleAddOption} />
        {/* SAVE CHANGES */}
        <Box p="15px 0" display="flex" justifyContent="center">
          <Button
            onClick={handleSave}
            variant="contained"
            color="secondary"
            disabled={isLoading || !isEdited}
          >
            {isLoading ? "PLEASE WAIT" : "SAVE CHANGES"}
          </Button>
        </Box>
      </Box>
      {/* Notifications */}
      <Notifications
        errorMessage={errorMessage}
        successMessage={successMessage}
        handleCloseSnackbar={handleCloseSnackbar}
      />
    </Card>
  );
}

export default ConfigBox;
