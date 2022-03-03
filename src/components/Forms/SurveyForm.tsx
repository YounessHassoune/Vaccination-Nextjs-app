import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material"
import React, { FC } from "react"

const SurveyForm: FC = () => (
  <>
    <Typography variant="h6" gutterBottom>
      Medical Information
    </Typography>
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <FormControl margin="normal" variant="outlined" fullWidth={true}>
          <FormLabel
            id="demo-form-control-label-placement"
            sx={{
              marginVertical: 10,
            }}
          >
            Have you ever had covid ?
          </FormLabel>
          <RadioGroup row name="position" defaultValue={false} sx={{}}>
            <FormControlLabel
              value={true}
              control={<Radio />}
              label="YES"
              labelPlacement="start"
            />
            <FormControlLabel
              value={false}
              control={<Radio />}
              label="NO"
              labelPlacement="start"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl margin="normal">
          <FormLabel
            id="demo-form-control-label-placement"
            sx={{
              marginVertical: 10,
            }}
          >
            Do you have a chronic disease ?
          </FormLabel>
          <RadioGroup row name="position" defaultValue={false}>
            <FormControlLabel
              value={true}
              control={<Radio />}
              label="YES"
              labelPlacement="start"
            />
            <FormControlLabel
              value={false}
              control={<Radio />}
              label="NO"
              labelPlacement="start"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
    </Grid>
  </>
)

export default SurveyForm
