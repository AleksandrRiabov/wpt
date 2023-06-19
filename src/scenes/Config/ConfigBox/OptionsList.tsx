import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  useTheme,
} from "@mui/material";
import { GridDeleteIcon } from "@mui/x-data-grid";
import { tokens } from "../../../theme";

type Props = {
  options: string[];
  handleRemove: (option: string) => void;
};

// Renders a list of options with a delete button for each option.
function OptionsList({ options, handleRemove }: Props) {
  const { palette } = useTheme();
  const colors = tokens(palette.mode);

  return (
    <List
      sx={{
        maxHeight: "445px",
        overflowY: "auto",
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
  );
}

export default OptionsList;
