import { KeyboardReturn } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

type PageHeaderTypes = {
  title: string;
};

const PageHeader = ({ title }: PageHeaderTypes) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        paddingTop: { lg: "20px" },
      }}
    >
      <Button
        onClick={() => navigate(-1)}
        variant="contained"
        color={"secondary"}
      >
        <KeyboardReturn
          sx={{
            color: "primary.contrastText",
            cursor: "pointer",
          }}
        />
      </Button>
      <Typography sx={{ marginLeft: "50px" }} variant="h4">
        {title}
      </Typography>
    </Box>
  );
};

export default PageHeader;
