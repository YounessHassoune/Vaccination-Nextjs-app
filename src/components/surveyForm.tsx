import React, { FC, ReactNode } from "react"

export type Props = {
  children: ReactNode
  first?: string
  last?: string
  phone?: string
  address?: string
  shot: string
}
const SurveyForm: FC<Props> = ({
  children,
  first,
  last,
  phone,
  address,
  shot,
}) => {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL as string

  const data = [
    {
      first,
      last,
      phone,
      address,
      vaccination: {
        shot: 1,
        value: true,
      },
    },
    {
      vaccination: {
        shot: 2,
        value: true,
      },
    },
    {
      vaccination: {
        shot: 3,
        value: true,
      },
    },
  ]

  const onSubmit = (e: any) => {
    e.preventDefault()
    switch (shot) {
      case "1":
        fetch(`${BACKEND_URL}/user/update`, {
          method: "POST",
          // eslint-disable-next-line radix
          body: JSON.stringify(data[parseInt(shot) - 1]),
        })
        break
      case "2":
        fetch(`${BACKEND_URL}/user/update`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // eslint-disable-next-line radix
          body: JSON.stringify(data[parseInt(shot) - 1]),
        })
        break
      case "3":
        fetch(`${BACKEND_URL}/user/update`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // eslint-disable-next-line radix
          body: JSON.stringify(data[parseInt(shot) - 1]),
        })
        break
      default:
        break
    }
  }

  return (
    <div className="  px-10 py-10 bg-white  sm:p-10">
      <div className="mx-auto">
        <div className="font-sans text-gray-700 space-y-6 sm:leading-7 text-center antialiased">
          <h1 id="title" className="text-3xl font-semibold">
            Vaccination Survey Form
          </h1>
        </div>
        <form onSubmit={onSubmit}>
          {children}
          <div className="col-span-6 sm:col-span-2 mt-2">
            <button
              onClick={onSubmit}
              type="submit"
              id="submit"
              className="inline-flex justify-center py-3 px-8 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SurveyForm
