import React, { FC } from "react"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"

type props = {
  icon: JSX.Element
  title: string
  selected: boolean
}
const ListItems: FC<props> = ({ icon, title, selected }) => (
  <ListItemButton selected={selected}>
    <ListItemIcon>{icon}</ListItemIcon>
    <ListItemText primary={title} />
  </ListItemButton>
)

export default ListItems
