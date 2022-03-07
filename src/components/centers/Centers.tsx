import React, { FC, useEffect, useState } from "react"
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material"
import toast, { Toaster } from "react-hot-toast"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import { regions } from "@/utils/types"

interface props {
  regionsData: regions
}

const Centers: FC<props> = ({ regionsData }) => {
  const [cities, setCities] = useState<regions>([])

  const validationSchema = Yup.object().shape({
    region: Yup.number().required("region is required").min(1),
    city: Yup.number().required("city is required").min(1),
    name: Yup.string().required("name is required"),
    address: Yup.string().required("address is required"),
  })
  const formOptions = { resolver: yupResolver(validationSchema) }
  const { register, handleSubmit, formState } = useForm(formOptions)
  const { errors } = formState

  const handleChange = async (e: SelectChangeEvent<number | unknown>) => {
    const city = e.target.value
    const CIIES_BY_REGION = process.env.NEXT_PUBLIC_CIIES_BY_REGION as string
    const res = await fetch(`${CIIES_BY_REGION}${city}`)
    const data = await res.json()
    setCities(data)
  }

  const onSubmit = async (data: any) => {
    toast.loading("loading...")
    if (formState.isSubmitting) {
      return
    }
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL as string
    const res = await fetch(`${BACKEND_URL}/center/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    const dt = await res.json()
    if (dt._id) {
      toast.dismiss()
      toast.success("center created")
    } else {
      toast.dismiss()
      toast.error("something went wrong")
    }
    console.log(dt)
  }

  useEffect(() => {
    console.log("mounted")
    return () => {
      console.log("unmounted")
    }
  }, [])

  return (
    <>
      <Toaster />
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Centers
      </Typography>
      <Box
        onSubmit={handleSubmit(onSubmit)}
        className="flex-col justify-center items-center"
        component="form"
        noValidate
        sx={{
          mt: 1,
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            mt: 1,
            width: "50%",
          }}
        >
          <FormControl fullWidth>
            <InputLabel id="Region">Region</InputLabel>
            <Select
              error={errors.region?.message.length > 0}
              defaultValue={0}
              {...register("region")}
              name="region"
              labelId="Region"
              id="Region"
              label="Region"
              onChange={event => {
                handleChange(event)
              }}
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

          <FormControl fullWidth margin="normal">
            <InputLabel id="City">City</InputLabel>
            <Select
              error={errors.city?.message.length > 0}
              defaultValue={0}
              labelId="City"
              id="City"
              label="City"
              {...register("city")}
              name="city"
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
          <TextField
            error={errors.name?.message.length > 0}
            {...register("name")}
            margin="normal"
            required
            fullWidth={true}
            id="name"
            label="name"
            name="name"
          />
          <TextField
            error={errors.address?.message.length > 0}
            {...register("address")}
            margin="normal"
            required
            fullWidth={true}
            id="address"
            label="address"
            name="address"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, pt: 2, pb: 2 }}
          >
            Add Center
          </Button>
        </Box>
      </Box>
    </>
  )
}
export default Centers
