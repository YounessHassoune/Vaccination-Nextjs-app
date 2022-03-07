import React, { FC } from "react"
import { Typography, Box } from "@mui/material"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Doughnut } from "react-chartjs-2"

ChartJS.register(ArcElement, Tooltip, Legend)
export const data = {
  labels: ["first shot", "second shot", "third shot", "side effects"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
      ],
      borderWidth: 1,
    },
  ],
}
const Stats: FC = () => (
  <>
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      Stats
    </Typography>
    <Box
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
          height: "50%",
          width: "50%",
        }}
      >
        <Doughnut data={data} options={{}} height="100%" width="100%" />
      </Box>
    </Box>
  </>
)

export default Stats
