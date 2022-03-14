import React, { FC, useState } from "react"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Paper from "@mui/material/Paper"
import Stepper from "@mui/material/Stepper"
import Step from "@mui/material/Step"
import StepLabel from "@mui/material/StepLabel"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import PersonalInformationForm from "@/components/Forms/PersonalInformationForm"
import CenterInformation from "@/components/Forms/CenterInformation"
import SurveyForm from "@/components/Forms/SurveyForm"
import CustomAppBar from "@/components/AppBar"
import { IPersonalInfo, ISurvey, regions } from "@/utils/types"
import { useAppSelector } from "src/app/hooks"
import { RootState } from "src/app/store"
import { useRouter } from "next/router"

interface ISteps {
  [key: number]: React.ReactNode
}
interface props {
  data: regions
}

const Register: FC<props> = ({ data }) => {
  const router = useRouter()
  const user = useAppSelector((state: RootState) => state.user.payload)
  const steps = ["personal information", "medical information", "choose center"]
  const [personalInformations, setPersonalInformations] =
    useState<IPersonalInfo>({
      name: "",
      address: "",
      phone: "",
    })
  const [questions, setQuestions] = useState<ISurvey>({
    first: false,
    second: false,
  })
  const [center, setCenter] = useState("")

  const stepContent: ISteps = {
    0: (
      <PersonalInformationForm
        personalInformations={personalInformations}
        setPersonalInformations={setPersonalInformations}
      />
    ),
    1: <SurveyForm questions={questions} setQuestions={setQuestions} />,
    2: <CenterInformation regionsData={data} setCenter={setCenter} />,
  }
  const [activeStep, setActiveStep] = useState(0)

  const handleNext = async () => {
    if (activeStep === steps.length - 1) {
      const createUser = { ...personalInformations, ...user }
      const BACKEND_UR = process.env.NEXT_PUBLIC_BACKEND_URL as string
      const res = await fetch(`${BACKEND_UR}/user/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createUser),
      })
      const createdUser = await res.json()
      if (createdUser?._id) {
        const vaccination = { center, name: "shot1", user: createdUser._id }
        const res2 = await fetch(`${BACKEND_UR}/vaccin/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(vaccination),
        })
        const createdVaccin = await res2.json()
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
      return
    }

    setActiveStep(activeStep + 1)
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1)
  }
  return (
    <>
      <CustomAppBar title="Covid Vaccnation" />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Register
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <>
            {stepContent[activeStep]}
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                  Back
                </Button>
              )}
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ mt: 3, ml: 1 }}
              >
                {activeStep === steps.length - 1 ? "register" : "Next"}
              </Button>
            </Box>
          </>
        </Paper>
      </Container>
    </>
  )
}

export async function getServerSideProps() {
  const REGION_URLL = process.env.NEXT_PUBLIC_REGION_URL as string
  const res = await fetch(REGION_URLL)
  const data: regions = await res.json()
  console.log(data)

  return {
    props: { data },
  }
}
export default Register
