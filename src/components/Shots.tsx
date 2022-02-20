import { useRouter } from "next/router"
import React, { FC } from "react"

export type IShots = {
  title: string
  description: string
  number: number
  disabled: boolean
}
const Shots: FC<IShots> = ({ title, description, number, disabled }) => {
  const route = useRouter()
  const handleClick = () => {
    route.push(`/shot/${number}`)
  }

  return (
    <div className="flex justify-center">
      <div
        className={`block p-6 rounded-lg shadow-lg  max-w-sm ${
          disabled ? "bg-gray-500" : "bg-white"
        }`}
      >
        <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">
          {title}
        </h5>
        <p className="text-gray-700 text-base mb-4">{description}</p>
        <button
          disabled={disabled}
          onClick={handleClick}
          type="button"
          className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        >
          Button
        </button>
      </div>
    </div>
  )
}

export default Shots
