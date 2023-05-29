import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Snackbar,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { GridDeleteIcon } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Add } from "@mui/icons-material";
import { tokens } from "../../theme";
import { useUpdateOptionsMutation } from "../../state/api";

type Props = {
  configCategory: string[];
  name: "freightType" | "loadType" | "contractor" | "crossed" | "products";
  title: string;
};

function ConfigBox({ configCategory, name, title }: Props) {
  const { palette } = useTheme();
  const colors = tokens(palette.mode);

  const [options, setOptions] = useState(configCategory);
  const [inputValue, setInputValue] = useState("");
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

  const handleAddOption = () => {
    // Display error message if the option already exists
    if (!inputValue.trim()) {
      setErrorMessage("Can not be Empty!");
      return;
    }
    if (options.includes(inputValue)) {
      setErrorMessage(`${inputValue} already exist in ${title}..`);
      return;
    }
    setOptions([...options, inputValue]);
    setSuccessMessage(
      `${inputValue} added to ${title}. Please do not forget to Save  the Chages!`
    );
    setInputValue("");
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
        <List
          sx={{
            maxHeight: "445px",
            overflow: "scroll",
            background: colors.primary[400],
          }}
        >
          {options.map((option) => (
            <ListItem
              sx={{
                borderBottom: "1px dashed rgba(255, 255, 255, 0.1)",
                "&:hover": {
                  background: colors.primary[300],
                },
              }}
              key={option}
              secondaryAction={
                <IconButton
                  onClick={() => handleRemove(option)}
                  edge="end"
                  aria-label="delete"
                >
                  <GridDeleteIcon />
                </IconButton>
              }
            >
              <ListItemText primary={option} />
            </ListItem>
          ))}
        </List>
      </CardContent>
      {/* Card footer */}
      <Box
        sx={{
          padding: "0 20px",
          marginTop: "auto",
          background: colors.primary[500],
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignContent="center"
          p=" 10px"
        >
          <TextField
            value={inputValue}
            label="Add Option"
            size="small"
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button
            onClick={handleAddOption}
            variant="contained"
            color="secondary"
          >
            <Add />
          </Button>
        </Box>
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
      {errorMessage && (
        <Snackbar
          open={errorMessage.length > 0}
          autoHideDuration={4000}
          onClose={() => handleCloseSnackbar("error")}
        >
          <Alert severity="error"> {errorMessage}</Alert>
        </Snackbar>
      )}
      {successMessage && (
        <Snackbar
          open={successMessage.length > 0}
          autoHideDuration={6000}
          onClose={() => handleCloseSnackbar("success")}
        >
          <Alert severity="success">{successMessage}</Alert>
        </Snackbar>
      )}
    </Card>
  );
}

export default ConfigBox;
