import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Apple Chancery",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: "'Roboto', sans-serif",
        },
      },
    },
  },
});

export default theme;
