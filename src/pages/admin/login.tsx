import { FC } from "react"
import { Box, Button, TextField } from "@mui/material"
import admin from "public/gif/login.gif"
import Image from "next/image"

const Login: FC = () => (
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
          src={admin}
          className="rounded-ful bg-cove"
          width="250"
          height="250"
        />
        <Box component="form" noValidate sx={{ mt: 1, width: "100%" }}>
          <TextField
            margin="normal"
            required
            fullWidth={true}
            id="email"
            label="email"
            name="email"
            type="email"
          />

          <TextField
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

export default Login
