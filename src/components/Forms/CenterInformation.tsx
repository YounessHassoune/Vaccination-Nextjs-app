import { centers, regions } from "@/utils/types"
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material"
import React, { FC, useState } from "react"

interface props {
  regionsData: regions
  // eslint-disable-next-line no-unused-vars
  setCenter: (value: string) => void
}

const CenterInformation: FC<props> = ({ regionsData, setCenter }) => {
  const [cities, setCities] = useState<regions>([])
  const [vaccinationCenters, setCenters] = useState<centers>([])
  const handleChange = async (e: SelectChangeEvent<number | unknown>) => {
    const city = e.target.value
    const CIIES_BY_REGION = process.env.NEXT_PUBLIC_CIIES_BY_REGION as string
    const res = await fetch(`${CIIES_BY_REGION}${city}`)
    const data = await res.json()
    setCities(data)
  }
  const handleCityChange = async (e: SelectChangeEvent<number | unknown>) => {
    const cityId = e.target.value
    const BACKEND_UR = process.env.NEXT_PUBLIC_BACKEND_URL as string
    const res = await fetch(`${BACKEND_UR}/center/find/${cityId}`)
    const data = await res.json()
    setCenters(data)
  }
  const handleCenterChange = (e: SelectChangeEvent<number | unknown>) => {
    console.log(e.target.value)
    setCenter(e.target.value as string)
  }
  return (
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
              defaultValue={0}
              label="Region"
              onChange={event => handleChange(event)}
            >
              <MenuItem value={0} disabled>
                Region
              </MenuItem>
              {regionsData?.map(r => (
                <MenuItem key={r.id} value={r.id}>
                  {r.region}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="city">City</InputLabel>
            <Select
              labelId="city"
              id="city"
              defaultValue={0}
              label="city"
              onChange={event => handleCityChange(event)}
            >
              <MenuItem value={0} disabled>
                city
              </MenuItem>
              {cities?.map(r => (
                <MenuItem key={r.id} value={r.id}>
                  {r.ville}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="center">Center</InputLabel>
            <Select
              labelId="center"
              id="center"
              defaultValue={0}
              label="Center"
              onChange={event => handleCenterChange(event)}
            >
              <MenuItem value={0} disabled>
                center
              </MenuItem>
              {vaccinationCenters?.map(r => (
                <MenuItem key={r._id} value={r._id}>
                  {r.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </>
  )
}
export default CenterInformation
