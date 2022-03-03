import React, { FC, useEffect } from "react"
import { Grid, TextField, Typography } from "@mui/material"

const PersonalInformationForm: FC = () => {
  useEffect(() => {
    console.log("component 1 mounted")
    return () => {
      console.log("component 1 unmounted fuck")
    }
  }, [])

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Personal Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="fullName"
            name="fullName"
            label="Full Name"
            fullWidth
            autoComplete="fullName"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address"
            name="address"
            label="Address"
            fullWidth
            autoComplete="address"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="phone"
            name="phone"
            label="Phone"
            fullWidth
            autoComplete="phone"
            variant="outlined"
          />
        </Grid>
      </Grid>
    </>
  )
}

export default PersonalInformationForm
