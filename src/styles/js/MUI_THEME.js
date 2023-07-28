import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a Material UI theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#EB7017",
    },

    secondary: {
      main: "#24272E",
    },

    error: {
      main: red.A400,
    },

    gray20: {
      main: "#DDDFE4",
    },

    success: {
      main: "#0BCB58",
    },

    white: {
      main: "#fff",
    },

    F6F8FB: {
      main: "#F6F8FB",
    },

    gray10: {
      main: "F4F4F6",
    },
  },
  typography: {
    fontSize: 12,
    fontFamily: ["Mulish", "Open Sans"].join(","),
  },
});

export default theme;
