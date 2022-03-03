import { FC } from "react"
import { Box, Button, TextField } from "@mui/material"
import Logo from "public/gif/logo.gif"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import moment from "moment"

const Home: FC = () => {
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
    console.log(data)
    // const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL as string
    // const res = await fetch(`${BACKEND_URL}/user/${data.cin}/${data.date}`)
    // const dt = await res.json()
    // if (dt) {
    //   router.push(`/shot`)
    // }
  }

  return (
    <div className="w-screen h-screen flex  justify-center items-center  ">
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
              margin="normal"
              error={errors.birthday?.message.length > 0}
              helperText={errors.birthday?.message}
              fullWidth={true}
              name="birthday"
            />

            <Button
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
