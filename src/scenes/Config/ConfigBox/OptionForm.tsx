import { useState } from "react";
import { Add } from "@mui/icons-material";
import { Box, Button, TextField } from "@mui/material";

type Props = {
  handleAddOption: (newOption: string) => void;
};

const OptionForm = ({ handleAddOption }: Props) => {
  const [inputValue, setInputValue] = useState("");

  const handleBtnClick = () => {
    handleAddOption(inputValue.toUpperCase());
    setInputValue("");
  };

  return (
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
      <Button onClick={handleBtnClick} variant="contained" color="secondary">
        <Add />
      </Button>
    </Box>
  );
};

export default OptionForm;
