import { createTheme } from "@mui/material/styles"

const theme = createTheme({
  components: {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            backgroundColor: "primary",
          },
        },
      },
    },
  },
})

export default theme
