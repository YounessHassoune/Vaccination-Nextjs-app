import React, { FC } from "react"
import { Box, Button, TextField, Typography } from "@mui/material"
import toast, { Toaster } from "react-hot-toast"
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"

const Managers: FC = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Must be a valid email")
      .max(255)
      .required("Email is required"),
    password: Yup.string().max(255).required("Password is required"),
  })
  const formOptions = { resolver: yupResolver(validationSchema) }
  const { register, handleSubmit, formState } = useForm(formOptions)
  const { errors } = formState

  const onSubmit = async (data: any) => {
    toast.loading("loading...")
    if (formState.isSubmitting) {
      return
    }
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL as string
    const res = await fetch(`${BACKEND_URL}/admin/createmanager`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    const dt = await res.json()
    if (dt._id) {
      toast.dismiss()
      toast.success("manager created")
    } else {
      toast.dismiss()
      toast.error("something went wrong")
    }
  }
  return (
    <>
      <Toaster />
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Managers
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
          <TextField
            error={errors.email?.message.length > 0}
            helperText={errors.email?.message}
            {...register("email")}
            required
            margin="normal"
            fullWidth={true}
            id="email"
            label="email"
            name="email"
          />
          <TextField
            fullWidth={true}
            error={errors.password?.message.length > 0}
            helperText={errors.password?.message}
            {...register("password")}
            margin="normal"
            required
            id="password"
            label="password"
            name="password"
            type="password"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, pt: 2, pb: 2 }}
          >
            Add Manager
          </Button>
        </Box>
      </Box>
    </>
  )
}
export default Managers
