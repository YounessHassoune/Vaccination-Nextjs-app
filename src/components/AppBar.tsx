import { Toolbar, Typography, AppBar } from "@mui/material"
import React, { FC } from "react"

type props = {
  title: string
}
const CustomAppBar: FC<props> = ({ title }) => (
  <AppBar
    position="absolute"
    color="primary"
    elevation={0}
    sx={{
      position: "relative",
      borderBottom: t => `1px solid ${t.palette.divider}`,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Toolbar>
      <Typography variant="h6" color="inherit" noWrap>
        {title}
      </Typography>
    </Toolbar>
  </AppBar>
)

export default CustomAppBar
