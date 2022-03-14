import { FC } from "react"
import { Box, Button, TextField } from "@mui/material"
import admin from "public/gif/login.gif"
import Image from "next/image"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import toast, { Toaster } from "react-hot-toast"

const Login: FC = () => {
  const router = useRouter()
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
    const res = await fetch(`${BACKEND_URL}/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    const dt = await res.json()
    if (dt.error) {
      toast.dismiss()
      toast.error(dt.error)
    } else {
      // eslint-disable-next-line no-lonely-if
      if (dt.role === "subadmin") {
        toast.dismiss()
        router.push("/subadmin/dashboard")
      } else {
        toast.dismiss()
        router.push("/")
      }
    }
  }
  return (
    <div className="w-screen h-screen flex  justify-center items-center  ">
      <Toaster />
      <div className="w-[40%] xl:w-[40%] lg:w-[60%] md:w-[60%] sm:w-full xs:w-full ">
        <Box
          sx={{
            padding: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Image
            alt="vaccination"
            src={admin}
            className="rounded-ful bg-cove"
            width="250"
            height="250"
          />
          <Box
            onSubmit={handleSubmit(onSubmit)}
            component="form"
            noValidate
            sx={{ mt: 1, width: "100%" }}
          >
            <TextField
              error={errors.email?.message.length > 0}
              helperText={errors.email?.message}
              {...register("email")}
              margin="normal"
              required
              fullWidth={true}
              id="email"
              label="email"
              name="email"
              type="email"
            />

            <TextField
              {...register("password")}
              error={errors.password?.message.length > 0}
              helperText={errors.password?.message}
              margin="normal"
              required
              fullWidth={true}
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
              Login
            </Button>
          </Box>
        </Box>
      </div>
    </div>
  )
}

export default Login
