import type { NextPage } from "next"
import Meta from "@/layout/Meta"
import Main from "@/template/Main"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import moment from "moment"

const Home: NextPage = () => {
  const validationSchema = Yup.object().shape({
    cin: Yup.string().required("cin is required"),
    date: Yup.string()
      .required("Date of Birth is required")
      .test(value => moment().diff(moment(value), "years") >= 12)
      .matches(
        /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
        "Date of Birth must be a valid date in the format YYYY-MM-DD"
      ),
  })
  const formOptions = { resolver: yupResolver(validationSchema) }
  const { register, handleSubmit, formState } = useForm(formOptions)
  const { errors } = formState

  function onSubmit(data: any) {
    // eslint-disable-next-line no-alert
    // eslint-disable-next-line prefer-template
    // eslint-disable-next-line no-alert
    alert(JSON.stringify(data, null, 4))
    return false
  }
  return (
    <Main meta={<Meta title="" description="" />}>
      <div className="w-full max-w-lg">
        <form
          className="bg-slate-100 shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="cin"
            >
              Cin
            </label>
            <input
              {...register("cin")}
              className={`shadow appearance-none  border  ${
                errors.cin ? "border-red-500" : ""
              } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              id="cin"
              name="cin"
              type="text"
              placeholder=""
            />
            <p className="text-red-500 text-xs italic">{errors.cin?.message}</p>
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="date"
            >
              Birthday
            </label>
            <input
              {...register("date")}
              className={`shadow appearance-none border  ${
                errors.date ? "border-red-500" : ""
              } rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
              id="date"
              name="date"
              type="date"
            />
            <p className="text-red-500 text-xs italic">
              {errors.date?.message}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </Main>
  )
}

export default Home
