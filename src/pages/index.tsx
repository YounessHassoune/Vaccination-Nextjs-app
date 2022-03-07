import { FC } from "react"
import { Box, Button, TextField } from "@mui/material"
import Logo from "public/gif/logo.gif"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import moment from "moment"
import toast, { Toaster } from "react-hot-toast"
import { loggedUser } from "src/app/features/user/userSlice"
import { useAppDispatch } from "src/app/hooks"
import { useRouter } from "next/router"

const Home: FC = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const validationSchema = Yup.object().shape({
    cin: Yup.string().required("cin is required"),
    birthday: Yup.string()
      .required("date invalid")
      .test(d => moment().diff(moment(d), "years") >= 12),
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
    const res = await fetch(`${BACKEND_URL}/user/find`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    const dt = await res.json()
    if (dt.errorBirthday) {
      toast.dismiss()
      toast.error(dt.errorBirthday)
    } else {
      toast.dismiss()
      console.log(dt)
      if (dt.errorCin) {
        dispatch(loggedUser(data))
        router.push("/user/register")
      } else {
        dispatch(loggedUser(dt))
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
            src={Logo}
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
              {...register("cin")}
              margin="normal"
              required
              fullWidth={true}
              id="cin"
              label="Cin"
              name="cin"
              error={errors.cin?.message.length > 0}
              helperText={errors.cin?.message}
            />

            <TextField
              type="date"
              {...register("birthday")}
              InputProps={{
                inputProps: { max: new Date().toISOString().substring(0, 10) },
              }}
              label="Birthday"
              defaultValue={new Date().toISOString().substring(0, 10)}
              margin="normal"
              error={errors.birthday?.message.length > 0}
              helperText={errors.birthday?.message}
              fullWidth={true}
              name="birthday"
            />

            <Button
              // disabled={formState.isSubmitting}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, pt: 2, pb: 2 }}
            >
              Continue
            </Button>
          </Box>
        </Box>
      </div>
    </div>
  )
}

export default Home
