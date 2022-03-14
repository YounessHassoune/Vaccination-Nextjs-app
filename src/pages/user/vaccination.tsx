import React, { FC, useState } from "react"
import CustomAppBar from "@/components/AppBar"
import { useAppSelector } from "src/app/hooks"
import { RootState } from "src/app/store"
import {
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  Box,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Card,
  Button,
} from "@mui/material"
import { centers, regions } from "@/utils/types"
import { useRouter } from "next/router"

interface props {
  data: regions
}

const Vaccination: FC<props> = ({ data }) => {
  const router = useRouter()
  const user = useAppSelector((state: RootState) => state.user.payload)
  const [cities, setCities] = useState<regions>([])
  const [vaccinationCenters, setCenters] = useState<centers>([])
  const [center, setCenter] = useState("")
  const handleChange = async (e: SelectChangeEvent<number | unknown>) => {
    const city = e.target.value
    const CIIES_BY_REGION = process.env.NEXT_PUBLIC_CIIES_BY_REGION as string
    const res = await fetch(`${CIIES_BY_REGION}${city}`)
    const dt = await res.json()
    setCities(dt)
  }
  const handleCityChange = async (e: SelectChangeEvent<number | unknown>) => {
    const cityId = e.target.value
    const BACKEND_UR = process.env.NEXT_PUBLIC_BACKEND_URL as string
    const res = await fetch(`${BACKEND_UR}/center/find/${cityId}`)
    const dt = await res.json()
    setCenters(dt)
  }
  const handleCenterChange = (e: SelectChangeEvent<number | unknown>) => {
    setCenter(e.target.value as string)
  }
  const handleSubmit = async () => {
    const BACKEND_UR = process.env.NEXT_PUBLIC_BACKEND_URL as string
    const vaccination = {
      center,
      name: user?.shots?.length === 1 ? "shot2" : "shot3",
      user: user?._id,
    }
    const res = await fetch(`${BACKEND_UR}/vaccin/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vaccination),
    })
    const createdVaccin = await res.json()
    if (createdVaccin._id) {
      await fetch(`${BACKEND_UR}/user/updateshots`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: createdVaccin.user,
          shotId: createdVaccin._id,
        }),
      })
      router.push("/")
    }
  }
  if (user?.shots?.length === 3) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card sx={{ maxWidth: 500 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image="/gif/vaccinated.jpg"
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Congratulations
              </Typography>
              <Typography variant="body2" color="text.secondary">
                you are now fully vaccinated by taking all your vaccine shots
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>
    )
  }
  return (
    <>
      <CustomAppBar
        title={user?.shots?.length === 1 ? "second shot" : "third shot"}
      />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              flexDirection: "column",
            }}
          >
            <FormControl margin="normal" fullWidth={true}>
              <FormLabel
                id="demo-form-control-label-placement"
                sx={{
                  marginVertical: 10,
                }}
              >
                Have you had side effect from the
                {user?.shots?.length === 1 ? " first shot" : " second shot"} ?
              </FormLabel>
              <RadioGroup row name="position" sx={{}}>
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
            <FormControl fullWidth margin="normal">
              <InputLabel id="Region">Region</InputLabel>
              <Select
                labelId="Region"
                id="Region"
                defaultValue={0}
                label="Region"
                onChange={event => handleChange(event)}
              >
                <MenuItem value={0} disabled>
                  Region
                </MenuItem>
                {data?.map(r => (
                  <MenuItem key={r.id} value={r.id}>
                    {r.region}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel id="City">City</InputLabel>
              <Select
                labelId="City"
                id="City"
                defaultValue={0}
                label="City"
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
            <FormControl fullWidth margin="normal">
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
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{ mt: 3, ml: 1 }}
            >
              Confirm
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  )
}

export async function getServerSideProps() {
  const REGION_URLL = process.env.NEXT_PUBLIC_REGION_URL as string
  const res = await fetch(REGION_URLL)
  const data = await res.json()
  console.log(data)

  return {
    props: { data },
  }
}

export default Vaccination
