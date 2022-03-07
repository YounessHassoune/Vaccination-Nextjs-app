import React, { FC } from "react"
import { Grid, TextField, Typography } from "@mui/material"
import { IPersonalInfo } from "@/utils/types"

interface props {
  // eslint-disable-next-line no-unused-vars
  setPersonalInformations: (value: IPersonalInfo) => void
  personalInformations: IPersonalInfo
}
const PersonalInformationForm: FC<props> = ({
  setPersonalInformations,
  personalInformations,
}) => {
  const handleChange =
    (prop: keyof IPersonalInfo) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPersonalInformations({
        ...personalInformations,
        [prop]: event.target.value,
      })
    }
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Personal Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            value={personalInformations.name}
            required
            id="fullName"
            name="fullName"
            label="Full Name"
            fullWidth
            variant="outlined"
            onChange={handleChange("name")}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            value={personalInformations.address}
            required
            id="address"
            name="address"
            label="Address"
            fullWidth
            variant="outlined"
            onChange={handleChange("address")}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            value={personalInformations.phone}
            required
            id="phone"
            name="phone"
            label="Phone"
            fullWidth
            variant="outlined"
            onChange={handleChange("phone")}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default PersonalInformationForm
