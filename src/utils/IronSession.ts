import { IronSessionOptions } from "iron-session"
import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next"
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextApiHandler,
} from "next"

interface options extends IronSessionOptions {
  password: string | ""
  cookieName: string
  cookieOptions: {
    secure: boolean
    maxAge: number
  }
}
export const sessionOptions: options = {
  password: process.env.APPLICATION_SECRET as string,
  cookieName: "vaccination",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    maxAge: 60 * 60 * 24 * 30, // 30 days
  },
}

export default function withSessionRoute(handler: NextApiHandler) {
  return withIronSessionApiRoute(handler, sessionOptions)
}

export function withSessionSsr<
  P extends { [key: string]: any } = { [key: string]: any }
>(
  handler: (
    // eslint-disable-next-line no-unused-vars
    context: GetServerSidePropsContext
  ) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>
) {
  return withIronSessionSsr(handler, sessionOptions)
}
