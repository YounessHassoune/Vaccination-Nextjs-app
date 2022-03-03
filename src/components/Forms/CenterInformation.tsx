import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material"
import React, { FC } from "react"

const CenterInformation: FC = () => (
  <>
    <Typography variant="h6" gutterBottom>
      Center Information
    </Typography>
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel id="region">Region</InputLabel>
          <Select
            labelId="region"
            id="region"
            // value={age}
            label="Region"
            // onChange={handleChange}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel id="center">Center</InputLabel>
          <Select
            labelId="center"
            id="center"
            // value={age}
            label="Center"
            // onChange={handleChange}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  </>
)

export default CenterInformation
