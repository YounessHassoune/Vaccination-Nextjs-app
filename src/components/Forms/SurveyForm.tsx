import React, { FC } from "react"
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material"
import { ISurvey } from "@/utils/types"

interface props {
  // eslint-disable-next-line no-unused-vars
  setQuestions: (value: ISurvey) => void
  questions: ISurvey
}

const SurveyForm: FC<props> = ({ questions, setQuestions }) => {
  const handleChange =
    (prop: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setQuestions({
        ...questions,
        [prop]: event.target.value,
      })
    }

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Medical Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormControl margin="normal" fullWidth={true}>
            <FormLabel
              id="demo-form-control-label-placement"
              sx={{
                marginVertical: 10,
              }}
            >
              Have you ever had covid ?
            </FormLabel>
            <RadioGroup
              row
              name="position"
              sx={{}}
              value={questions.first}
              onChange={handleChange("first")}
            >
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
        </Grid>
        <Grid item xs={12}>
          <FormControl margin="normal">
            <FormLabel
              id="demo-form-control-label-placement"
              sx={{
                marginVertical: 10,
              }}
            >
              Do you have a chronic disease ?
            </FormLabel>
            <RadioGroup
              row
              name="position"
              value={questions.second}
              onChange={handleChange("second")}
            >
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
        </Grid>
      </Grid>
    </>
  )
}

export default SurveyForm
