import type { NextApiRequest, NextApiResponse } from "next"
import Connect from "@/utils/Connect"
import withSessionRoute from "@/utils/IronSession"
import { User } from "@/models/User"

Connect()
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  if (method !== "POST") return res.status(400).json({ message: "Bad Request" })
  // @ts-ignore

  const { loggedUser } = req.session
  let data = req.body
  if (typeof data === "string") {
    data = JSON.parse(data)
  }

  const x = [data.vaccination]
  console.log(x[0])

  delete data.vaccination
  const updateUser = await User.findOneAndUpdate(
    { _id: loggedUser._id },
    { $push: { vaccination: x[0] } },
    { $set: { ...data } }
  ).catch(_ => _)

  return res.status(200).json(updateUser)
}
export default withSessionRoute(handler)
