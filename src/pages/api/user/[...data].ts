import type { NextApiRequest, NextApiResponse } from "next"
import Connect from "@/utils/Connect"
import { User } from "@/models/User"
import withSessionRoute from "@/utils/IronSession"

Connect()
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  if (method !== "GET") return res.status(400).json({ message: "Bad Request" })
  const cin = req.query.data[0]
  const birthday = req.query.data[1]

  let user = await User.findOne({ cin }).catch(_ => _)
  if (!user) {
    user = await User.create({
      cin,
      birthday,
    })
  }
  // @ts-ignore
  req.session.loggedUser = user
  await req.session.save()
  return res.status(200).json(user)
}

export default withSessionRoute(handler)
