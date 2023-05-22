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
  Typography,
  useTheme,
} from "@mui/material";
import { GridDeleteIcon } from "@mui/x-data-grid";
import CustomTextField from "../../components/CustomInputs/CustomTextField";
import { ConfigCategory } from "./Config";
import { useState } from "react";
import { Add } from "@mui/icons-material";
import { tokens } from "../../theme";

type Props = {
  configCategory: string[];
  handleRemoveOption: (
    configCategoryName: ConfigCategory,
    option: string
  ) => void;
  addOption: (configCategoryName: ConfigCategory, value: string) => void;
  name: ConfigCategory;
  title: string;
};

function ConfigBox({
  configCategory,
  handleRemoveOption,
  addOption,
  name,
  title,
}: Props) {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState({ error: false, message: "" });
  const [successMessage, setSuccessMessage] = useState("");

  const { palette } = useTheme();
  const colors = tokens(palette.mode);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue(e.target.value);
  };

  const handleAddOption = () => {
    // Display error message if the option already exists
    if (!inputValue.trim()) {
      setError({
        error: true,
        message: `Can't be empty!`,
      });
      return;
    }
    if (configCategory.includes(inputValue)) {
      setError({
        error: true,
        message: `${inputValue} already exist in ${title}..`,
      });
      return;
    }
    setError({ error: false, message: "" });
    addOption(name, inputValue);
    setSuccessMessage(`New ${title} has been added`);
    setInputValue("");
  };

  const handleCloseSnackbar = (name: "success" | "error") => {
    if (name === "error") {
      setError({ error: false, message: "" });
    } else {
      setSuccessMessage("");
    }
  };

  return (
    <Card
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        maxWidth: "370px",
        minWidth: "320px",
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
            maxHeight: "315px",
            overflow: "scroll",
            background: colors.primary[400],
          }}
        >
          {configCategory.map((option) => (
            <ListItem
              sx={{
                borderBottom: "1px dashed rgba(255, 255, 255, 0.1)",
              }}
              key={option}
              secondaryAction={
                <IconButton
                  onClick={() => handleRemoveOption(name, option)}
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
      <Box
        sx={{
          padding: "0 20px",
          marginTop: "auto",
          background: colors.primary[500],
        }}
      >
        <Box p="0 20px">
          <CustomTextField
            value={inputValue}
            label="Add Option"
            title="New"
            handleChange={handleChange}
            name={name}
          />
        </Box>
        <Box p="15px 0" display="flex" justifyContent="center">
          <Button
            onClick={handleAddOption}
            variant="contained"
            color="secondary"
          >
            Add <Add />
          </Button>
        </Box>
      </Box>

      {error.error && (
        <Snackbar
          open={error.error}
          autoHideDuration={4000}
          onClose={() => handleCloseSnackbar("error")}
        >
          <Alert severity="error"> {error.message}</Alert>
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
