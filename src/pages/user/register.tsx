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

interface ISteps {
  [key: number]: React.ReactNode
}

const Register: FC = () => {
  const steps = ["personal information", "medical information", "choose center"]
  const stepContent: ISteps = {
    0: <PersonalInformationForm />,
    1: <SurveyForm />,
    2: <CenterInformation />,
  }
  const [activeStep, setActiveStep] = useState(0)

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      console.log("send request")
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

export default Register
