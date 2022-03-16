import React, { FC, useEffect, useState } from "react"
import { Typography, Box } from "@mui/material"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Pie } from "react-chartjs-2"

ChartJS.register(ArcElement, Tooltip, Legend)
const Stats: FC = () => {
  const [shots, setShots] = useState<any>({
    labels: ["first shot", "second shot", "third shot"],
    datasets: [
      {
        data: [0, 0, 0],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  })
  useEffect(() => {
    const getStats = async () => {
      const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL as string
      const res = await fetch(`${BACKEND_URL}/admin/stats`)
      const dt = await res.json()
      setShots({
        ...shots,
        datasets: [
          ...shots.datasets,
          (shots.datasets[0].data = Object.values(dt)),
        ],
      })
    }
    getStats()
  }, [])

  useEffect(() => {
    console.log(shots)
  }, [shots])

  return (
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
          <Pie data={shots} options={{}} height="100%" width="100%" />
        </Box>
      </Box>
    </>
  )
}

export default Stats
