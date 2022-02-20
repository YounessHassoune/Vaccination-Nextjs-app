import React, { FC, useState } from "react"
import SurveyForm from "@/components/surveyForm"

type Props = {
  shot: string
}
const Survey: FC<Props> = ({ shot }) => {
  const [first, setFirst] = useState("")
  const [last, setLast] = useState("")
  const [address, setAddress] = useState("")
  const [phone, setPhone] = useState("")
  const [diseases, setDiseases] = useState("")

  return (
    <>
      {shot === "1" && (
        <SurveyForm
          first={first}
          last={last}
          address={address}
          phone={phone}
          shot={shot}
        >
          <div className="grid grid-cols-6 gap-6 pt-8">
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="first_name"
                className="block text-sm font-medium text-gray-600"
              >
                First name
              </label>
              <div className="mt-1 flex rounded-md">
                <input
                  value={first}
                  onChange={e => setFirst(e.target.value)}
                  id="first_name"
                  type="text"
                  name="first_name"
                  className="form-input block w-full h-10 px-4 mb-2 border
                      border-gray-300 rounded-md
                      sm:text-sm placeholder-gray-400"
                  placeholder="Your first name"
                  required
                />
              </div>
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="last_name"
                className="block text-sm font-medium text-gray-600"
              >
                Last name
              </label>
              <div className="mt-1 flex rounded-md">
                <input
                  value={last}
                  onChange={e => setLast(e.target.value)}
                  id="last_name"
                  type="text"
                  name="last_name"
                  className="form-input block w-full h-10 px-4 mb-2 border
                border-gray-300 rounded-md
                sm:text-sm placeholder-gray-400"
                  placeholder="Your last name"
                  required
                />
              </div>
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-600"
              >
                address
              </label>
              <div className="mt-1 flex rounded-md">
                <input
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  id="address"
                  type="text"
                  name="address"
                  className="form-input block w-full h-10 px-4 mb-2 border
                      border-gray-300 rounded-md
                      sm:text-sm placeholder-gray-400"
                  placeholder="Your address"
                  required
                />
              </div>
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-600"
              >
                phone
              </label>
              <div className="mt-1 flex rounded-md">
                <input
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  id="phone"
                  type="text"
                  name="phone"
                  className="form-input block w-full h-10 px-4 mb-2 border
                border-gray-300 rounded-md
                sm:text-sm placeholder-gray-400"
                  placeholder="Your phone"
                  required
                />
              </div>
            </div>

            <div className="col-span-6 sm:col-span-6 mt-2">
              <fieldset>
                <legend className="text-base font-medium text-gray-700">
                  1. Do you have allergies to medications, food, a vaccine
                  component, or latex?
                </legend>
                <div className="mt-4 space-y-4">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="comments"
                        name="q-1"
                        type="radio"
                        value="definitely"
                        className="form-radio h-4 w-4 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="comments"
                        className="font-medium text-gray-700"
                      >
                        yes
                      </label>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="comments"
                        name="q-1"
                        type="radio"
                        value="maybe"
                        className="form-radio h-4 w-4 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="comments"
                        className="font-medium text-gray-700"
                      >
                        no
                      </label>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="comments"
                        name="q-1"
                        type="radio"
                        value="not_sure"
                        className="form-radio h-4 w-4 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="comments"
                        className="font-medium text-gray-700"
                      >
                        dont know
                      </label>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
            <div className="col-span-6 sm:col-span-6 mt-2">
              <fieldset>
                <legend className="text-base font-medium text-gray-700">
                  2.Do you have cancer, leukemia, HIV/AIDS, or any other immune
                  system problem?
                </legend>
                <div className="mt-4 space-y-4">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="comments"
                        name="q-2"
                        type="radio"
                        value="definitely"
                        className="form-radio h-4 w-4 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="comments"
                        className="font-medium text-gray-700"
                      >
                        yes
                      </label>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        required
                        id="comments"
                        name="q-2"
                        type="radio"
                        value="maybe"
                        className="form-radio h-4 w-4 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="comments"
                        className="font-medium text-gray-700"
                      >
                        no
                      </label>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        required
                        id="comments"
                        name="q-2"
                        type="radio"
                        value="not_sure"
                        className="form-radio h-4 w-4 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="comments"
                        className="font-medium text-gray-700"
                      >
                        dont know
                      </label>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>

            <div className="col-span-6 sm:col-span-6 mt-2">
              <label
                id="textarea"
                htmlFor="textfield"
                className="block text-sm font-medium text-gray-600"
              >
                Any other diseases?
              </label>
              <div className="mt-1 flex rounded-md">
                <textarea
                  required
                  value={diseases}
                  onChange={e => setDiseases(e.target.value)}
                  name="diseases"
                  id="textfield"
                  className="form-textarea w-full h-20 px-2 py-2 mb-2 appearance-none border border-gray-300 rounded-md sm:text-sm placeholder-gray-400"
                />
              </div>
            </div>
          </div>
        </SurveyForm>
      )}
      {shot === "2" && (
        <SurveyForm shot={shot}>
          <div className="col-span-6 sm:col-span-6 mt-2">
            <label
              id="textarea"
              htmlFor="textfield"
              className="block text-sm font-medium text-gray-600"
            >
              did u have any side effects from the first shot ?
            </label>
            <div className="mt-1 flex rounded-md">
              <textarea
                id="textfield"
                className="form-textarea w-full h-20 px-2 py-2 mb-2 appearance-none border border-gray-300 rounded-md sm:text-sm placeholder-gray-400"
              />
            </div>
          </div>
        </SurveyForm>
      )}
      {shot === "3" && (
        <SurveyForm shot={shot}>
          <div className="col-span-6 sm:col-span-6 mt-2">
            <label
              id="textarea"
              htmlFor="textfield"
              className="block text-sm font-medium text-gray-600"
            >
              did u have any side effects from the second shot ?
            </label>
            <div className="mt-1 flex rounded-md">
              <textarea
                id="textfield"
                className="form-textarea w-full h-20 px-2 py-2 mb-2 appearance-none border border-gray-300 rounded-md sm:text-sm placeholder-gray-400"
              />
            </div>
          </div>
        </SurveyForm>
      )}
    </>
  )
}
export default Survey
