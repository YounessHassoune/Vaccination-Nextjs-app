import type { NextApiRequest, NextApiResponse } from "next"
import Connect from "@/utils/Connect"
import { User } from "@/models/User"
import withSessionRoute from "@/utils/IronSession"

Connect()
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  if (method !== "GET") return res.status(400).json({ message: "Bad Request" })
  const { cin } = req.query

  const user = await User.findOne({ cin }).catch(_ => _)
  return res.status(200).json(user)
}

export default withSessionRoute(handler)
