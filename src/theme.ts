import { useState, createContext, useMemo } from "react";
import { createTheme, PaletteMode } from "@mui/material";

export const tokens = (mode: PaletteMode) => ({
  ...(mode === "dark"
    ? {
        primary: {
          100: "#dcccce",
          200: "#b9999d",
          300: "#95666d",
          400: "#72333c",
          500: "#4f000b",
          600: "#3f0009",
          700: "#2f0007",
          800: "#200004",
          900: "#100002",
        },
        secondary: {
          100: "#e3ccd4",
          200: "#c799a8",
          300: "#aa667d",
          400: "#8e3351",
          500: "#720026",
          600: "#5b001e",
          700: "#440017",
          800: "#2e000f",
          900: "#170008",
        },
        lightBlue: {
          100: "#f5d3dd",
          200: "#eba7bc",
          300: "#e27c9a",
          400: "#d85079",
          500: "#ce2457",
          600: "#a51d46",
          700: "#7c1634",
          800: "#520e23",
          900: "#290711",
        },
        teal: {
          100: "#ffe5dc",
          200: "#ffccb9",
          300: "#ffb297",
          400: "#ff9974",
          500: "#ff7f51",
          600: "#cc6641",
          700: "#994c31",
          800: "#663320",
          900: "#331910",
        },
        white: {
          100: "#ffebdd",
          200: "#ffd7bb",
          300: "#ffc398",
          400: "#ffaf76",
          500: "#ff9b54",
          600: "#cc7c43",
          700: "#995d32",
          800: "#663e22",
          900: "#331f11",
        },
      }
    : {
        primary: {
          100: "#100002",
          200: "#200004",
          300: "#2f0007",
          400: "#3f0009",
          500: "#4f000b",
          600: "#72333c",
          700: "#95666d",
          800: "#b9999d",
          900: "#dcccce",
        },
        secondary: {
          100: "#170008",
          200: "#2e000f",
          300: "#440017",
          400: "#5b001e",
          500: "#720026",
          600: "#8e3351",
          700: "#aa667d",
          800: "#c799a8",
          900: "#e3ccd4",
        },
        lightBlue: {
          100: "#290711",
          200: "#520e23",
          300: "#7c1634",
          400: "#a51d46",
          500: "#ce2457",
          600: "#d85079",
          700: "#e27c9a",
          800: "#eba7bc",
          900: "#f5d3dd",
        },
        teal: {
          100: "#331910",
          200: "#663320",
          300: "#994c31",
          400: "#cc6641",
          500: "#ff7f51",
          600: "#ff9974",
          700: "#ffb297",
          800: "#ffccb9",
          900: "#ffe5dc",
        },
        white: {
          100: "#331f11",
          200: "#663e22",
          300: "#995d32",
          400: "#cc7c43",
          500: "#ff9b54",
          600: "#ffaf76",
          700: "#ffc398",
          800: "#ffd7bb",
          900: "#ffebdd",
        },
      }),
});

export const getDesignTokens = (mode: PaletteMode) => {
  const colors = tokens(mode as PaletteMode);

  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            prmary: {
              main: colors.primary[500],
            },
            secondary: {
              main: colors.secondary[500],
            },
            neutral: {
              dark: colors.lightBlue[700],
              main: colors.lightBlue[500],
              light: colors.lightBlue[100],
            },
            background: {
              default: colors.primary[500],
            },
          }
        : {
            prmary: {
              main: colors.primary[100],
            },
            secondary: {
              main: colors.teal[500],
            },
            neutral: {
              dark: colors.lightBlue[700],
              main: colors.lightBlue[500],
              light: colors.lightBlue[100],
            },
            background: {
              default: colors.white[700],
            },
          }),
    },
    typography: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};

// React Context for the Color Mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState<PaletteMode>("dark");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  // Update the theme only if the mode changes
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return [theme, colorMode];
};
